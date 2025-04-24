import { z } from 'zod';

export const createLoteSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  attractions: z.array(z.string()).optional(),
  more_info: z.string().optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price must be a positive number'),
  batch_number: z.number().optional(),
  start_sale_date: z.string().datetime({ message: 'Start sale date must be a valid ISO 8601 datetime' }),
  end_sale_date: z.string().datetime({ message: 'End sale date must be a valid ISO 8601 datetime' }),
  status: z.enum(['ACTIVE', 'PENDING', 'SOLD_OUT']),
});


export const updateLoteSchema = createLoteSchema.partial();

export type CreateLoteInput = z.infer<typeof createLoteSchema>;
export type UpdateLoteInput = z.infer<typeof updateLoteSchema>;
