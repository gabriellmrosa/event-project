import request from 'supertest';
import app from '../../src/app';
import { validBatch, validEvent } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Batch Endpoints - Success', () => {
  let createdEventId: string;

  beforeAll(async () => {
    const eventResponse = await request(app)
      .post('/api/v1/events')
      .send(validEvent);
    createdEventId = eventResponse.body.id;
  });

  afterAll(async () => {
    await pool.end();
  });

  it('deve criar um novo lote vinculado ao evento', async () => {
    const response = await request(app)
      .post(`/api/v1/events/${createdEventId}/batches`)
      .send(validBatch);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('deve listar lotes do evento', async () => {
    const response = await request(app).get(
      `/api/v1/events/${createdEventId}/batches`
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
