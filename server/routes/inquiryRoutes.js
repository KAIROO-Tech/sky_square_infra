import express from 'express';
import { sendConsultationEmail } from '../services/emailService.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';
import { getDb } from '../db/mongo.js';

const router = express.Router();

// Inquiries are persisted in the MongoDB `inquiries` collection
const inquiriesCollection = () => getDb().collection('inquiries');

// Lightweight in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
};

// Periodic cleanup of rateLimitMap
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000);

/**
 * POST /api/inquiry
 * Submits a consultation inquiry, validates server-side, and delivers email
 */
router.post('/', async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many consultation requests from this connection. Please wait a few minutes before trying again.',
    });
  }

  const {
    fullName,
    name,
    phone,
    email,
    interest,
    location,
    message,
    preferredDate,
    date,
    preferredTime,
    timeSlot,
  } = req.body;

  // 1. Validate Full Name (support either fullName or name)
  const candidateName = typeof fullName === 'string' ? fullName : typeof name === 'string' ? name : '';
  const trimmedName = candidateName.trim();
  if (!trimmedName || trimmedName.length < 2) {
    return res.status(400).json({
      success: false,
      field: 'fullName',
      error: 'Please enter a valid full name (minimum 2 characters).',
    });
  }
  if (trimmedName.length > 100) {
    return res.status(400).json({
      success: false,
      field: 'fullName',
      error: 'Full name cannot exceed 100 characters.',
    });
  }

  // 2. Validate Contact Phone (plausible international format, 7-16 digits)
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
  const digitsOnly = trimmedPhone.replace(/\D/g, '');
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,16}$/;
  if (!trimmedPhone || !phoneRegex.test(trimmedPhone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
    return res.status(400).json({
      success: false,
      field: 'phone',
      error: 'Please provide a plausible contact phone number (including optional country code).',
    });
  }

  // 3. Validate Email Address
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      field: 'email',
      error: 'Please enter a valid email address.',
    });
  }

  // 4. Validate / Default Area of Engagement
  let trimmedInterest = typeof interest === 'string' ? interest.trim() : '';
  const rawDate = preferredDate || date;
  const rawTime = preferredTime || timeSlot;
  const trimmedDate = typeof rawDate === 'string' ? rawDate.trim() : '';
  const trimmedTime = typeof rawTime === 'string' ? rawTime.trim() : '';

  if (!trimmedInterest) {
    if (trimmedDate || trimmedTime) {
      trimmedInterest = 'Scheduled Site Consultation & Advisory';
    } else {
      return res.status(400).json({
        success: false,
        field: 'interest',
        error: 'Please select an area of engagement.',
      });
    }
  }

  // 5. Optional fields
  const trimmedLocation = typeof location === 'string' ? location.trim().slice(0, 200) : '';
  const trimmedMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : '';

  const inquiryId = `INQ-${Date.now().toString().slice(-6)}`;
  const receivedAt = new Date().toISOString();

  // Attempt real email dispatch through server-side configured transport
  const emailResult = await sendConsultationEmail({
    inquiryId,
    fullName: trimmedName,
    phone: trimmedPhone,
    email: trimmedEmail,
    interest: trimmedInterest,
    location: trimmedLocation,
    message: trimmedMessage,
    preferredDate: trimmedDate,
    preferredTime: trimmedTime,
  });

  // Store in inquiry log regardless for traceability
  const inquiryRecord = {
    id: inquiryId,
    fullName: trimmedName,
    phone: trimmedPhone,
    email: trimmedEmail,
    interest: trimmedInterest,
    location: trimmedLocation || 'Not provided',
    message: trimmedMessage || 'Not provided',
    preferredDate: trimmedDate || null,
    preferredTime: trimmedTime || null,
    receivedAt,
    emailStatus: emailResult.success ? 'dispatched' : `failed_${emailResult.status || 'unknown'}`,
    emailDetails: emailResult.success ? { messageId: emailResult.messageId } : { error: emailResult.error },
  };

  try {
    // insertOne adds _id to its argument; insert a copy to keep the record clean
    await inquiriesCollection().insertOne({ ...inquiryRecord });
    console.log('[INQUIRY RECORDED]', inquiryRecord.id, inquiryRecord.emailStatus);
  } catch (dbErr) {
    // Email outcome still determines the response; log so the lead isn't silently lost
    console.error('[INQUIRY DB ERROR]', inquiryRecord.id, dbErr.message, JSON.stringify(inquiryRecord));
  }

  // If email provider rejected or configuration is missing, return safe error
  if (!emailResult.success) {
    return res.status(502).json({
      success: false,
      status: emailResult.status,
      error: emailResult.error || 'Failed to dispatch consultation email. Please retry or contact us directly.',
      inquiryRef: inquiryId,
    });
  }

  // Return confirmed success only after provider confirmation
  return res.status(201).json({
    success: true,
    message: 'Your consultation request has been successfully transmitted to our executive directors.',
    inquiryRef: inquiryId,
  });
});

/**
 * GET /api/inquiries
 * Returns captured inquiries list, newest first (admin only)
 */
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const data = await inquiriesCollection()
      .find({}, { projection: { _id: 0 } })
      .sort({ receivedAt: -1 })
      .toArray();
    res.json({ count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
