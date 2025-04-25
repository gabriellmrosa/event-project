import request from 'supertest';
import { app, server } from '../../src/server';
import pool from '../../src/config/database';

describe('Batch Endpoints - Success', () => {
  let createdEventId: string;

  beforeAll(async () => {
    const res = await request(app).post('/api/v1/events').send({
      name: 'Evento para Batch Test',
      description: 'Criado para testes de lotes',
      date: '2025-12-31T23:00:00.000Z',
      location: 'São Paulo',
      status: 'DRAFT',
    });

    createdEventId = res.body.id;
  });

  it('deve criar um novo lote vinculado ao evento', async () => {
    const res = await request(app)
      .post(`/api/v1/events/${createdEventId}/batches`)
      .send({
        name: 'Lote Teste',
        description: 'Descrição do lote',
        price: 100.0,
        quantity: 50,
        start_date: '2025-11-01T00:00:00.000Z',
        end_date: '2025-12-01T00:00:00.000Z',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar lotes do evento', async () => {
    const res = await request(app).get(
      `/api/v1/events/${createdEventId}/batches`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    server.close();
    await pool.end();
  });
});
