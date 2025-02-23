import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../common/response';
import {
  ICreateUserBody,
  IListUsersQuery,
  IUpdateUserBody,
} from '../interfaces/user.interface';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

class UserService {
  private saltRounds = 10;

  async create(body: ICreateUserBody) {
    const user = await User.findOne({ email: body.email });

    if (user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User already exists',
      });
    }

    const { password, ...rest } = body;
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const payload = { ...rest, password: hashedPassword };

    await User.create(payload);
  }

  async list(query: IListUsersQuery) {
    const filters: { name?: RegExp; email?: RegExp } = {};

    if (query.name) {
      filters.name = new RegExp(query.name, 'i');
    }
    if (query.email) {
      filters.email = new RegExp(query.email, 'i');
    }

    const users = await User.find(filters, '-password')
      .skip((query.page - 1) * query.limit)
      .limit(query.limit);

    const total = await User.countDocuments(filters);

    return {
      data: users,
      extras: { total, page: query.page, limit: query.limit },
    };
  }

  async getById(id: string) {
    const user = await User.findById(id, '-password');

    if (!user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User not found',
      });
    }

    return user;
  }

  async updateById(id: string, body: IUpdateUserBody) {
    const user = await User.findById(id);

    if (!user) {
      throw new ErrorResponse({
        status: StatusCodes.BAD_REQUEST,
        errors: 'User not found',
      });
    }

    if (body.password) {
      const { password, ...rest } = body;

      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      const payload = { ...rest, password: hashedPassword };

      await User.findByIdAndUpdate(id, payload);
    } else {
      await User.findByIdAndUpdate(id, body);
    }
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
