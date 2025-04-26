import { Router } from 'express';
import {
  getAllBatchesByEvent,
  getSingleBatch,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController';

const router = Router({ mergeParams: true });

// Rotas de lotes (batches) associadas a um evento
router.get('/', getAllBatchesByEvent);
router.get('/:batchId', getSingleBatch);
router.post('/', createBatch);
router.put('/:batchId', updateBatch);
router.delete('/:batchId', deleteBatch);

export default router;
