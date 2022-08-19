import bcrypt from 'bcryptjs';
import UserModel, { IUser, IUserDocument } from '../models/user';
import { UserNotFoundException } from '../exceptions/notFoundExceptions';
import * as userSchema from '../schemas/user.schema';

export const getUserList = async (groupId?: string, isOneOnOne?: boolean): Promise<IUser[]> => {
  const query: any = {};
  if (groupId) {
    query.role = { $ne: 'guest' };
    query.groups = { $elemMatch: { id: groupId } };
  }
  if (isOneOnOne) query.role = { $ne: 'guest' };

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

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user: IUserDocument | null = await UserModel.findOne({ email }).select('-__v').exec();

  if (user) {
    const result: IUser = user.toObject();
    delete result._id;
    return result;
  }
  return null;
};

export const createUser = async (payload: userSchema.PostAndPutUser): Promise<IUser> => {
  const user = new UserModel(payload);
  user.id = user._id;
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
  let encryptedPassword = '';
  if (payload.password) {
    encryptedPassword = await bcrypt.hash(payload.password, 10);
  }
  const newUserData = { ...payload, password: encryptedPassword };
  const user = await UserModel.findOneAndUpdate({ id }, newUserData, { new: true });
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
