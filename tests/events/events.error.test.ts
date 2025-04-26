import request from 'supertest';
import app from '../../src/app';
import pool from '../../src/config/database';

describe('Event Endpoints - Errors', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('deve retornar 400 ao criar evento com dados inválidos', async () => {
    const response = await request(app).post('/api/v1/events').send({});

    expect(response.status).toBe(400);
  });

  it('deve retornar 404 ao buscar evento inexistente', async () => {
    const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';
    const response = await request(app).get(`/api/v1/events/${fakeUUID}`);

    expect(response.status).toBe(404);
  });
});
