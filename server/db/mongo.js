import { MongoClient } from 'mongodb';

let client = null;
let db = null;

/**
 * Connects to MongoDB once and caches the database handle.
 * Requires MONGODB_URI; database name comes from MONGODB_DB_NAME (default: sky_sq_infra).
 */
export async function connectToDatabase() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env or the host environment.');
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME || 'sky_sq_infra');

  await Promise.all([
    db.collection('projects').createIndex({ id: 1 }, { unique: true }),
    db.collection('inquiries').createIndex({ receivedAt: -1 }),
  ]);

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() before handling requests.');
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
