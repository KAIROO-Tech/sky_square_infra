import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded media files
const uploadsPath = path.join(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sky Square Infra API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Serve production assets if built
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Sky Square Infra API is running. Build frontend with `npm run build`.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`✦ Sky Square Infra Server listening on http://localhost:${PORT}`);
});
