import { Request, Response, NextFunction } from 'express';
import {
  createBatchService,
  getAllBatchesByEventService,
  getSingleBatchService,
  updateBatchService,
  deleteBatchService,
  searchBatchesService,
  getTotalBatchesCountService,
} from '../services/batchServices';
import { getSingleEventService } from '../services/eventServices';
import { BatchFilters } from '../types/batch';
import { getPaginationParams, getOffset, createPaginationResponse } from '../utils/pagination';

export const getAllBatchesByEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params;
    const { page, limit } = getPaginationParams(req);
    const offset = getOffset(page, limit);

    const event = await getSingleEventService(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    const hasFilters = req.query.name || req.query.priceMin || req.query.priceMax || req.query.startDateFrom || req.query.startDateTo;

    if (hasFilters) {
      const filters: BatchFilters = {
        name: req.query.name as string,
        priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
        priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
        startDateFrom: req.query.startDateFrom as string,
        startDateTo: req.query.startDateTo as string,
      };

      const [batches, total] = await Promise.all([
        searchBatchesService(eventId, filters, limit, offset),
        getTotalBatchesCountService(eventId, filters),
      ]);

      const response = createPaginationResponse(batches, total, page, limit);
      return res.status(200).json(response);
    }

    const [batches, total] = await Promise.all([
      getAllBatchesByEventService(eventId, limit, offset),
      getTotalBatchesCountService(eventId),
    ]);

    const response = createPaginationResponse(batches, total, page, limit);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params;

    const event = await getSingleEventService(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado para criar lote' });
    }

    const batch = await createBatchService(eventId, req.body);
    return res.status(201).json(batch);
  } catch (error) {
    next(error);
  }
};

export const getSingleBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, batchId } = req.params;
    const batch = await getSingleBatchService(eventId, batchId);

    if (!batch) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }

    return res.status(200).json(batch);
  } catch (error) {
    next(error);
  }
};

export const updateBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, batchId } = req.params;
    const batch = await updateBatchService(eventId, batchId, req.body);

    if (!batch) {
      return res.status(404).json({ message: 'Lote não encontrado para atualização' });
    }

    return res.status(200).json(batch);
  } catch (error) {
    next(error);
  }
};

export const deleteBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, batchId } = req.params;
    const deleted = await deleteBatchService(eventId, batchId);

    if (!deleted) {
      return res.status(404).json({ message: 'Lote não encontrado para exclusão' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
