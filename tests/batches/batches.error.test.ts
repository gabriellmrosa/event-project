import request from 'supertest';
import app from '../../src/app'; // Importa apenas o app!

describe('Batch Endpoints - Errors', () => {
  it('deve retornar erro ao criar lote com dados inválidos', async () => {
    const res = await request(app)
      .post('/api/v1/events/invalid-id/batches')
      .send({
        name: 'Lote com erro',
        price: -100,
        quantity: 0,
      });

    expect(res.statusCode).toBe(400);
  });

  it('deve retornar erro ao buscar lotes de um evento com ID inválido', async () => {
    const res = await request(app).get('/api/v1/events/invalid-id/batches');
    expect(res.statusCode).toBe(400);
  });
});
