import { apiRequest } from '../utils/apiHelpers';
import { getFutureDates, getValidLoteData, getValidEventData } from '../utils/testData';

const { now, nextMonth } = getFutureDates();
let eventId: number;

describe('LOTE CREATE ERRORS', () => {
  beforeAll(async () => {
    const event = getValidEventData(now, nextMonth);
    const eventRes = await apiRequest.post('/api/v1/events', event);
    eventId = eventRes.body.data.id;
  });

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('should return 400 for missing required fields', async () => {
    const invalidLote = {
      start_sale_date: now,
      end_sale_date: nextMonth,
    };

    const res = await apiRequest.post(`/api/v1/events/999999/lotes`, invalidLote);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid date range', async () => {
    const invalidLote = getValidLoteData(nextMonth, now, eventId); // datas invertidas

    const res = await apiRequest.post(`/api/v1/events/${eventId}/lotes`, invalidLote);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 for non-existing event ID', async () => {
    const validLote = getValidLoteData(now, nextMonth);

    const res = await apiRequest.post(`/api/v1/events/999999/lotes`, validLote);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
