import { map } from 'p-iteration';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as db from '../db/user.db';
import { getGroup } from './group.service';
import { UserMap } from '../mappers/UserMap';
import * as userSchema from '../schemas/user.schema';
import { ReturnUser } from '../models/user';
import { UserUsernameNotFoundException } from '../exceptions/notFoundExceptions';
import {
  InvalidCredentialsException,
  UnauthorizedPermissionException,
} from '../exceptions/unauthorizedExceptions';
import { UserUsernameAlreadyExistsException } from '../exceptions/badRequestExceptions';
import { IGroup } from '../models/group';

export const signUp = async (
  name: string,
  username: string,
  password: string,
  dogName: string,
  groups?: IGroup[],
  role?: string,
): Promise<ReturnUser> => {
  const user = await db.getUserByUsername(username);
  if (user) throw new UserUsernameAlreadyExistsException(username);

  const discussionGroup = await getGroup('Discussion');

  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    name,
    username,
    password: encryptedPassword,
    groups: groups || [discussionGroup],
    role: role || 'guest',
    dogName,
  };
  const newUser = await db.createUser(newUserData);
  return newUser;
};

export const logIn = async (
  username: string,
  password: string,
): Promise<{ token: string; user: ReturnUser }> => {
  const user = await db.getUserByUsername(username);
  if (!user) throw new UserUsernameNotFoundException(username);
  if (user.role === 'guest') throw new UnauthorizedPermissionException(user.id);

  let token;
  if (user && (await bcrypt.compare(password, user.password))) {
    token = jwt.sign({ userId: user.id, username }, process.env.TOKEN_KEY || '', {
      expiresIn: '30d',
    });
  } else {
    throw new InvalidCredentialsException(user.id);
  }

  const newUser = UserMap.toDTO(user);
  return { token, user: newUser };
};

export const getUserList = async (
  groupId?: string,
  isOneOnOne?: boolean,
): Promise<ReturnUser[]> => {
  const userList = await db.getUserList(groupId, isOneOnOne);
  return map(userList, (user) => UserMap.toSimpleDTO(user));
};

export const getUser = async (id: string): Promise<ReturnUser> => {
  const userInfo = await db.getUser(id);
  return UserMap.toDTO(userInfo);
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
