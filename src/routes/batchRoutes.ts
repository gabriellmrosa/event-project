import { Router } from 'express';
import {
  getAllBatchesByEvent,
  getSingleBatch,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController';
import { validate } from '../middlewares/validate';
import { validateEventId, validateBatchId } from '../middlewares/validateUUID';
import { createRateLimit, strictRateLimit } from '../middlewares/rateLimit';
import { batchSchema, updateBatchSchema } from '../schemas/batchSchema';

const router = Router({ mergeParams: true });

router.get('/', createRateLimit, validateEventId, getAllBatchesByEvent);
router.get('/:batchId', createRateLimit, validateEventId, validateBatchId, getSingleBatch);
router.post('/', strictRateLimit, validateEventId, validate(batchSchema), createBatch);
router.put('/:batchId', strictRateLimit, validateEventId, validateBatchId, validate(updateBatchSchema), updateBatch);
router.delete('/:batchId', strictRateLimit, validateEventId, validateBatchId, deleteBatch);

export default router;
