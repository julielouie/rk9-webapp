import { z } from 'zod';

export const postAndPutJournalPost = z.object({
  title: z.string().min(2).max(255),
  date: z.date(),
  oneOnOneUserId: z.string().min(2).max(255),
  notes: z.string(),
  workOn: z.string().optional(),
  misc: z.string().optional(),
});

export type PostAndPutJournalPost = z.infer<typeof postAndPutJournalPost>;
