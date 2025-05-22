import { Request, Response, NextFunction } from 'express';
import {
  getAllEventsService,
  getSingleEventService,
  createEventService,
  updateEventService,
  deleteEventService,
  searchEventsService,
  getTotalEventsCountService,
} from '../services/eventServices';
import { EventFilters } from '../types/event';
import { getPaginationParams, getOffset, createPaginationResponse } from '../utils/pagination';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = getPaginationParams(req);
    const offset = getOffset(page, limit);

    const hasFilters = req.query.name || req.query.status || req.query.dateFrom || req.query.dateTo;

    if (hasFilters) {
      const filters: EventFilters = {
        name: req.query.name as string,
        status: req.query.status as 'DRAFT' | 'PUBLISHED',
        dateFrom: req.query.dateFrom as string,
        dateTo: req.query.dateTo as string,
      };

      const [events, total] = await Promise.all([
        searchEventsService(filters, limit, offset),
        getTotalEventsCountService(filters),
      ]);

      const response = createPaginationResponse(events, total, page, limit);
      return res.status(200).json(response);
    }

    const [events, total] = await Promise.all([
      getAllEventsService(limit, offset),
      getTotalEventsCountService(),
    ]);

    const response = createPaginationResponse(events, total, page, limit);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getSingleEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await getSingleEventService(id);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await createEventService(req.body);
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await updateEventService(id, req.body);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await deleteEventService(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
