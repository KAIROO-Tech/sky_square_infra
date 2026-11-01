// One-time migration: imports server/data/projects.json into MongoDB and moves any
// media still referenced as local "/uploads/..." paths to S3, rewriting the URLs.
//
// Usage:  npm run db:migrate            (skips projects already in MongoDB)
//         npm run db:migrate -- --force (overwrites projects already in MongoDB)
import '../config/env.js';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase, closeDatabase } from '../db/mongo.js';
import { isS3Configured, uploadBufferToS3 } from '../services/s3Service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SOURCE_FILE = path.join(ROOT, 'server/data/projects.json');
const LOCAL_UPLOADS_DIR = path.join(ROOT, 'public/uploads');
const FALLBACK_FILE = path.join(ROOT, 'src/data/projects.js');

const MIME_TYPES = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

const force = process.argv.includes('--force');
const uploadedUrlCache = new Map();

async function moveLocalUploadToS3(localUrl) {
  if (uploadedUrlCache.has(localUrl)) return uploadedUrlCache.get(localUrl);

  const filename = path.basename(localUrl);
  const filePath = path.join(LOCAL_UPLOADS_DIR, filename);

  let buffer;
  try {
    buffer = await fs.readFile(filePath);
  } catch {
    console.warn(`  ! Local file missing, leaving URL unchanged: ${localUrl}`);
    uploadedUrlCache.set(localUrl, localUrl);
    return localUrl;
  }

  const s3Url = await uploadBufferToS3({
    buffer,
    filename,
    mimetype: MIME_TYPES[path.extname(filename).toLowerCase()] || 'application/octet-stream',
  });
  console.log(`  ↑ ${localUrl} -> ${s3Url}`);
  uploadedUrlCache.set(localUrl, s3Url);
  return s3Url;
}

// Recursively replaces every "/uploads/..." string in a project with its S3 URL
async function rewriteLocalMedia(value) {
  if (typeof value === 'string') {
    return value.startsWith('/uploads/') ? moveLocalUploadToS3(value) : value;
  }
  if (Array.isArray(value)) {
    return Promise.all(value.map(rewriteLocalMedia));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      out[key] = await rewriteLocalMedia(v);
    }
    return out;
  }
  return value;
}

async function main() {
  if (!isS3Configured()) {
    throw new Error('S3 is not configured; cannot move local uploads. Check AWS_* variables in .env.');
  }

  const projects = JSON.parse(await fs.readFile(SOURCE_FILE, 'utf8'));
  console.log(`Found ${projects.length} project(s) in ${path.relative(ROOT, SOURCE_FILE)}`);

  const db = await connectToDatabase();
  const collection = db.collection('projects');
  console.log(`Connected to MongoDB database "${db.databaseName}"`);

  let inserted = 0;
  let skipped = 0;

  for (const project of projects) {
    const { _id, ...data } = project;
    const exists = await collection.findOne({ id: data.id }, { projection: { _id: 1 } });

    if (exists && !force) {
      console.log(`- ${data.id}: already in MongoDB, skipping (use --force to overwrite)`);
      skipped++;
      continue;
    }

    console.log(`- ${data.id}: migrating`);
    const migrated = await rewriteLocalMedia(data);
    await collection.replaceOne({ id: migrated.id }, migrated, { upsert: true });
    inserted++;
  }

  // Refresh the static frontend fallback (used only when the API is unreachable)
  const all = await collection.find({}, { projection: { _id: 0 } }).sort({ stackOrder: 1, _id: 1 }).toArray();
  await fs.writeFile(
    FALLBACK_FILE,
    `// Static fallback snapshot of MongoDB projects (used only if /api/projects is unreachable)\nexport const projects = ${JSON.stringify(all, null, 2)};\n`,
    'utf8'
  );

  console.log(`\nDone. Migrated: ${inserted}, skipped: ${skipped}, total in MongoDB: ${all.length}`);
  console.log(`Refreshed ${path.relative(ROOT, FALLBACK_FILE)} from MongoDB.`);
}

main()
  .catch((err) => {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  })
  .finally(closeDatabase);
