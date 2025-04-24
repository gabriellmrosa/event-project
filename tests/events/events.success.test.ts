import { apiRequest } from '../utils/apiHelpers';
import { getFutureDates, getValidEventData, getValidLoteData } from '../utils/testData';

const { now, nextDay, nextMonth } = getFutureDates();
const event = getValidEventData(now, nextDay); // ✅ Garante que o status está incluso corretamente

let eventId: number;

describe('LOTE CRUD', () => {
  beforeAll(async () => {
    const res = await apiRequest.post('/api/v1/events', event);
    eventId = res.body.data?.id; // Adiciona segurança contra erro de undefined
  });

  it('should create a new lote for the event', async () => {
    const lote = getValidLoteData(now, nextMonth, eventId);
    const res = await apiRequest.post(`/api/v1/events/${eventId}/lotes`, lote);
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Lote 1');
  });

  it('should list all lotes for the event', async () => {
    const res = await apiRequest.get(`/api/v1/events/${eventId}/lotes`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should delete the lote', async () => {
    const lote = getValidLoteData(now, nextMonth, eventId);
    const createRes = await apiRequest.post(`/api/v1/events/${eventId}/lotes`, lote);
    const loteId = createRes.body.data.id;

    const deleteRes = await apiRequest.delete(`/api/v1/events/${eventId}/lotes/${loteId}`);
    expect(deleteRes.status).toBe(204);
  });
});
