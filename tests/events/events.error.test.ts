import request from 'supertest';
import app from '../../src/app';
import { createInvalidEvent, createValidUUID, createInvalidUUID } from '../utils/mocks';
import pool from '../../src/config/database';

describe('Event Endpoints - Errors', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('deve retornar 400 ao criar evento com dados inválidos', async () => {
    const invalidEvent = createInvalidEvent();
    const response = await request(app).post('/api/v1/events').send(invalidEvent);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('deve retornar 400 ao criar evento sem nome', async () => {
    const eventWithoutName = {
      description: 'Evento sem nome',
      date: new Date().toISOString(),
      status: 'DRAFT',
    };

    const response = await request(app).post('/api/v1/events').send(eventWithoutName);

    expect(response.status).toBe(400);
  });

  it('deve retornar 400 ao criar evento com status inválido', async () => {
    const eventWithInvalidStatus = {
      name: 'Evento Teste',
      date: new Date().toISOString(),
      status: 'INVALID_STATUS',
    };

    const response = await request(app).post('/api/v1/events').send(eventWithInvalidStatus);

    expect(response.status).toBe(400);
  });

  it('deve retornar 404 ao buscar evento inexistente', async () => {
    const fakeUUID = createValidUUID();
    const response = await request(app).get(`/api/v1/events/${fakeUUID}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Evento não encontrado');
  });

  it('deve retornar 400 ao buscar evento com UUID inválido', async () => {
    const invalidUUID = createInvalidUUID();
    const response = await request(app).get(`/api/v1/events/${invalidUUID}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('inválido');
  });

  it('deve retornar 404 ao atualizar evento inexistente', async () => {
    const fakeUUID = createValidUUID();
    const updateData = { name: 'Novo Nome' };
    
    const response = await request(app)
      .put(`/api/v1/events/${fakeUUID}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Evento não encontrado');
  });

  it('deve retornar 400 ao atualizar evento com UUID inválido', async () => {
    const invalidUUID = createInvalidUUID();
    const updateData = { name: 'Novo Nome' };
    
    const response = await request(app)
      .put(`/api/v1/events/${invalidUUID}`)
      .send(updateData);

    expect(response.status).toBe(400);
  });

  it('deve retornar 404 ao deletar evento inexistente', async () => {
    const fakeUUID = createValidUUID();
    const response = await request(app).delete(`/api/v1/events/${fakeUUID}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Evento não encontrado');
  });
});
