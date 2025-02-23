import { IPaginationQuery } from '../common/request';

export interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IListUsersQuery extends IPaginationQuery {
  name?: string;
  email?: string;
}

export interface IUpdateUserBody extends ICreateUserBody {}
