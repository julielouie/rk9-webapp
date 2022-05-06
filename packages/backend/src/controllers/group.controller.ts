import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IGroup } from '../models/group';
import * as groupService from '../services/group.service';
import { StatusCode } from '../types/common';

export const getAllGroups = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const groupsList: IGroup[] = await groupService.getAllGroups();
  res.status(StatusCode.success).send(groupsList);
});

export const getGroup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const group: IGroup = await groupService.getGroup(req.params.id);
  res.status(StatusCode.success).send(group);
});

export const createGroup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdGroup: IGroup = await groupService.createGroup(req.body);
  res.status(StatusCode.success).send(createdGroup);
});

export const updateGroup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedGroup: IGroup = await groupService.updateGroup(req.params.id, req.body);
  res.status(StatusCode.success).send(updatedGroup);
});

export const deleteGroup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedGroup: IGroup = await groupService.deleteGroup(req.params.id);
  res.status(StatusCode.success).send(deletedGroup);
});
