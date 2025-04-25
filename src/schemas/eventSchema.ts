import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  date: z.string().datetime(),
  location: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});
