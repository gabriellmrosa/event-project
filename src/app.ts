import express from 'express';
import eventRoutes from './routes/eventRoutes';
import batchRoutes from './routes/batchRoutes';

const app = express();
app.use(express.json());

app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/events/:eventId/batches', batchRoutes);

export default app;
