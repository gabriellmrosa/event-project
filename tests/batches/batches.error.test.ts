import request from 'supertest';
import app from '../../src/app';
import { createValidEvent, createInvalidBatch, createValidUUID, createInvalidUUID } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Batch Endpoints - Errors', () => {
  let eventId: string;

  beforeAll(async () => {
    const eventData = createValidEvent();
    const eventResponse = await request(app)
      .post('/api/v1/events')
      .send(eventData);
    eventId = eventResponse.body.id;
  });

  afterAll(async () => {
    await pool.end();
  });

  it('deve retornar 404 para evento inexistente', async () => {
    const fakeEventId = createValidUUID();
    const batchData = createInvalidBatch();

    const response = await request(app)
      .post(`/api/v1/events/${fakeEventId}/batches`)
      .send(batchData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Evento não encontrado para criar lote');
  });

  it('deve retornar 400 ao criar lote com dados inválidos', async () => {
    const invalidBatch = createInvalidBatch();

    const response = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(invalidBatch);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('deve retornar 400 ao criar lote sem nome', async () => {
    const batchWithoutName = {
      description: 'Lote sem nome',
      price: 100,
      quantity: 50,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 86400000).toISOString(), // +1 dia
    };

    const response = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchWithoutName);

    expect(response.status).toBe(400);
  });

  it('deve retornar 400 ao criar lote com preço negativo', async () => {
    const batchWithNegativePrice = {
      name: 'Lote com preço negativo',
      price: -50,
      quantity: 100,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 86400000).toISOString(),
    };

    const response = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchWithNegativePrice);

    expect(response.status).toBe(400);
  });

  it('deve retornar 400 ao criar lote com quantidade negativa', async () => {
    const batchWithNegativeQuantity = {
      name: 'Lote com quantidade negativa',
      price: 100,
      quantity: -10,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 86400000).toISOString(),
    };

    const response = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchWithNegativeQuantity);

    expect(response.status).toBe(400);
  });

  it('deve retornar 400 com UUID de evento inválido', async () => {
    const invalidEventId = createInvalidUUID();
    const batchData = {
      name: 'Lote teste',
      price: 100,
      quantity: 50,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 86400000).toISOString(),
    };

    const response = await request(app)
      .post(`/api/v1/events/${invalidEventId}/batches`)
      .send(batchData);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('inválido');
  });

  it('deve retornar 404 ao buscar lote inexistente', async () => {
    const fakeBatchId = createValidUUID();
    const response = await request(app)
      .get(`/api/v1/events/${eventId}/batches/${fakeBatchId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Lote não encontrado');
  });

  it('deve retornar 400 com UUID de lote inválido', async () => {
    const invalidBatchId = createInvalidUUID();
    const response = await request(app)
      .get(`/api/v1/events/${eventId}/batches/${invalidBatchId}`);

    expect(response.status).toBe(400);
  });
});
