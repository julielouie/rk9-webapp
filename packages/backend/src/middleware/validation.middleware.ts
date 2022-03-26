import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BadRequestException } from '../exceptions/badRequestExceptions';

export enum ValidationField {
  body = 'body',
  query = 'query',
  params = 'params',
  files = 'files',
}

export const parse = (
  schema: z.ZodTypeAny, // (z.object({})),
  property: ValidationField,
): ((arg0: Request, arg1: Response, arg2: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const propertyKey = property as keyof Request;
      const result = schema.parse(req[propertyKey]);
      if (property === ValidationField.body) req.body = result;
      if (property === ValidationField.query) req.query = result;
      if (property === ValidationField.files && !result) {
        const message = `File or body were not provided`;

        throw new BadRequestException(message);
      }
      next();
    } catch (err: any) {
      if (err) {
        let message = `${property} validation error: `;
        Object.keys(err.issues).forEach((key) => {
          message += `"${err.issues[key].path[0]}" is ${err.issues[key].message}, expected ${err.issues[key].expected}; `;
        });
        throw new BadRequestException(message);
      }
    }
  };
};
