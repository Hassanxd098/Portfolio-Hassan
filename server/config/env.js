import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'hassan_super_secret_jwt_key_2026_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'hassan-dev',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  MAIL_HOST: process.env.MAIL_HOST || 'smtp.example.com',
  MAIL_PORT: process.env.MAIL_PORT || 587,
  MAIL_USER: process.env.MAIL_USER || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
  MAIL_FROM: process.env.MAIL_FROM || 'hassan.portfolio@example.com',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'hassan.dev@example.com',
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '+1234567890',
};
