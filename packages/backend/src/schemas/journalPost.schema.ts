import { z } from 'zod';

export const postAndPutJournalPost = z.object({
  title: z.string().min(2).max(255),
  date: z.date(),
  notes: z.string().min(2).max(255).optional(),
  workOn: z.string().min(2).max(255).optional(),
  misc: z.string().min(2).max(255).optional(),
});

export type PostAndPutJournalPost = z.infer<typeof postAndPutJournalPost>;
