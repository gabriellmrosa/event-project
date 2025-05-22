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

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Listar eventos com paginação e filtros
 *     description: Retorna uma lista paginada de eventos com opções de filtro por nome, status e período
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - name: name
 *         in: query
 *         description: Filtrar eventos por nome (busca parcial)
 *         schema:
 *           type: string
 *           example: "festa"
 *       - name: status
 *         in: query
 *         description: Filtrar eventos por status
 *         schema:
 *           type: string
 *           enum: [DRAFT, PUBLISHED]
 *           example: "PUBLISHED"
 *       - name: dateFrom
 *         in: query
 *         description: Data inicial para filtro de período (ISO 8601)
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *       - name: dateTo
 *         in: query
 *         description: Data final para filtro de período (ISO 8601)
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedEvents'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', createRateLimit, getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Buscar evento específico
 *     description: Retorna os dados de um evento específico pelo ID
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', createRateLimit, validateId, getSingleEvent);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Criar novo evento
 *     description: Cria um novo evento com os dados fornecidos
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *           example:
 *             name: "Festa de Ano Novo 2024"
 *             description: "Uma festa incrível para celebrar o ano novo"
 *             date: "2024-12-31T23:00:00.000Z"
 *             location: "Centro de Convenções - São Paulo/SP"
 *             status: "DRAFT"
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', strictRateLimit, validate(eventSchema), createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Atualizar evento
 *     description: Atualiza os dados de um evento existente. Apenas os campos fornecidos serão atualizados.
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEvent'
 *           example:
 *             name: "Festa de Réveillon 2024 - ATUALIZADA"
 *             status: "PUBLISHED"
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', strictRateLimit, validateId, validate(updateEventSchema), updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Deletar evento
 *     description: Remove um evento permanentemente. Esta ação também removerá todos os lotes associados.
 *     tags: [Events]
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     responses:
 *       204:
 *         description: Evento deletado com sucesso
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', strictRateLimit, validateId, deleteEvent);

export default router;
