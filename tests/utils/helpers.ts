import { Response } from 'supertest';

// Helper para testar respostas paginadas
export const expectPaginatedResponse = (response: Response, expectedStatus: number = 200) => {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toHaveProperty('data');
  expect(response.body).toHaveProperty('pagination');
  expect(Array.isArray(response.body.data)).toBe(true);
  expect(response.body.pagination).toHaveProperty('page');
  expect(response.body.pagination).toHaveProperty('limit');
  expect(response.body.pagination).toHaveProperty('total');
  expect(response.body.pagination).toHaveProperty('pages');
};

// Helper para testar estrutura de erro
export const expectErrorResponse = (response: Response, expectedStatus: number, expectedMessage?: string) => {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toHaveProperty('message');
  if (expectedMessage) {
    expect(response.body.message).toContain(expectedMessage);
  }
};

// Helper para aguardar um tempo (útil para rate limiting)
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper para debug de respostas em testes
export const debugResponse = (response: Response, testName: string) => {
  if (process.env.DEBUG_TESTS === 'true') {
    console.log(`\n=== ${testName} ===`);
    console.log('Status:', response.status);
    console.log('Body:', JSON.stringify(response.body, null, 2));
    console.log('==================\n');
  }
};
