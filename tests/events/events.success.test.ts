import request from 'supertest';
import app from '../../src/app';
import { validEvent } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Event Endpoints - Success', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('deve criar um novo evento', async () => {
    const response = await request(app).post('/api/v1/events').send(validEvent);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('deve listar todos os eventos', async () => {
    const response = await request(app).get('/api/v1/events');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
