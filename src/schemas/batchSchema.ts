import { z } from 'zod';

export const batchSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().positive('O preço deve ser maior que zero'),
  quantity: z.number().int().positive('A quantidade deve ser maior que zero'),
  start_date: z.string().datetime('Data de início deve estar no formato ISO 8601'),
  end_date: z.string().datetime('Data de fim deve estar no formato ISO 8601'),
}).refine((data) => new Date(data.start_date) < new Date(data.end_date), {
  message: 'Data de início deve ser anterior à data de fim',
  path: ['start_date'],
});

export const updateBatchSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  description: z.string().optional(),
  price: z.number().positive('O preço deve ser maior que zero').optional(),
  quantity: z.number().int().positive('A quantidade deve ser maior que zero').optional(),
  start_date: z.string().datetime('Data de início deve estar no formato ISO 8601').optional(),
  end_date: z.string().datetime('Data de fim deve estar no formato ISO 8601').optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'Pelo menos um campo deve ser fornecido para atualização',
}).refine((data) => {
  if (data.start_date && data.end_date) {
    return new Date(data.start_date) < new Date(data.end_date);
  }
  return true;
}, {
  message: 'Data de início deve ser anterior à data de fim',
  path: ['start_date'],
});
