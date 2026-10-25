import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';

/**
 * Checks if all required AWS S3 environment variables are provided.
 * Uses environment variables exclusively (NO hardcoded credentials).
 */
export const isS3Configured = () => {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION &&
    process.env.AWS_S3_BUCKET_NAME
  );
};

/**
 * Creates and returns an S3Client instance configured from environment variables.
 */
export const getS3Client = () => {
  if (!isS3Configured()) {
    return null;
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
};

/**
 * Uploads a file buffer to S3 using configured environment variables.
 * @param {Object} params
 * @param {Buffer} params.buffer - The file buffer
 * @param {string} params.filename - Unique filename to save as
 * @param {string} params.mimetype - File mime type
 * @returns {Promise<string>} Public URL of the uploaded S3 object
 */
export const uploadBufferToS3 = async ({ buffer, filename, mimetype }) => {
  if (!isS3Configured()) {
    throw new Error('S3 is not configured. Missing required AWS environment variables.');
  }

  const s3 = getS3Client();
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const key = `projects/${filename}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  });

  await s3.send(command);

  // If a CloudFront distribution domain is configured in .env, use it
  if (process.env.AWS_CLOUDFRONT_URL) {
    const cdnBase = process.env.AWS_CLOUDFRONT_URL.replace(/\/+$/, '');
    return `${cdnBase}/${key}`;
  }

  // Return public direct S3 URL
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};
