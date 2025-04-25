import request from 'supertest';
import app from '../../src/app';
import pool from '../../src/config/database';

describe('Event Endpoints - Success', () => {
  it('deve criar um novo evento', async () => {
    const res = await request(app).post('/api/v1/events').send({
      name: 'Evento Teste Sucesso',
      description: 'Evento para testar sucesso',
      date: '2025-12-31T23:00:00.000Z',
      location: 'São Paulo',
      status: 'DRAFT',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os eventos', async () => {
    const res = await request(app).get('/api/v1/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await pool.end();
  });
});
