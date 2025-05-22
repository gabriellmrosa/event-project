import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import eventRoutes from './routes/eventRoutes';
import batchRoutes from './routes/batchRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';

const app = express();

app.use(helmet());

app.use(cors({
  origin: env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Evento API - Documentação',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
}));

// API Routes
app.use('/api', healthRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/events/:eventId/batches', batchRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint não encontrado',
    path: req.path,
    method: req.method,
  });
});

app.use(errorHandler);

export default app;
