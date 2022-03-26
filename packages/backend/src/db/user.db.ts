import UserModel, { IUser, IUserDocument } from '../models/user';
import { UserNotFoundException } from '../exceptions/notFoundExceptions';
import * as userSchema from '../schemas/user.schema';

export const getUserList = async (programId?: string): Promise<IUser[]> => {
  const query: any = {};

  if (programId) query.programs = { $elemMatch: { id: programId } };

  const userList: IUser[] = await UserModel.find(query).select('-__v').exec();

  return userList;
};

export const getUser = async (username: string): Promise<IUser> => {
  const user: IUserDocument | null = await UserModel.findOne({ username }).select('-__v').exec();
  if (!user) throw new UserNotFoundException(username);

  const result: IUser = user.toObject();
  delete result._id;

  return result;
};

export const createUser = async (payload: userSchema.PostUser): Promise<IUser> => {
  const user = new UserModel(payload);
  const savedUser = await user.save();

  const result: IUser = savedUser.toObject();
  delete result._id;
  delete result.__v;

  return result;
};

export const updateUser = async (username: string, payload: any): Promise<IUser> => {
  const user = await UserModel.findOneAndUpdate({ username }, payload, { new: true });

  if (!user) throw new UserNotFoundException(username);

  const result: IUser = user.toObject();
  delete result._id;
  delete result.__v;

  return result;
};
