import { Router } from 'express';
import {
  getLotesByEvent,
  getLoteById,
  createLote,
  updateLote,
  deleteLote
} from './lotes.controller';

import { validateIdParam } from '../../middlewares/validateIdParam';
import { validateBody } from '../../middlewares/validateBody';
import { createLoteSchema, updateLoteSchema } from '../../schemas/lote.schema';

const router = Router({ mergeParams: true });

router.get('/', getLotesByEvent);
router.post('/', validateBody(createLoteSchema), createLote);

router.get('/:loteId', validateIdParam('loteId'), getLoteById);
router.put('/:loteId', validateIdParam('loteId'), validateBody(updateLoteSchema), updateLote);
router.delete('/:loteId', validateIdParam('loteId'), deleteLote);

export default router;
