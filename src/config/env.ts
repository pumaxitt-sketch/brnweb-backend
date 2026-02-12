import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
  emailFrom: process.env.EMAIL_FROM || 'contato@brnweb.com',
  emailTo: process.env.EMAIL_TO || 'brn.webs@gmail.com',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
};
