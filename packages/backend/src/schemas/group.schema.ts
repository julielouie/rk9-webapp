import { z } from 'zod';

export const postAndPutGroup = z.object({
  name: z.string().min(2).max(255),
  members: z.array(
    z.object({
      name: z.string().min(2).max(255),
      email: z.string().email(),
      groups: z.array(
        z.object({
          id: z.string().min(2).max(255),
          name: z.string().min(2).max(255),
        }),
      ),
      role: z.string().min(2).max(255),
      dogName: z.string().min(2).max(255),
      dogName2: z.string().min(2).max(255),
      dogName3: z.string().min(2).max(255),
      dogName4: z.string().min(2).max(255),
      dogName5: z.string().min(2).max(255),
    }),
  ),
});

export type PostAndPutGroup = z.infer<typeof postAndPutGroup>;
