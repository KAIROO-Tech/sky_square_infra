import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'sky-square-infra-architectural-jwt-key-2026';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username &&
    password &&
    username.trim().toLowerCase() === ADMIN_USER.toLowerCase() &&
    password === ADMIN_PASS
  ) {
    const token = jwt.sign(
      {
        username: ADMIN_USER,
        role: 'superadmin',
        issuedAt: new Date().toISOString(),
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        username: ADMIN_USER,
        role: 'superadmin',
      },
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid administrative credentials.',
  });
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, authenticated: false });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({
      success: true,
      authenticated: true,
      admin: {
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch {
    return res.status(401).json({ success: false, authenticated: false });
  }
});

export default router;
