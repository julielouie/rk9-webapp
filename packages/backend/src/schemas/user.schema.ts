import { z } from 'zod';

export const postAndPutUser = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().optional(),
  password: z.string().min(2).max(255),
  groups: z.array(
    z.object({
      id: z.string().min(2).max(255),
      name: z.string().min(2).max(255),
    }),
  ),
  role: z.string().min(2).max(255),
  dogName: z.string().min(2).max(255),
  dogName2: z.string().min(2).max(255).optional(),
  dogName3: z.string().min(2).max(255).optional(),
  dogName4: z.string().min(2).max(255).optional(),
  dogName5: z.string().min(2).max(255).optional(),
});

export type PostAndPutUser = z.infer<typeof postAndPutUser>;
