import { map } from 'p-iteration';
import * as db from '../db/user.db';
import { UserMap } from '../mappers/UserMap';
import * as userSchema from '../schemas/user.schema';
import { IUser } from '../models/user';

export const getUserList = async (authUser: IUser, programId?: string): Promise<IUser[]> => {
  const userList = await db.getUserList(programId);
  return map(userList, (user) => UserMap.toSimpleDTO(user));
};

export const getUser = async (username: string): Promise<IUser> => {
  const userInfo = await db.getUser(username.toLowerCase());

  return UserMap.toDTO(userInfo);
};

export const createUser = async (payload: userSchema.PostUser): Promise<IUser> => {
  payload.username = payload.username.toLowerCase();
  const createdUser = await db.createUser(payload);
  return UserMap.toDTO(createdUser);
};

export const updateUser = async (username: string, payload: IUser): Promise<IUser> => {
  const updatedUser = await db.updateUser(username.toLowerCase(), payload);
  return UserMap.toDTO(updatedUser);
};
