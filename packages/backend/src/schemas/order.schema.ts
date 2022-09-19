import { z } from 'zod';

export const postAndPutOrder = z.object({
  id: z.string().min(2).max(255),
  client: z.object({
    id: z.string(),
    name: z.string(),
  }),
  items: z.array(
    z.object({
      name: z.string(),
      size: z.string(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  fulfilled: z.boolean(),
  total: z.number(),
});

export type PostAndPutOrder = z.infer<typeof postAndPutOrder>;
