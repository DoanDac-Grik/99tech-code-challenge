import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../common/response';
import { StatusCodes } from 'http-status-codes';

function errorMiddleware(
  err: ErrorResponse,
  _req: Request,
  res: any,
  _next: NextFunction
) {
  if (err instanceof SyntaxError) {
    err = new ErrorResponse({
      status: StatusCodes.BAD_REQUEST,
      errors: err.message,
    });
  } else if (!(err instanceof ErrorResponse)) {
    err = new ErrorResponse({
      errors: 'Internal Server Error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
  return res.status(err.status).json(err);
}

export default errorMiddleware;
