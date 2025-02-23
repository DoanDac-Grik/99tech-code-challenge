import * as yup from 'yup';
import { objectIdSchema } from '../common/request';

export const createUserSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(6).max(30).required(),
  }),
});

export const updateUserByIdSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(6).max(30).required(),
  }),
  params: yup.object({
    id: objectIdSchema.required(),
  }),
});

export const getUserByIdSchema = yup.object({
  params: yup.object({
    id: objectIdSchema.required(),
  }),
});

export const deleteUserByIdSchema = yup.object({
  params: yup.object({
    id: objectIdSchema.required(),
  }),
});

export const listUsersSchema = yup.object({
  query: yup.object({
    page: yup.number().min(1).optional(),
    limit: yup.number().min(1).optional(),
    sort: yup.number().oneOf([1, -1]).optional(),
    name: yup.string().optional(),
    email: yup.string().optional(),
  }),
});
