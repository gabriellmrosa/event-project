import { apiRequest } from '../utils/apiHelpers';
import { getFutureDates } from '../utils/testData';

const { now, nextMonth } = getFutureDates();

describe('EVENT CREATE ERRORS', () => {
  it('should return 400 for missing name field', async () => {
    const invalidEvent = {
      startDate: now,
      endDate: nextMonth,
      status: 'DRAFT',
    };

    const res = await apiRequest.post('/api/v1/events', invalidEvent);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for invalid date range', async () => {
    const invalidEvent = {
      name: 'Invalid Date Event',
      startDate: nextMonth,
      endDate: now,
      status: 'DRAFt',
    };

    const res = await apiRequest.post('/api/v1/events', invalidEvent);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
