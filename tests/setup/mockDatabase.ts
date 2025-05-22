// Mock do pool de conexão para testes
const mockPool = {
  query: jest.fn(),
  end: jest.fn(),
  on: jest.fn(),
};

// Mock das funções de query
mockPool.query.mockImplementation((query: string, params?: any[]) => {
  // Mock para getAllEventsService
  if (query.includes('SELECT * FROM events') && query.includes('LIMIT')) {
    return Promise.resolve({
      rows: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Mock Event',
          description: 'Mock Description',
          date: '2024-12-31T23:59:59.000Z',
          location: 'Mock Location',
          status: 'DRAFT',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        }
      ]
    });
  }
  
  // Mock para getTotalEventsCountService
  if (query.includes('SELECT COUNT(*)')) {
    return Promise.resolve({ rows: [{ count: '1' }] });
  }
  
  // Mock para createEventService
  if (query.includes('INSERT INTO events')) {
    const mockEvent = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: params?.[0] || 'Mock Event',
      description: params?.[1] || 'Mock Description',
      date: params?.[2] || '2024-12-31T23:59:59.000Z',
      location: params?.[3] || 'Mock Location',
      status: params?.[4] || 'DRAFT',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z'
    };
    return Promise.resolve({ rows: [mockEvent] });
  }
  
  // Mock para getSingleEventService
  if (query.includes('SELECT * FROM events WHERE id')) {
    const id = params?.[0];
    if (id === '123e4567-e89b-12d3-a456-426614174000') {
      return Promise.resolve({
        rows: [{
          id,
          name: 'Mock Event',
          description: 'Mock Description',
          date: '2024-12-31T23:59:59.000Z',
          location: 'Mock Location',
          status: 'DRAFT',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        }]
      });
    }
    return Promise.resolve({ rows: [] });
  }
  
  // Mock para updateEventService
  if (query.includes('UPDATE events')) {
    return Promise.resolve({
      rows: [{
        id: params?.[params.length - 1] || '123e4567-e89b-12d3-a456-426614174000',
        name: 'Updated Event',
        description: 'Updated Description',
        date: '2024-12-31T23:59:59.000Z',
        location: 'Updated Location',
        status: 'PUBLISHED',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T12:00:00.000Z'
      }]
    });
  }
  
  // Mock para deleteEventService
  if (query.includes('DELETE FROM events')) {
    return Promise.resolve({
      rows: [{
        id: params?.[0] || '123e4567-e89b-12d3-a456-426614174000',
        name: 'Deleted Event',
        description: 'Deleted Description',
        date: '2024-12-31T23:59:59.000Z',
        location: 'Deleted Location',
        status: 'DRAFT',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
      }]
    });
  }
  
  // Mock padrão para outras queries
  return Promise.resolve({ rows: [] });
});

// Mock do módulo database
jest.mock('../../src/config/database', () => mockPool);

export { mockPool };
