import { Router } from 'express';
import {
  getBatchesByEventId,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController';

const router = Router({ mergeParams: true });

router.get('/', getBatchesByEventId);
router.get('/:id', getBatchById);
router.post('/', createBatch);
router.put('/:id', updateBatch);
router.delete('/:id', deleteBatch);

export default router;
