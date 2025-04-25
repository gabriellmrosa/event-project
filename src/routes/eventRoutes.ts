import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { validate } from '../middlewares/validate';
import { eventSchema } from '../schemas/eventSchema';

const router = Router({ mergeParams: true });

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', validate(eventSchema), createEvent);
router.put('/:id', validate(eventSchema), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
