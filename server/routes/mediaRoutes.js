import express from 'express';
import multer from 'multer';
import path from 'path';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { isS3Configured, uploadBufferToS3 } from '../services/s3Service.js';

// Files are held in memory only long enough to stream them to S3; nothing is written to local disk.
const storage = multer.memoryStorage();

const buildUniqueFilename = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const cleanBase = path
    .basename(originalname, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
  return `${cleanBase}-${Date.now()}${ext}`;
};

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

  if (!isS3Configured()) {
    return res.status(500).json({
      success: false,
      error: 'Media storage is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION and AWS_S3_BUCKET_NAME.',
    });
  }

  const filename = buildUniqueFilename(req.file.originalname);
  const ext = path.extname(filename);

  let mediaType = 'image';
  if (['.mp4', '.webm'].includes(ext)) mediaType = 'video';
  if (['.pdf'].includes(ext)) mediaType = 'pdf';

  let fileUrl;
  try {
    fileUrl = await uploadBufferToS3({
      buffer: req.file.buffer,
      filename,
      mimetype: req.file.mimetype,
    });
    console.log(`[S3 SUCCESS] Uploaded to S3: ${fileUrl}`);
  } catch (s3Err) {
    console.error(`[S3 ERROR] Upload failed: ${s3Err.message}`);
    return res.status(502).json({
      success: false,
      error: 'Upload to media storage failed. Please try again.',
    });
  }

  return res.status(201).json({
    success: true,
    url: fileUrl,
    storage: 's3',
    filename,
    originalName: req.file.originalname,
    mediaType,
    size: req.file.size,
  });
});

export default router;
