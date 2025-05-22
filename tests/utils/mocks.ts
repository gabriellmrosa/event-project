import { faker } from '@faker-js/faker';

// Factory functions para criar dados dinâmicos
export const createValidEvent = () => ({
  name: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  date: faker.date.future().toISOString(),
  location: faker.location.city(),
  status: faker.helpers.arrayElement(['DRAFT', 'PUBLISHED']) as 'DRAFT' | 'PUBLISHED',
});

export const createValidBatch = () => {
  const startDate = faker.date.future();
  const endDate = faker.date.soon({ days: 30, refDate: startDate }); // 30 dias após start_date
  
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    quantity: faker.number.int({ min: 10, max: 1000 }),
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  };
};

export const createInvalidEvent = () => ({
  name: '', // Nome vazio - inválido
  description: faker.lorem.paragraph(),
  date: 'invalid-date', // Data inválida
  location: faker.location.city(),
  status: 'INVALID_STATUS', // Status inválido
});

export const createInvalidBatch = () => ({
  name: '', // Nome vazio - inválido
  description: faker.lorem.paragraph(),
  price: -10, // Preço negativo - inválido
  quantity: -5, // Quantidade negativa - inválida
  start_date: 'invalid-date', // Data inválida
  end_date: faker.date.past().toISOString(), // Data fim no passado
});

// Helpers para UUIDs
export const createValidUUID = () => faker.string.uuid();
export const createInvalidUUID = () => 'invalid-uuid-format';

// Mocks estáticos para compatibilidade com testes existentes
export const validEvent = createValidEvent();
export const validBatch = createValidBatch();
