import request from 'supertest';
import app from '../../src/app';
import { validBatch } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Batch Endpoints - Errors', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('deve retornar 404 para evento inexistente', async () => {
    // Use um UUID válido mas inexistente
    const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';

    const response = await request(app)
      .post(`/api/v1/events/${fakeUUID}/batches`)
      .send(validBatch);

    expect(response.status).toBe(404);
  });

  it('deve retornar 400 ao criar lote com dados inválidos', async () => {
    // Primeiro, crie um evento válido para ter um UUID existente
    const eventResponse = await request(app).post('/api/v1/events').send({
      name: 'Evento Válido para Teste',
      description: 'Descrição válida',
      date: new Date().toISOString(),
    });

    const validUUID = eventResponse.body.id;

    // Agora envie dados inválidos (objeto vazio)
    const response = await request(app)
      .post(`/api/v1/events/${validUUID}/batches`)
      .send({});

    expect(response.status).toBe(400);
  });
});
