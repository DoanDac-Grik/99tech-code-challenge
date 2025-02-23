import express from 'express';
import userController from '../controllers/user.controller';
import { asyncHandler } from '../common/asyncHandler';
import { validate } from '../middlewares/validate.middleware';
import {
  createUserSchema,
  deleteUserByIdSchema,
  getUserByIdSchema,
  listUsersSchema,
  updateUserByIdSchema,
} from '../validations/user.validation';

const userRouter = express.Router();

userRouter.post(
  '/',
  validate(createUserSchema),
  asyncHandler(userController.create)
);
userRouter.get(
  '/',
  validate(listUsersSchema),
  asyncHandler(userController.list)
);
userRouter.get(
  '/:id',
  validate(getUserByIdSchema),
  asyncHandler(userController.getById)
);
userRouter.patch(
  '/:id',
  validate(updateUserByIdSchema),
  asyncHandler(userController.updateById)
);
userRouter.delete(
  '/:id',
  validate(deleteUserByIdSchema),
  asyncHandler(userController.deleteById)
);

export default userRouter;
