import request from 'supertest';
import app from '../../src/app'; // Importa apenas o app!

describe('Event Endpoints - Errors', () => {
  it('deve falhar ao criar evento sem dados obrigatórios', async () => {
    const res = await request(app).post('/api/v1/events').send({});
    expect(res.statusCode).toBe(400);
  });

  it('deve retornar erro ao buscar evento com ID inválido', async () => {
    const res = await request(app).get('/api/v1/events/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
