import { Router } from 'express';
import {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { validate } from '../middlewares/validate';
import { validateId } from '../middlewares/validateUUID';
import { createRateLimit, strictRateLimit } from '../middlewares/rateLimit';
import { eventSchema, updateEventSchema } from '../schemas/eventSchema';

const router = Router();

router.get('/', createRateLimit, getAllEvents);
router.get('/:id', createRateLimit, validateId, getSingleEvent);
router.post('/', strictRateLimit, validate(eventSchema), createEvent);
router.put('/:id', strictRateLimit, validateId, validate(updateEventSchema), updateEvent);
router.delete('/:id', strictRateLimit, validateId, deleteEvent);

export default router;
