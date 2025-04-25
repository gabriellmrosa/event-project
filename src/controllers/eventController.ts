import { Request, Response } from 'express';
import {
  createEvent as createEventService,
  getAllEvents as getAllEventsService,
  getEventByIdFromDB,
  updateEventInDB,
  deleteEventFromDB,
} from '../services/eventServices';
import { isValidUUID } from '../utils/isValidUUID';

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const events = await getAllEventsService();
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  if (!isValidUUID(id)) {
    return res.status(400).json({ message: 'ID inválido (não é um UUID)' });
  }

  try {
    const event = await getEventByIdFromDB(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar evento' });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEvent = await createEventService(req.body);
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar evento' });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await updateEventInDB(eventId, req.body);

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar evento' });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const eventId = req.params.id;
    const deleted = await deleteEventFromDB(eventId);

    if (!deleted) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar evento' });
  }
};
