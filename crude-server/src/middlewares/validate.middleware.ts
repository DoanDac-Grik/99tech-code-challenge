import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';
import { ErrorResponse } from '../common/response';
import { getInfoData } from '../utils';
import { StatusCodes } from 'http-status-codes';

export const validate =
  <T extends AnyObjectSchema>(resourceSchema: T) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const resource = getInfoData({
      fields: Object.keys(resourceSchema.fields),
      object: req,
    });
    try {
      const validatedData = await resourceSchema.validate(resource, {
        abortEarly: false,
        recursive: true,
      });
      Object.assign(req, validatedData);
      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        next(
          new ErrorResponse({
            status: StatusCodes.BAD_REQUEST,
            errors: err.errors,
          })
        );
      }
    }
  };
