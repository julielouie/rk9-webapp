import UserModel, { IUser, IUserDocument } from '../models/user';
import { UserNotFoundException } from '../exceptions/notFoundExceptions';
import * as userSchema from '../schemas/user.schema';

export const getUserList = async (): Promise<IUser[]> => {
  const query: any = {};
  const userList: IUser[] = await UserModel.find(query).select('-__v').exec();
  return userList;
};

export const getUser = async (id: string): Promise<IUser> => {
  const user: IUserDocument | null = await UserModel.findOne({ id }).select('-__v').exec();
  if (!user) throw new UserNotFoundException(id);

  const result: IUser = user.toObject();
  delete result._id;
  return result;
};

export const createUser = async (payload: userSchema.PostAndPutUser): Promise<IUser> => {
  const user = new UserModel(payload);
  const savedUser = await user.save();

  const result: IUser = savedUser.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateUser = async (
  id: string,
  payload: userSchema.PostAndPutUser,
): Promise<IUser> => {
  const user = await UserModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!user) throw new UserNotFoundException(id);

  const result: IUser = user.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteUser = async (id: string): Promise<IUser> => {
  const deletedUser = await UserModel.findOne({ id }).exec();
  if (!deletedUser) throw new UserNotFoundException(id);

  return deletedUser.deleteOne();
};
