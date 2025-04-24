import { apiRequest } from '../utils/apiHelpers';

describe('EVENT ID ERRORS', () => {
  it('should return 404 for non-existing event ID', async () => {
    const res = await apiRequest.get('/api/v1/events/999999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid event ID format', async () => {
    const res = await apiRequest.get('/api/v1/events/invalid-id');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
