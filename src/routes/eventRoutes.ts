import { Router } from 'express';
import {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getSingleEvent);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
