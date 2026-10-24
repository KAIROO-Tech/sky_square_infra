import nodemailer from 'nodemailer';

/**
 * Escapes user-supplied content to prevent HTML injection in emails
 */
export const escapeHtml = (unsafeText) => {
  if (!unsafeText && unsafeText !== 0) return '';
  return String(unsafeText)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Formats a plain-text consultation request email
 */
export const buildConsultationPlainText = ({
  fullName,
  phone,
  email,
  interest,
  location,
  message,
  timestamp,
  inquiryId,
}) => {
  return `Sky Square Infra — New Consultation Request

A new consultation request has been submitted through the website.

Inquiry Reference: ${inquiryId}

Contact Details
- Full Name: ${fullName}
- Contact Phone: ${phone}
- Email Address: ${email}

Consultation Details
- Area of Engagement: ${interest}
- Location of Interest: ${location || 'Not provided'}
- Project Scope / Specific Requirements:
${message || 'Not provided'}

Submission Information
- Submission Date and Time: ${timestamp}

---
Sky Square Infra
Consultation Request System
Direct reply will reach ${fullName} at ${email}
`;
};

/**
 * Formats a clean, high-precision HTML consultation request email
 */
export const buildConsultationHtml = ({
  fullName,
  phone,
  email,
  interest,
  location,
  message,
  timestamp,
  inquiryId,
}) => {
  const safeFullName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeInterest = escapeHtml(interest);
  const safeLocation = escapeHtml(location || 'Not provided');
  const safeMessage = escapeHtml(message || 'Not provided');
  const safeInquiryId = escapeHtml(inquiryId);
  const safeTimestamp = escapeHtml(timestamp);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request — Sky Square Infra</title>
  <style>
    body {
      margin: 0;
      padding: 32px 16px;
      background-color: #F7F5F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #141416;
      line-height: 1.5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid rgba(20, 20, 20, 0.10);
      border-top: 4px solid #D4AF37;
      padding: 40px 36px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    }
    .brand-overline {
      font-family: "JetBrains Mono", Menlo, Consolas, monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: #D4AF37;
      font-weight: 600;
      margin-bottom: 8px;
    }
    h1 {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 26px;
      font-weight: 400;
      color: #141416;
      margin: 0 0 8px 0;
      letter-spacing: -0.01em;
    }
    .subtitle {
      font-size: 13px;
      color: #5C5851;
      margin: 0 0 28px 0;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(20, 20, 20, 0.08);
    }
    .section-title {
      font-family: "JetBrains Mono", Menlo, Consolas, monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #8A857B;
      margin: 24px 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(20, 20, 20, 0.06);
    }
    .field-row {
      margin-bottom: 12px;
    }
    .field-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #7A766F;
      margin-bottom: 3px;
    }
    .field-value {
      font-size: 14px;
      color: #141416;
      font-weight: 500;
    }
    .field-value a {
      color: #D4AF37;
      text-decoration: none;
    }
    .message-card {
      background: #F7F5F0;
      border-left: 3px solid #D4AF37;
      padding: 16px;
      margin-top: 6px;
      font-size: 14px;
      line-height: 1.6;
      color: #141416;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .badge-ref {
      display: inline-block;
      font-family: "JetBrains Mono", Menlo, Consolas, monospace;
      font-size: 11px;
      background: rgba(212, 175, 55, 0.12);
      color: #B89358;
      padding: 3px 8px;
      letter-spacing: 0.15em;
      margin-top: 4px;
    }
    .footer {
      margin-top: 36px;
      padding-top: 24px;
      border-top: 1px solid rgba(20, 20, 20, 0.08);
      font-size: 11px;
      color: #8A857B;
      text-align: center;
      line-height: 1.6;
    }
    .footer strong {
      color: #141416;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-overline">Sky Square Infra — Executive Consultation</div>
    <h1>New Consultation Request</h1>
    <p class="subtitle">A new advisory request has been dispatched from the website portal.</p>

    <div class="section-title">Inquiry Identification</div>
    <div class="field-row">
      <div class="field-label">Reference ID</div>
      <div class="badge-ref">${safeInquiryId}</div>
    </div>

    <div class="section-title">Contact Details</div>
    <div class="field-row">
      <div class="field-label">Full Name</div>
      <div class="field-value">${safeFullName}</div>
    </div>
    <div class="field-row">
      <div class="field-label">Contact Phone</div>
      <div class="field-value"><a href="tel:${safePhone}">${safePhone}</a></div>
    </div>
    <div class="field-row">
      <div class="field-label">Email Address</div>
      <div class="field-value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
    </div>

    <div class="section-title">Consultation Details</div>
    <div class="field-row">
      <div class="field-label">Area of Engagement</div>
      <div class="field-value">${safeInterest}</div>
    </div>
    <div class="field-row">
      <div class="field-label">Location of Interest</div>
      <div class="field-value">${safeLocation}</div>
    </div>
    <div class="field-row">
      <div class="field-label">Project Scope / Specific Requirements</div>
      <div class="message-card">${safeMessage}</div>
    </div>

    <div class="section-title">Submission Information</div>
    <div class="field-row">
      <div class="field-label">Submission Date & Time</div>
      <div class="field-value">${safeTimestamp}</div>
    </div>

    <div class="footer">
      <strong>Sky Square Infra</strong> — Consultation Request System<br />
      Direct replies will reach the client directly via <a href="mailto:${safeEmail}" style="color: #D4AF37;">${safeEmail}</a>.
    </div>
  </div>
</body>
</html>`;
};

/**
 * Sends a consultation request email using the server's configured recipient and SMTP transport
 */
export async function sendConsultationEmail(inquiryData) {
  const recipientEmail = process.env.CONSULTATION_RECIPIENT_EMAIL?.trim();

  // Validate authoritative recipient configuration
  if (
    !recipientEmail ||
    recipientEmail === 'YOUR_RECEIVING_EMAIL_HERE' ||
    recipientEmail === 'YOUR_RECIPIENT_EMAIL_HERE' ||
    recipientEmail.includes('example.com') ||
    !recipientEmail.includes('@')
  ) {
    return {
      success: false,
      status: 'unconfigured_recipient',
      error: 'CONSULTATION_RECIPIENT_EMAIL is not yet configured in .env. Please open .env and set your receiving email address.',
    };
  }

  // Validate SMTP configuration
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPass ||
    smtpHost.includes('yourprovider.com') ||
    smtpHost.includes('example.com')
  ) {
    return {
      success: false,
      status: 'unconfigured_smtp',
      error: 'SMTP transport credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not yet configured in .env. Please update them to enable live delivery.',
    };
  }

  const fromAddress = process.env.EMAIL_FROM_ADDRESS?.trim() || `Sky Square Infra <${smtpUser}>`;
  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  });

  const payload = {
    ...inquiryData,
    timestamp,
    inquiryId: inquiryData.inquiryId || `INQ-${Date.now().toString().slice(-6)}`,
  };

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // Reasonable connection timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const mailOptions = {
    from: fromAddress,
    to: recipientEmail,
    replyTo: `${inquiryData.fullName.trim()} <${inquiryData.email.trim()}>`,
    subject: 'New Consultation Request — Sky Square Infra',
    text: buildConsultationPlainText(payload),
    html: buildConsultationHtml(payload),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL DISPATCHED] ID: ${info.messageId} to ${recipientEmail}`);
    return {
      success: true,
      messageId: info.messageId,
      recipient: recipientEmail,
      inquiryId: payload.inquiryId,
    };
  } catch (err) {
    console.error('[EMAIL DISPATCH ERROR]', err.message);
    return {
      success: false,
      status: 'delivery_failed',
      error: 'Email provider failed to accept the message. Please verify SMTP host credentials.',
      details: err.message,
    };
  }
}
