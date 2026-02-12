import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { corsOptions } from './config/cors';
import { apiLimiter } from './middlewares/rateLimit';
import routes from './routes';

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting global
app.use('/api', apiLimiter);

// Rotas
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'BRN.web API',
    version: '1.0.0',
    description: 'Backend API para o portfólio BRN.web',
    author: 'Vinicius Brina',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects',
      services: '/api/services',
    },
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
});

// Iniciar servidor
app.listen(env.port, () => {
  console.log(`
🚀 Servidor BRN.web API rodando!
📍 Porta: ${env.port}
🌐 Ambiente: ${env.nodeEnv}
🔗 URL: http://localhost:${env.port}
  `);
});

export default app;
