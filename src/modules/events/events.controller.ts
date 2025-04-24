import { Request, Response } from 'express';
import {
  getAllEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
  deleteEventService,
} from './events.service';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json({ data: events });
  } catch (error: any) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ error: 'Internal error while fetching events', details: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = (req as any).eventId;
    const event = await getEventByIdService(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(200).json({ data: event });
  } catch (error: any) {
    console.error(`Error fetching event with ID ${req.params.eventId}:`, error);
    res.status(500).json({ error: 'Internal error while fetching event', details: error.message });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, start_date, end_date, location, organizer, status } = req.body;

    if (!name || !start_date || !end_date || !status) {
      return res.status(400).json({
        error: 'Fields "name", "start_date", "end_date", and "status" are required.',
      });
    }

    const newEvent = await createEventService(name, description, start_date, end_date, location, organizer, status);
    res.status(201).json({ message: 'Event successfully created', data: newEvent });
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal error while creating event', details: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = (req as any).eventId;
    const { name, description, start_date, end_date, location, organizer, status } = req.body;

    const updatedEvent = await updateEventService(
      eventId,
      name,
      description,
      start_date,
      end_date,
      location,
      organizer,
      status
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    res.status(200).json({ message: 'Event successfully updated', data: updatedEvent });
  } catch (error: any) {
    console.error(`Error updating event with ID ${req.params.eventId}:`, error);
    res.status(500).json({ error: 'Internal error while updating event', details: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = (req as any).eventId;
    const deleted = await deleteEventService(eventId);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(204).send();
  } catch (error: any) {
    console.error(`Error deleting event with ID ${req.params.eventId}:`, error);
    res.status(500).json({ error: 'Internal error while deleting event', details: error.message });
  }
};