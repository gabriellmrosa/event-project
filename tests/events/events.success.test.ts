import request from 'supertest';
import app from '../../src/app';
import { createValidEvent } from '../utils/mocks';
import { expectPaginatedResponse, debugResponse } from '../utils/helpers';
import pool from '../../src/config/database';

describe('Event Endpoints - Success', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('deve criar um novo evento', async () => {
    const eventData = createValidEvent();
    const response = await request(app).post('/api/v1/events').send(eventData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(eventData.name);
    expect(response.body.description).toBe(eventData.description);
    expect(response.body.status).toBe(eventData.status);
  });

  it('deve listar todos os eventos com paginação', async () => {
    const response = await request(app).get('/api/v1/events');
    debugResponse(response, 'Lista eventos com paginação');
    expectPaginatedResponse(response);
  });

  it('deve listar eventos com filtros', async () => {
    const response = await request(app)
      .get('/api/v1/events')
      .query({ status: 'DRAFT', page: 1, limit: 5 });

    debugResponse(response, 'Lista eventos com filtros');
    expectPaginatedResponse(response);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(5);
  });

  it('deve buscar um evento específico', async () => {
    // Primeiro criar um evento
    const eventData = createValidEvent();
    const createResponse = await request(app).post('/api/v1/events').send(eventData);
    const eventId = createResponse.body.id;

    // Depois buscar o evento
    const response = await request(app).get(`/api/v1/events/${eventId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(eventId);
    expect(response.body.name).toBe(eventData.name);
  });

  it('deve atualizar um evento', async () => {
    // Primeiro criar um evento
    const eventData = createValidEvent();
    const createResponse = await request(app).post('/api/v1/events').send(eventData);
    const eventId = createResponse.body.id;

    // Dados para atualização
    const updateData = createValidEvent();

    // Atualizar o evento
    const response = await request(app)
      .put(`/api/v1/events/${eventId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(eventId);
    expect(response.body.name).toBe(updateData.name);
  });

  it('deve deletar um evento', async () => {
    // Primeiro criar um evento
    const eventData = createValidEvent();
    const createResponse = await request(app).post('/api/v1/events').send(eventData);
    const eventId = createResponse.body.id;

    // Deletar o evento
    const response = await request(app).delete(`/api/v1/events/${eventId}`);

    expect(response.status).toBe(204);
  });
});
