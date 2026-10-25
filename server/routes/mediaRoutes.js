import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { isS3Configured, uploadBufferToS3 } from '../services/s3Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer disk storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const unique = `${cleanBase}-${Date.now()}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    // Images
    '.jpg', '.jpeg', '.png', '.webp', '.svg', '.avif',
    // Videos
    '.mp4', '.webm',
    // Documents
    '.pdf'
  ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File format ${ext} is not supported. Supported: images, mp4/webm, and PDF.`));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max limit
  fileFilter,
});

const router = express.Router();

// POST /api/media/upload (requires admin auth)
router.post('/upload', requireAdminAuth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No media file attached.' });
  }

  const ext = path.extname(req.file.filename).toLowerCase();
  
  let mediaType = 'image';
  if (['.mp4', '.webm'].includes(ext)) mediaType = 'video';
  if (['.pdf'].includes(ext)) mediaType = 'pdf';

  let fileUrl = `/uploads/${req.file.filename}`;
  let storageProvider = 'local';

  // If S3 environment variables are configured, attempt upload to S3
  if (isS3Configured()) {
    try {
      const buffer = fs.readFileSync(req.file.path);
      const s3Url = await uploadBufferToS3({
        buffer,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
      });
      fileUrl = s3Url;
      storageProvider = 's3';
      console.log(`[S3 SUCCESS] Uploaded to S3: ${s3Url}`);
    } catch (s3Err) {
      console.warn(`[S3 FALLBACK] S3 upload failed (${s3Err.message}). Using local storage fallback: ${fileUrl}`);
    }
  }

  return res.status(201).json({
    success: true,
    url: fileUrl,
    storage: storageProvider,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mediaType,
    size: req.file.size,
  });
});

export default router;
