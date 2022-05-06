import { map } from 'p-iteration';
import * as db from '../db/user.db';
import { UserMap } from '../mappers/UserMap';
import * as userSchema from '../schemas/user.schema';
import { ReturnUser } from '../models/user';

export const getUserList = async (): Promise<ReturnUser[]> => {
  const userList = await db.getUserList();
  return map(userList, (user) => UserMap.toSimpleDTO(user));
};

export const getUser = async (id: string): Promise<ReturnUser> => {
  const userInfo = await db.getUser(id);
  return UserMap.toDTO(userInfo);
};

export const createUser = async (payload: userSchema.PostAndPutUser): Promise<ReturnUser> => {
  const createdUser = await db.createUser(payload);
  return UserMap.toDTO(createdUser);
};

export const updateUser = async (
  id: string,
  payload: userSchema.PostAndPutUser,
): Promise<ReturnUser> => {
  const updatedUser = await db.updateUser(id, payload);
  return UserMap.toDTO(updatedUser);
};

export const deleteUser = async (id: string): Promise<ReturnUser> => {
  const deletedUser = await db.deleteUser(id);
  return UserMap.toDTO(deletedUser);
};
