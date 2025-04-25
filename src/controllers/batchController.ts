import { Request, Response } from 'express';
import { Batch } from '../models/batchModel';

let batches: Batch[] = [];

export const getBatchesByEventId = (req: Request, res: Response): Response => {
  const eventBatches = batches.filter((b) => b.eventId === req.params.eventId);
  return res.json(eventBatches);
};

export const getBatchById = (req: Request, res: Response): Response => {
  const batch = batches.find(
    (b) => b.id === req.params.id && b.eventId === req.params.eventId
  );
  if (!batch) {
    return res.status(404).json({ message: 'Lote não encontrado' });
  }
  return res.json(batch);
};

export const createBatch = (req: Request, res: Response): Response => {
  const newBatch: Batch = {
    id: Date.now().toString(),
    eventId: req.params.eventId,
    ...req.body,
  };
  batches.push(newBatch);
  return res.status(201).json(newBatch);
};

export const updateBatch = (req: Request, res: Response): Response => {
  const index = batches.findIndex(
    (b) => b.id === req.params.id && b.eventId === req.params.eventId
  );
  if (index === -1) {
    return res.status(404).json({ message: 'Lote não encontrado' });
  }
  batches[index] = { ...batches[index], ...req.body };
  return res.json(batches[index]);
};

export const deleteBatch = (req: Request, res: Response): Response => {
  const index = batches.findIndex(
    (b) => b.id === req.params.id && b.eventId === req.params.eventId
  );
  if (index === -1) {
    return res.status(404).json({ message: 'Lote não encontrado' });
  }
  batches.splice(index, 1);
  return res.status(204).send();
};
