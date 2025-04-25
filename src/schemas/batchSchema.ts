import { z } from 'zod';

export const batchSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().positive('O preço deve ser maior que zero'),
  quantity: z.number().int().positive('A quantidade deve ser maior que zero'),
  start_date: z.string().datetime('Data de início inválida'),
  end_date: z.string().datetime('Data de fim inválida'),
});
