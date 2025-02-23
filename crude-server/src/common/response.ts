import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SuccessResponse {
  status: StatusCodes;
  success: boolean;
  data?: Array<object> | object;
  extras?: object;
  constructor({
    status,
    data,
    extras,
  }: {
    status: StatusCodes;
    data?: Array<object> | object;
    extras?: object;
  }) {
    this.success = true;
    this.data = data;
    this.extras = extras;
    this.status = status;
  }

  send(res: Response, _headers = {}) {
    return res.status(this.status).json(this);
  }
}

export class ErrorResponse extends Error {
  status: StatusCodes;
  success: boolean;
  errors: string | Array<unknown>;

  constructor({
    errors,
    status = StatusCodes.BAD_REQUEST,
  }: {
    errors: string | Array<unknown>;
    status?: StatusCodes;
  }) {
    super();
    this.status = status;
    this.success = false;
    this.errors = errors;
  }
}
