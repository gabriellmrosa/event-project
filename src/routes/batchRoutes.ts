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

/**
 * @swagger
 * /events/{eventId}/batches:
 *   get:
 *     summary: Listar lotes do evento
 *     description: Retorna uma lista paginada de lotes de um evento específico com filtros opcionais
 *     tags: [Batches]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdForBatch'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - name: name
 *         in: query
 *         description: Filtrar lotes por nome
 *         schema:
 *           type: string
 *           example: "early"
 *       - name: priceMin
 *         in: query
 *         description: Preço mínimo para filtro
 *         schema:
 *           type: number
 *           example: 50
 *       - name: priceMax
 *         in: query
 *         description: Preço máximo para filtro
 *         schema:
 *           type: number
 *           example: 200
 *       - name: startDateFrom
 *         in: query
 *         description: Data inicial do período de venda
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: startDateTo
 *         in: query
 *         description: Data final do período de venda
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Lista de lotes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedBatches'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/', createRateLimit, validateEventId, getAllBatchesByEvent);

/**
 * @swagger
 * /events/{eventId}/batches/{batchId}:
 *   get:
 *     summary: Buscar lote específico
 *     tags: [Batches]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdForBatch'
 *       - $ref: '#/components/parameters/BatchId'
 *     responses:
 *       200:
 *         description: Lote encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:batchId', createRateLimit, validateEventId, validateBatchId, getSingleBatch);

/**
 * @swagger
 * /events/{eventId}/batches:
 *   post:
 *     summary: Criar novo lote
 *     description: Cria um novo lote de ingressos para o evento especificado
 *     tags: [Batches]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdForBatch'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBatch'
 *     responses:
 *       201:
 *         description: Lote criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post('/', strictRateLimit, validateEventId, validate(batchSchema), createBatch);

/**
 * @swagger
 * /events/{eventId}/batches/{batchId}:
 *   put:
 *     summary: Atualizar lote
 *     description: Atualiza dados de um lote existente. Apenas campos fornecidos serão atualizados.
 *     tags: [Batches]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdForBatch'
 *       - $ref: '#/components/parameters/BatchId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBatch'
 *     responses:
 *       200:
 *         description: Lote atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:batchId', strictRateLimit, validateEventId, validateBatchId, validate(updateBatchSchema), updateBatch);

/**
 * @swagger
 * /events/{eventId}/batches/{batchId}:
 *   delete:
 *     summary: Deletar lote
 *     description: Remove um lote permanentemente
 *     tags: [Batches]
 *     parameters:
 *       - $ref: '#/components/parameters/EventIdForBatch'
 *       - $ref: '#/components/parameters/BatchId'
 *     responses:
 *       204:
 *         description: Lote deletado com sucesso
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/:batchId', strictRateLimit, validateEventId, validateBatchId, deleteBatch);

export default router;
