import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { setDefaultPaginationValue, TypedRequest } from '../common/request';
import { SuccessResponse } from '../common/response';
import { ICreateUserBody, IListUsersQuery } from '../interfaces/user.interface';
import userService from '../services/user.service';

class UserController {
  async create(
    req: TypedRequest<ICreateUserBody, never, never>,
    res: Response
  ) {
    await userService.create(req.body);

    return new SuccessResponse({
      status: StatusCodes.CREATED,
    }).send(res);
  }

  async list(req: TypedRequest<never, IListUsersQuery, never>, res: Response) {
    const query = setDefaultPaginationValue(req.query) as IListUsersQuery;

    const result = await userService.list(query);

    return new SuccessResponse({
      status: StatusCodes.OK,
      data: result.data,
      extras: result.extras,
    }).send(res);
  }

  async getById(
    req: TypedRequest<never, never, { id: string }>,
    res: Response
  ) {
    const result = await userService.getById(req.params.id);

    return new SuccessResponse({
      status: StatusCodes.OK,
      data: result,
    }).send(res);
  }

  async updateById(
    req: TypedRequest<never, never, { id: string }>,
    res: Response
  ) {
    await userService.updateById(req.params.id, req.body);

    return new SuccessResponse({
      status: StatusCodes.OK,
    }).send(res);
  }

  async deleteById(
    req: TypedRequest<never, never, { id: string }>,
    res: Response
  ) {
    await userService.deleteById(req.params.id);

    return new SuccessResponse({
      status: StatusCodes.OK,
    }).send(res);
  }
}

export default new UserController();
