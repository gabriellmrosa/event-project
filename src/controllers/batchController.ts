import { Request, Response } from 'express';
import {
  createBatchService,
  getAllBatchesByEventService,
  getSingleBatchService,
  updateBatchService,
  deleteBatchService,
} from '../services/batchServices';
import { getSingleEventService } from '../services/eventServices';
import { isValidUUID } from '../utils/isValidUUID';

export const getAllBatchesByEvent = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  if (!isValidUUID(eventId)) {
    return res.status(400).json({ message: 'ID do evento inválido' });
  }

  try {
    const event = await getSingleEventService(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    const batches = await getAllBatchesByEventService(eventId);
    return res.status(200).json(batches);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createBatch = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;

  if (!isValidUUID(eventId)) {
    return res.status(400).json({ message: 'ID do evento inválido' });
  }

  try {
    const event = await getSingleEventService(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ message: 'Evento não encontrado para criar lote' });
    }

    const batch = await createBatchService(eventId, req.body);
    return res.status(201).json(batch);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getSingleBatch = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const batchId = req.params.batchId;

  if (!isValidUUID(eventId) || !isValidUUID(batchId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const batch = await getSingleBatchService(eventId, batchId);

    if (!batch) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }

    return res.status(200).json(batch);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateBatch = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const batchId = req.params.batchId;

  if (!isValidUUID(eventId) || !isValidUUID(batchId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const batch = await updateBatchService(eventId, batchId, req.body);

    if (!batch) {
      return res
        .status(404)
        .json({ message: 'Lote não encontrado para atualização' });
    }

    return res.status(200).json(batch);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteBatch = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  const batchId = req.params.batchId;

  if (!isValidUUID(eventId) || !isValidUUID(batchId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const deleted = await deleteBatchService(eventId, batchId);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: 'Lote não encontrado para exclusão' });
    }

    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
