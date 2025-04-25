import { Router } from 'express';
import {
  getBatchesByEventIdController,
  getBatchByIdController,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController';
import { validate } from '../middlewares/validate';
import { batchSchema } from '../schemas/batchSchema';

const router = Router({ mergeParams: true });

router.get('/', getBatchesByEventIdController);
router.get('/:id', getBatchByIdController);
router.post('/', validate(batchSchema), createBatch);
router.put('/:id', validate(batchSchema), updateBatch);
router.delete('/:id', deleteBatch);

export default router;
