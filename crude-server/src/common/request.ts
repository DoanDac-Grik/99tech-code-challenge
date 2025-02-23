import { ParamsDictionary } from 'express-serve-static-core';
import Express from 'express';
import * as yup from 'yup';
import mongoose from 'mongoose';

export const DEFAULT_PAGE_PAGINATION = 1;
export const DEFAULT_LIMIT_PAGINATION = 10;
export const DEFAULT_SORT_PAGINATION = -1;

export type SortOrder = 1 | -1;

export interface IPaginationQuery {
  limit: number;
  page: number;
  sort: SortOrder;
}

interface TypeExpressRequestDefinable<B, P extends ParamsDictionary>
  extends Express.Request {
  body: B;
  params: P;
}

type Query<Q> = {
  query: Q;
};
export type TypedRequest<
  B,
  Q,
  P extends ParamsDictionary
> = TypeExpressRequestDefinable<B, P> & Query<Q>;

export const objectIdSchema = yup
  .string()
  .test(
    'is-objectid',
    '${path} is not a valid objectId',
    (value) => value === undefined || mongoose.Types.ObjectId.isValid(value)
  );

export const setDefaultPaginationValue = (query: {
  page?: number;
  limit?: number;
  sort?: number;
  [key: string]: unknown;
}) => {
  if (!query.page) {
    query.page = DEFAULT_PAGE_PAGINATION;
  }
  if (!query.limit) {
    query.limit = DEFAULT_LIMIT_PAGINATION;
  }
  if (!query.sort) {
    query.sort = DEFAULT_SORT_PAGINATION;
  }

  return query;
};
