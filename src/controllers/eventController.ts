import { Request, Response } from 'express';
import {
  getAllEventsService,
  getSingleEventService,
  createEventService,
  updateEventService,
  deleteEventService,
} from '../services/eventServices';
import { isValidUUID } from '../utils/isValidUUID';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    return res.status(200).json(events);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleEvent = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const event = await getSingleEventService(id);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json(event);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await createEventService(req.body);
    return res.status(201).json(event);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const event = await updateEventService(id, req.body);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(200).json(event);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const deleted = await deleteEventService(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
