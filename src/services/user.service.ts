import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../common/response';
import {
  ICreateUserBody,
  IListUsersQuery,
  IUpdateUserBody,
} from '../interfaces/user.interface';
import User from '../models/user.model';

class UserService {
  async create(payload: ICreateUserBody) {
    const user = await User.findOne({ email: payload.email });

    if (user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User already exists',
      });
    }

    await User.create(payload);
  }

  async list(query: IListUsersQuery) {
    const filters: { name?: RegExp; email?: RegExp } = {};
    console.log(query);
    if (query.name) {
      filters.name = new RegExp(query.name, 'i');
    }
    if (query.email) {
      filters.email = new RegExp(query.email, 'i');
    }

    const users = await User.find(filters)
      .skip((query.page - 1) * query.limit)
      .limit(query.limit);

    const total = await User.countDocuments(filters);

    return {
      data: users,
      extras: { total, page: query.page, limit: query.limit },
    };
  }

  async getById(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User not found',
      });
    }

    return user;
  }

  async updateById(id: string, payload: IUpdateUserBody) {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User not found',
      });
    }

    await User.findByIdAndUpdate(id, payload);
  }

  async deleteById(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User not found',
      });
    }

    await User.findByIdAndDelete(id);
  }
}

export default new UserService();
