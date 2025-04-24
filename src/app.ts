// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventsRoutes, lotesRoutes } from './modules';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/events/:eventId/lotes', lotesRoutes);

app.get('/', (_, res) => res.send('Sistema rodando (v1)'));

export default app;
