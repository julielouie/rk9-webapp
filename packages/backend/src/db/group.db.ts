import GroupModel, { IGroup, IGroupDocument } from '../models/group';
import { GroupNotFoundException } from '../exceptions/notFoundExceptions';
import * as groupSchema from '../schemas/group.schema';

export const getAllGroups = async (): Promise<IGroup[]> => {
  const query: any = {};
  const groupList: IGroup[] = await GroupModel.find(query).select('-__v').exec();
  return groupList;
};

export const getGroup = async (name: string): Promise<IGroup> => {
  const group: IGroupDocument | null = await GroupModel.findOne({ name }).select('-__v').exec();
  if (!group) throw new GroupNotFoundException(name);

  const result: IGroup = group.toObject();
  delete result._id;
  return result;
};

export const createGroup = async (payload: groupSchema.PostAndPutGroup): Promise<IGroup> => {
  const group = new GroupModel(payload);
  group.id = group._id;
  const savedGroup = await group.save();

  const result: IGroup = savedGroup.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateGroup = async (
  id: string,
  payload: groupSchema.PostAndPutGroup,
): Promise<IGroup> => {
  const group = await GroupModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!group) throw new GroupNotFoundException(id);

  const result: IGroup = group.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteGroup = async (id: string): Promise<IGroup> => {
  const deletedGroup = await GroupModel.findOne({ id }).exec();
  if (!deletedGroup) throw new GroupNotFoundException(id);

  return deletedGroup.deleteOne();
};
