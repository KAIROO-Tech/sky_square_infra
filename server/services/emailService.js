// Loads the root .env before any process.env references
import '../config/env.js';
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
 * Parses SMTP_SECURE safely to a boolean.
 * Ensures string "true" is never accidentally falsy and parses port defaults.
 */
export const parseSmtpSecure = (rawSecure, port) => {
  if (typeof rawSecure === 'string') {
    const trimmed = rawSecure.trim().toLowerCase();
    if (trimmed === 'true' || trimmed === '1' || trimmed === 'yes') return true;
    if (trimmed === 'false' || trimmed === '0' || trimmed === 'no') return false;
  }
  if (typeof rawSecure === 'boolean') return rawSecure;
  return Number(port) === 465;
};

/**
 * Extracts and normalizes SMTP configuration from environment variables.
 * Credentials and recipient are sourced exclusively from environment variables.
 */
export function getSmtpConfig() {
  const recipientEmail = process.env.CONSULTATION_RECIPIENT_EMAIL?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPortRaw = process.env.SMTP_PORT?.trim();
  const smtpPort = Number(smtpPortRaw) || 465;
  const smtpSecure = parseSmtpSecure(process.env.SMTP_SECURE, smtpPort);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const fromAddressRaw = process.env.EMAIL_FROM_ADDRESS?.trim();

  // The sender mailbox must be compatible with the authenticated Titan mailbox.
  let fromAddress = fromAddressRaw;
  if (!fromAddress) {
    fromAddress = `Sky Square Infra Consultation Desk <${smtpUser || 'info@skysquareinfra.com'}>`;
  } else if (!fromAddress.includes('<') && smtpUser) {
    fromAddress = `${fromAddress} <${smtpUser}>`;
  }

  return {
    recipientEmail,
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    fromAddress,
  };
}

/**
 * Validates the presence and format of required SMTP environment variables.
 * Never exposes secret credentials in return values or error messages.
 */
export function validateSmtpEnvironment() {
  const config = getSmtpConfig();
  const missing = [];
  const invalid = [];

  if (!config.recipientEmail) {
    missing.push('CONSULTATION_RECIPIENT_EMAIL');
  } else if (
    !config.recipientEmail.includes('@') ||
    config.recipientEmail.includes('YOUR_') ||
    config.recipientEmail.includes('example.com')
  ) {
    invalid.push('CONSULTATION_RECIPIENT_EMAIL (invalid or placeholder recipient)');
  }

  if (!config.smtpHost) {
    missing.push('SMTP_HOST');
  } else if (config.smtpHost.includes('yourprovider.com') || config.smtpHost.includes('example.com')) {
    invalid.push('SMTP_HOST (placeholder value)');
  }

  if (!config.smtpPort || isNaN(config.smtpPort)) {
    invalid.push('SMTP_PORT (must be a valid integer, e.g. 465 or 587)');
  }

  if (!config.smtpUser) {
    missing.push('SMTP_USER');
  } else if (!config.smtpUser.includes('@') || config.smtpUser.includes('your_smtp_username')) {
    invalid.push('SMTP_USER (must be the authenticated email address)');
  }

  if (!config.smtpPass) {
    missing.push('SMTP_PASS');
  } else if (config.smtpPass.includes('your_smtp_password')) {
    invalid.push('SMTP_PASS (placeholder password)');
  }

  return {
    isValid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    configSummary: {
      recipientConfigured: !!config.recipientEmail,
      recipient: config.recipientEmail || null,
      host: config.smtpHost || null,
      port: config.smtpPort,
      secure: config.smtpSecure,
      user: config.smtpUser || null,
      passConfigured: !!config.smtpPass,
      fromAddress: config.fromAddress || null,
    },
  };
}

/**
 * Creates a configured Nodemailer transporter instance using environment settings.
 */
export function createTransporter() {
  const config = getSmtpConfig();
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    // Production connection timeouts (ms)
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

/**
 * Verifies SMTP connectivity and authentication with Titan without logging secrets.
 */
export async function verifySmtpConnection() {
  const validation = validateSmtpEnvironment();
  if (!validation.isValid) {
    const errorDetails = [
      ...validation.missing.map((v) => `Missing: ${v}`),
      ...validation.invalid.map((v) => `Invalid: ${v}`),
    ].join('; ');
    console.error(`[SMTP CONFIGURATION ERROR] ${errorDetails}`);
    return {
      success: false,
      stage: 'configuration',
      code: 'INVALID_CONFIG',
      error: `SMTP environment configuration incomplete: ${errorDetails}`,
    };
  }

  const { host, port, secure, user } = validation.configSummary;
  console.log(`[SMTP DIAGNOSTIC] Initiating connection verification to ${host}:${port} (SSL/TLS: ${secure}) as ${user}...`);

  try {
    const transporter = createTransporter();
    const verified = await transporter.verify();
    console.log(`[SMTP AUTHENTICATION SUCCESS] Transporter verified successfully with ${host}:${port}. Mailbox ready for dispatch.`);
    return {
      success: true,
      stage: 'authenticated',
      host,
      port,
      verified,
    };
  } catch (err) {
    let stage = 'connection';
    let userFriendlyError = 'Could not establish connection to the SMTP server.';

    if (err.code === 'EAUTH' || err.responseCode === 535 || (err.message && err.message.includes('535'))) {
      stage = 'authentication';
      userFriendlyError = 'SMTP authentication failed. Titan rejected the credentials. Verify the mailbox password or generate a Titan App Password if 2FA is active.';
    } else if (err.code === 'EDNS' || err.code === 'ENOTFOUND') {
      stage = 'dns';
      userFriendlyError = `DNS resolution failed for SMTP host: ${host}`;
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      stage = 'connection';
      userFriendlyError = `Network connection to ${host}:${port} timed out or was refused.`;
    } else {
      stage = 'protocol';
      userFriendlyError = err.message;
    }

    // Sanitized log: strictly never log credentials or raw auth packets
    console.error(`[SMTP VERIFICATION FAILED] Stage: ${stage} | Host: ${host}:${port} | Code: ${err.code || 'UNKNOWN'} | Message: ${err.message}`);

    return {
      success: false,
      stage,
      code: err.code || 'SMTP_ERROR',
      error: userFriendlyError,
      rawError: err.message,
    };
  }
}

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
  preferredDate,
  preferredTime,
  timestamp,
  inquiryId,
}) => {
  const scheduleSection = preferredDate || preferredTime
    ? `
Requested Appointment Schedule
- Preferred Date: ${preferredDate || 'Flexible / To be confirmed'}
- Preferred Time Slot: ${preferredTime || 'Flexible / To be confirmed'}
`
    : '';

  return `Sky Square Infra — Official Consultation Request

A new executive consultation request has been submitted through the website portal.

Inquiry Reference: ${inquiryId}

Client Contact Details
- Full Name: ${fullName}
- Contact Phone: ${phone}
- Email Address: ${email}
${scheduleSection}
Consultation Specifications
- Area of Engagement: ${interest || 'General Consultation'}
- Location of Interest: ${location?.trim() ? location : 'Not specified'}
- Project Scope / Specific Requirements:
${message?.trim() ? message : 'Not specified'}

Submission Information
- Submission Date & Time: ${timestamp} (Asia/Kolkata)

---
Sky Square Infra — Consultation Request System
Direct reply to this email will reach ${fullName} at ${email}.
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
  preferredDate,
  preferredTime,
  timestamp,
  inquiryId,
}) => {
  const safeFullName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeInterest = escapeHtml(interest || 'General Consultation');
  const safeLocation = escapeHtml(location?.trim() ? location : 'Not specified');
  const safeMessage = escapeHtml(message?.trim() ? message : 'Not specified');
  const safePreferredDate = escapeHtml(preferredDate || '');
  const safePreferredTime = escapeHtml(preferredTime || '');
  const safeInquiryId = escapeHtml(inquiryId);
  const safeTimestamp = escapeHtml(timestamp);

  const scheduleHtml = (preferredDate || preferredTime)
    ? `
    <div class="section-title">Requested Appointment Schedule</div>
    <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.35); padding: 16px; margin: 12px 0 20px 0;">
      <div class="field-row" style="margin-bottom: 8px;">
        <div class="field-label" style="color: #B89358; font-weight: 600;">Preferred Date</div>
        <div class="field-value" style="font-size: 15px; font-weight: 600; color: #141416;">${safePreferredDate || 'Flexible / To be confirmed'}</div>
      </div>
      <div class="field-row" style="margin-bottom: 0;">
        <div class="field-label" style="color: #B89358; font-weight: 600;">Preferred Time Slot</div>
        <div class="field-value" style="font-size: 15px; font-weight: 600; color: #141416;">${safePreferredTime || 'Flexible / To be confirmed'}</div>
      </div>
    </div>`
    : '';

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
      max-width: 620px;
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

    <div class="section-title">Client Contact Details</div>
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
${scheduleHtml}
    <div class="section-title">Consultation Specifications</div>
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
      <div class="field-value">${safeTimestamp} (Asia/Kolkata)</div>
    </div>

    <div class="footer">
      <strong>Sky Square Infra</strong> — Consultation Request System<br />
      Direct replies to this message will reach the client at <a href="mailto:${safeEmail}" style="color: #D4AF37;">${safeEmail}</a>.
    </div>
  </div>
</body>
</html>`;
};

/**
 * Sends a consultation request email using the server's configured recipient and Titan SMTP transport.
 */
export async function sendConsultationEmail(inquiryData) {
  // 1. Validate environment configuration
  const validation = validateSmtpEnvironment();
  if (!validation.isValid) {
    const errorMsg = [
      ...validation.missing.map((v) => `Missing variable: ${v}`),
      ...validation.invalid.map((v) => `Invalid variable: ${v}`),
    ].join(', ');
    console.error(`[SMTP DISPATCH ABORTED] Environment configuration incomplete: ${errorMsg}`);
    return {
      success: false,
      status: 'unconfigured_smtp',
      error: 'Consultation dispatch server is not fully configured. Please ensure SMTP credentials are set in .env.',
      details: errorMsg,
    };
  }

  const config = getSmtpConfig();
  const recipientEmail = config.recipientEmail;
  const smtpHost = config.smtpHost;

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

  const transporter = createTransporter();

  // Clean Reply-To: strip any control characters
  const cleanName = inquiryData.fullName.trim().replace(/[\r\n",]/g, '');
  const cleanEmail = inquiryData.email.trim().replace(/[\r\n<>]/g, '');
  const replyTo = `"${cleanName}" <${cleanEmail}>`;

  const subject = payload.preferredDate
    ? `Consultation Appointment Request (${payload.preferredDate}${payload.preferredTime ? ` at ${payload.preferredTime}` : ''}) — Sky Square Infra [${payload.inquiryId}]`
    : `New Consultation Request: ${cleanName} — Sky Square Infra [${payload.inquiryId}]`;

  const mailOptions = {
    from: config.fromAddress,
    to: recipientEmail,
    replyTo,
    subject,
    text: buildConsultationPlainText(payload),
    html: buildConsultationHtml(payload),
  };

  console.log(`[SMTP ATTEMPT] Dispatching consultation inquiry ${payload.inquiryId} via ${smtpHost}:${config.smtpPort} to ${recipientEmail}...`);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP ACCEPTANCE SUCCESS] Inquiry ${payload.inquiryId} accepted by ${smtpHost}. MessageId: ${info.messageId} | Recipient: ${recipientEmail}`);
    return {
      success: true,
      messageId: info.messageId,
      recipient: recipientEmail,
      inquiryId: payload.inquiryId,
      accepted: info.accepted,
    };
  } catch (err) {
    let failureCategory = 'delivery_failed';
    let userFriendlyError = 'Our mail server failed to deliver the consultation request.';

    if (err.code === 'EAUTH' || err.responseCode === 535 || (err.message && err.message.includes('535'))) {
      failureCategory = 'authentication_failed';
      userFriendlyError = 'Mail server authentication failed with Titan SMTP. Please verify mailbox credentials or generate a Titan App Password.';
    } else if (err.code === 'EDNS' || err.code === 'ENOTFOUND') {
      failureCategory = 'connection_failed';
      userFriendlyError = `Unable to reach the mail server host (${smtpHost}).`;
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      failureCategory = 'connection_failed';
      userFriendlyError = `Connection to mail server ${smtpHost} timed out.`;
    }

    // Sanitized log: strictly never print passwords or secrets
    console.error(`[SMTP SUBMISSION FAILED] Category: ${failureCategory} | Code: ${err.code || 'UNKNOWN'} | Recipient: ${recipientEmail} | Error: ${err.message}`);

    return {
      success: false,
      status: failureCategory,
      error: userFriendlyError,
      details: err.message,
    };
  }
}
