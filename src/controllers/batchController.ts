import { Request, Response } from 'express';
import {
  getBatchesByEventId,
  getBatchById,
  createBatch as createBatchService,
  updateBatch as updateBatchService,
  deleteBatch as deleteBatchService,
} from '../services/batchServices';
import { isValidUUID } from '../utils/isValidUUID';

export const getBatchesByEventIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventId = req.params.eventId;

  if (!isValidUUID(eventId)) {
    return res.status(400).json({ message: 'ID do evento inválido' });
  }

  try {
    const batches = await getBatchesByEventId(eventId);
    return res.json(batches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar lotes' });
  }
};

export const getBatchByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID do lote inválido' });
  }

  try {
    const batch = await getBatchById(id);
    if (!batch) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }
    return res.json(batch);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar lote' });
  }
};

export const createBatch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const eventId = req.params.eventId;

  if (!isValidUUID(eventId)) {
    return res.status(400).json({ message: 'ID do evento inválido' });
  }

  try {
    const newBatch = await createBatchService(eventId, req.body);
    return res.status(201).json(newBatch);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar lote' });
  }
};

export const updateBatch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID do lote inválido' });
  }

  try {
    const updated = await updateBatchService(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar lote' });
  }
};

export const deleteBatch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID do lote inválido' });
  }

  try {
    const deleted = await deleteBatchService(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar lote' });
  }
};
