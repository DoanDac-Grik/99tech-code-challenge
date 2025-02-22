import { NextFunction, Response } from 'express';
import Express from 'express';

export const asyncHandler =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (fn: Function) => (req: Express.Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
