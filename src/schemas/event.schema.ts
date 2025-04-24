import { z } from 'zod';

export const createEventSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  start_date: z.string().datetime({ message: 'Start date must be a valid ISO 8601 datetime' }),
  end_date: z.string().datetime({ message: 'End date must be a valid ISO 8601 datetime' }),
  location: z.string().optional(),
  organizer: z.string().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'CANCELLED']),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
