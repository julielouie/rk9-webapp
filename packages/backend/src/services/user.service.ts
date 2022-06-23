import { map } from 'p-iteration';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as db from '../db/user.db';
import { UserMap } from '../mappers/UserMap';
import * as userSchema from '../schemas/user.schema';
import { IUser, ReturnUser } from '../models/user';
import { UserEmailNotFoundException } from '../exceptions/notFoundExceptions';
import { InvalidCredentialsException } from '../exceptions/unauthorizedExceptions';
import { UserEmailAlreadyExistsException } from '../exceptions/badRequestExceptions';

export const signUp = async (
  name: string,
  email: string,
  password: string,
  dogName: string,
): Promise<ReturnUser> => {
  const user = await db.getUserByEmail(email);
  if (user) throw new UserEmailAlreadyExistsException(email);

  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    name,
    email,
    password: encryptedPassword,
    groups: [],
    role: 'guest',
    dogName,
  };
  const newUser = await db.createUser(newUserData);
  return newUser;
};

export const logIn = async (
  email: string,
  password: string,
): Promise<{ token: string; user: ReturnUser }> => {
  let user: IUser = {} as IUser;

  try {
    user = await db.getUserByEmail(email);
  } catch (err) {
    throw new UserEmailNotFoundException(email);
  }

  let token;
  if (user && (await bcrypt.compare(password, user.password))) {
    token = jwt.sign({ userId: user.id, email }, process.env.TOKEN_KEY || '', { expiresIn: '30d' });
  } else {
    throw new InvalidCredentialsException(user.id);
  }

  const newUser: any = { ...user };
  delete newUser.password;
  return { token, user };
};

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
