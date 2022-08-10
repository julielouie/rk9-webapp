import { z } from 'zod';

export const postAndPutGroup = z.object({
  name: z.string().min(2).max(255),
});

export type PostAndPutGroup = z.infer<typeof postAndPutGroup>;
