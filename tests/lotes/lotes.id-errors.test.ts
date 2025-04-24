import { apiRequest } from '../utils/apiHelpers';

describe('LOTE ID ERRORS', () => {
  const fakeEventId = 999999;
  const fakeLoteId = 999999;

  it('should return 404 for non-existing lote ID', async () => {
    const res = await apiRequest.get(`/api/v1/events/${fakeEventId}/lotes/${fakeLoteId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid lote ID format', async () => {
    const res = await apiRequest.get(`/api/v1/events/${fakeEventId}/lotes/invalid-id`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid event ID format', async () => {
    const res = await apiRequest.get(`/api/v1/events/invalid-event-id/lotes/${fakeLoteId}`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
