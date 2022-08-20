import { z } from 'zod';

export const postAndPutUser = z.object({
  name: z.string(),
  username: z.string().min(2).max(255),
  password: z.string().min(2).max(255),
  groups: z.array(
    z.object({
      id: z.string().min(2).max(255),
      name: z.string().min(2).max(255),
    }),
  ),
  role: z.string().min(2).max(255),
  dogName: z.string(),
  dogName2: z.string().optional(),
  dogName3: z.string().optional(),
  dogName4: z.string().optional(),
  dogName5: z.string().optional(),
});

export type PostAndPutUser = z.infer<typeof postAndPutUser>;
