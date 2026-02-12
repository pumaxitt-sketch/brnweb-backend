import cors from 'cors';
import { env } from './env';

export const corsOptions: cors.CorsOptions = {
  origin: [env.frontendUrl, 'https://portfolio-brnweb.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
