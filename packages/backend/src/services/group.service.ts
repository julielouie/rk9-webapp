import { map } from 'p-iteration';
import * as db from '../db/group.db';
import * as groupSchema from '../schemas/group.schema';
import { GroupMap } from '../mappers/GroupMap';
import { IGroup } from '../models/group';

export const getAllGroups = async (): Promise<IGroup[]> => {
  const allGroups = await db.getAllGroups();
  return map(allGroups, (group) => GroupMap.toSimpleDTO(group));
};

export const getGroup = async (name: string): Promise<IGroup> => {
  const groupInfo = await db.getGroup(name);
  return GroupMap.toDTO(groupInfo);
};

export const createGroup = async (payload: groupSchema.PostAndPutGroup): Promise<IGroup> => {
  const createdGroup = await db.createGroup(payload);
  return GroupMap.toDTO(createdGroup);
};

export const updateGroup = async (
  id: string,
  payload: groupSchema.PostAndPutGroup,
): Promise<IGroup> => {
  const updatedGroup = await db.updateGroup(id, payload);
  return GroupMap.toDTO(updatedGroup);
};

export const deleteGroup = async (id: string): Promise<IGroup> => {
  const deletedGroup = await db.deleteGroup(id);
  return GroupMap.toDTO(deletedGroup);
};
