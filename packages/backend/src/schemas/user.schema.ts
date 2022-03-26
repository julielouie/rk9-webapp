import { z } from 'zod';

export const postUser = z.object({
  username: z.string().min(2).max(255),
  name: z.string().min(2).max(255).optional(),
  email: z.string().email().optional(),
});
export const username = postUser.pick({
  username: true,
});
export const updateUserParams = z.object({
  username: z.string().min(2).max(255).optional(),
});
export const updateUserBody = z.object({});

export const getUserListQuery = updateUserBody.pick({});
export const getUserParams = postUser.pick({});

export type Username = z.infer<typeof username>;
export type PostUser = z.infer<typeof postUser>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UpdateUserBody = z.infer<typeof updateUserBody>;
export type GetUserListQuery = z.infer<typeof getUserListQuery>;
export type GetUserParams = z.infer<typeof getUserParams>;
