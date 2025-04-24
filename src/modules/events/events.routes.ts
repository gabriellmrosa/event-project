import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from './events.controller';

import lotesRoutes from '../lotes/lotes.routes';
import { validateIdParam } from '../../middlewares/validateIdParam';
import { validateBody } from '../../middlewares/validateBody';
import { createEventSchema, updateEventSchema } from '../../schemas/event.schema';

const router = Router();

router.get('/', getAllEvents);
router.get('/:eventId', validateIdParam('eventId'), getEventById);
router.post('/', validateBody(createEventSchema), createEvent);
router.put('/:eventId', validateIdParam('eventId'), validateBody(updateEventSchema), updateEvent);
router.delete('/:eventId', validateIdParam('eventId'), deleteEvent);

router.use('/:eventId/lotes', validateIdParam('eventId'), lotesRoutes);

export default router;
