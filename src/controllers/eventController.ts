import { Request, Response } from 'express';
import { Event } from '../models/eventModel';

let events: Event[] = [];

export const getAllEvents = (req: Request, res: Response): Response => {
  return res.json(events);
};

export const getEventById = (req: Request, res: Response): Response => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  return res.json(event);
};

export const createEvent = (req: Request, res: Response): Response => {
  const newEvent: Event = {
    id: Date.now().toString(),
    ...req.body,
  };
  events.push(newEvent);
  return res.status(201).json(newEvent);
};

export const updateEvent = (req: Request, res: Response): Response => {
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  events[index] = { ...events[index], ...req.body };
  return res.json(events[index]);
};

export const deleteEvent = (req: Request, res: Response): Response => {
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  events.splice(index, 1);
  return res.status(204).send();
};
