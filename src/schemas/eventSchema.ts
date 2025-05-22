import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  date: z.string().datetime('Data deve estar no formato ISO 8601'),
  location: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED'], {
    errorMap: () => ({ message: 'Status deve ser DRAFT ou PUBLISHED' }),
  }),
});

export const updateEventSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  description: z.string().optional(),
  date: z.string().datetime('Data deve estar no formato ISO 8601').optional(),
  location: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED'], {
    errorMap: () => ({ message: 'Status deve ser DRAFT ou PUBLISHED' }),
  }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'Pelo menos um campo deve ser fornecido para atualização',
});
