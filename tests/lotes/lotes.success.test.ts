import { apiRequest } from '../utils/apiHelpers';
import { getFutureDates, getValidEventData, getValidLoteData } from '../utils/testData';

const { now, nextMonth } = getFutureDates();
const event = getValidEventData(now, nextMonth);

describe('LOTE CRUD', () => {
  let eventId: number;
  let loteId: number;

  beforeAll(async () => {
    const res = await apiRequest.post('/api/v1/events', event);
    eventId = res.body.data.id;
  });

  it('should create a new lote for the event', async () => {
    const lote = getValidLoteData(now, nextMonth, eventId);
    const res = await apiRequest.post(`/api/v1/events/${eventId}/lotes`, lote);
    loteId = res.body.data.id;

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe(lote.name);
  });

  it('should list all lotes for the event', async () => {
    const res = await apiRequest.get(`/api/v1/events/${eventId}/lotes`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should delete the lote', async () => {
    const res = await apiRequest.delete(`/api/v1/events/${eventId}/lotes/${loteId}`);
    expect(res.status).toBe(204);
  });
});
