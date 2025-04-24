import { Request, Response } from 'express';
import {
  getLotesByEventService,
  getLoteByIdService,
  createLoteService,
  updateLoteService,
  deleteLoteService
} from './lotes.service';

export const getLotesByEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.eventId);
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID.' });
    }

    const lotes = await getLotesByEventService(eventId);
    res.status(200).json({ data: lotes });
  } catch (error: any) {
    console.error(`Error fetching lotes for event ${req.params.eventId}:`, error);
    res.status(500).json({ error: 'Internal error while fetching lotes', details: error.message });
  }
};

export const getLoteById = async (req: Request, res: Response) => {
  try {
    const loteId = (req as any).loteId;

    const lote = await getLoteByIdService(loteId);
    if (!lote) {
      return res.status(404).json({ error: 'Lote not found.' });
    }

    res.status(200).json({ data: lote });
  } catch (error: any) {
    console.error(`Error fetching lote with ID ${req.params.loteId}:`, error);
    res.status(500).json({ error: 'Internal error while fetching lote', details: error.message });
  }
};

export const createLote = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID format.' });
    }

    const { start_sale_date, end_sale_date } = req.body;

    if (start_sale_date && end_sale_date && new Date(start_sale_date) > new Date(end_sale_date)) {
      return res.status(400).json({ error: 'Start sale date must be before end sale date.' });
    }

    const newLote = await createLoteService(eventId, req.body);
    res.status(201).json({ message: 'lote successfully created', data: newLote });
  } catch (error: any) {
    console.error('Error creating lote:', error);

    if (error.code === '23503') {
      return res.status(404).json({ error: 'Event not found.' });
    }

    return res.status(500).json({ error: 'Internal error while creating lote', details: error.message });
  }
};

export const updateLote = async (req: Request, res: Response) => {
  try {
    const loteId = (req as any).loteId;
    const updatedLote = await updateLoteService(loteId, req.body);
    res.status(200).json({ message: 'lote successfully updated', data: updatedLote });
  } catch (error: any) {
    console.error(`Error updating lote with ID ${req.params.loteId}:`, error);
    res.status(500).json({ error: 'Internal error while updating lote', details: error.message });
  }
};

export const deleteLote = async (req: Request, res: Response) => {
  try {
    const loteId = (req as any).loteId;
    await deleteLoteService(loteId);
    res.status(204).send();
  } catch (error: any) {
    console.error(`Error deleting lote with ID ${req.params.loteId}:`, error);
    res.status(500).json({ error: 'Internal error while deleting lote', details: error.message });
  }
};
