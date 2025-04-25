import express from 'express';
import eventRoutes from './routes/eventRoutes';
import batchRoutes from './routes/batchRoutes';

const app = express();
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/events/:eventId/batches', batchRoutes);

export default app;
