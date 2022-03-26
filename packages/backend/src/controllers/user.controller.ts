import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUser } from '../models/user';
import * as userService from '../services/user.service';
import { StatusCode } from '../types/common';

export const getUserList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  let programId: string | undefined;
  if (req.query.programId && typeof req.query.programId === 'string')
    programId = req.query.programId;
  const { authUser } = res.locals;

  const userList = await userService.getUserList(authUser, programId);

  res.status(StatusCode.success).send(userList);
});

export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user: IUser = await userService.getUser(req.params.username);
  res.status(StatusCode.success).send(user);
});

export const getSelf = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user: IUser = await userService.getUser(res.locals.user.un);
  res.status(StatusCode.success).send(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdUser: IUser = await userService.createUser(req.body);
  res.status(StatusCode.success).send(createdUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedUser: IUser = await userService.updateUser(req.params.username, req.body);
  res.status(StatusCode.success).send(updatedUser);
});
