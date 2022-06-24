import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ReturnUser } from '../models/user';
import * as userService from '../services/user.service';
import { StatusCode } from '../types/common';

export const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, dogName } = req.body;
  const user: ReturnUser = await userService.signUp(name, email, password, dogName);
  res.status(StatusCode.success).send(user);
});

export const logIn = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const { token, user } = await userService.logIn(email, password);
  res
    .cookie('token', token, { maxAge: 2592000000 }) // cookies lasts for 30 days, same as the length of the token
    .cookie('userId', user.id, { maxAge: 2592000000 })
    .status(StatusCode.success)
    .send(user);
});

export const logOut = (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.clearCookie('userId');
  res.status(StatusCode.success).end();
};

export const getSelf = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user: ReturnUser = await userService.getUser(res.locals.user.id);
  res.status(StatusCode.success).send(user);
});

export const getUserList = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userList = await userService.getUserList();
  res.status(StatusCode.success).send(userList);
});

export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user: ReturnUser = await userService.getUser(req.params.id);
  res.status(StatusCode.success).send(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedUser: ReturnUser = await userService.updateUser(req.params.id, req.body);
  res.status(StatusCode.success).send(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedUser: ReturnUser = await userService.deleteUser(req.params.id);
  res.status(StatusCode.success).send(deletedUser);
});
