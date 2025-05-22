import request from 'supertest';
import app from '../../src/app';
import { createValidEvent, createValidBatch } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Batch Endpoints - Success', () => {
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

  it('deve criar um novo lote vinculado ao evento', async () => {
    const batchData = createValidBatch();
    const response = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.event_id).toBe(eventId);
    expect(response.body.name).toBe(batchData.name);
    expect(response.body.price).toBe(batchData.price);
    expect(response.body.quantity).toBe(batchData.quantity);
  });

  it('deve listar lotes do evento com paginação', async () => {
    const response = await request(app).get(
      `/api/v1/events/${eventId}/batches`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('deve listar lotes com filtros', async () => {
    const response = await request(app)
      .get(`/api/v1/events/${eventId}/batches`)
      .query({ page: 1, limit: 5, priceMin: 50, priceMax: 200 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(5);
  });

  it('deve buscar um lote específico', async () => {
    // Primeiro criar um lote
    const batchData = createValidBatch();
    const createResponse = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchData);
    const batchId = createResponse.body.id;

    // Depois buscar o lote
    const response = await request(app)
      .get(`/api/v1/events/${eventId}/batches/${batchId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(batchId);
    expect(response.body.event_id).toBe(eventId);
    expect(response.body.name).toBe(batchData.name);
  });

  it('deve atualizar um lote', async () => {
    // Primeiro criar um lote
    const batchData = createValidBatch();
    const createResponse = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchData);
    const batchId = createResponse.body.id;

    // Dados para atualização
    const updateData = createValidBatch();

    // Atualizar o lote
    const response = await request(app)
      .put(`/api/v1/events/${eventId}/batches/${batchId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(batchId);
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.price).toBe(updateData.price);
  });

  it('deve deletar um lote', async () => {
    // Primeiro criar um lote
    const batchData = createValidBatch();
    const createResponse = await request(app)
      .post(`/api/v1/events/${eventId}/batches`)
      .send(batchData);
    const batchId = createResponse.body.id;

    // Deletar o lote
    const response = await request(app)
      .delete(`/api/v1/events/${eventId}/batches/${batchId}`);

    expect(response.status).toBe(204);
  });
});
