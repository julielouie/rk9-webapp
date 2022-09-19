import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AccessControl } from 'role-acl';
import { grantsObject } from '../permissions/permissionResource';
import { UserNotFoundException } from '../exceptions/notFoundExceptions';
import {
  UnauthorizedException,
  UnauthorizedPermissionException,
} from '../exceptions/unauthorizedExceptions';
import * as db from '../db/user.db';

const AC = new AccessControl(grantsObject);

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const userId = req.cookies?.userId;

  if (!token) {
    const errorMsg = `Access denied, reason: no token provided`;
    throw new UnauthorizedException(errorMsg);
  }

  let result;
  try {
    result = jwt.verify(token, process.env.TOKEN_KEY || '');
  } catch (err) {
    throw new Error(`Token verification error: ${err}`);
  }

  if (!result) {
    const errorMsg = 'Token verification failed';
    throw new UnauthorizedException(errorMsg);
  }

  const user = await db.getUser(userId);
  if (!user) throw new UserNotFoundException(userId);
  res.locals.user = user;

  return true;
};

export const grantAccess = (access: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokenStatus = await verifyToken(req, res);
      if (!tokenStatus) return;

      const user = await db.getUser(res.locals.user.id);
      if (!user) throw new UserNotFoundException(res.locals.user.id);
      const { role } = user;
      const permission = await AC.can(role).execute(access).on(resource);
      if (!permission.granted) {
        throw new UnauthorizedPermissionException(res.locals.user.id);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
