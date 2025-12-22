import express from 'express';
import { userControllers } from './user.controller';
import isValid from '../../middlewares/isValid';
import { userValidation } from './user.validation';
import isAuth from '../../middlewares/isAuth';

const router = express.Router();

router.post(
  '/register',
  isValid(userValidation.registerUserValidationSchema),
  userControllers.registerUser
);

router.post(
  '/login',
  isValid(userValidation.loginUserValidationSchema),
  userControllers.loginUser
);

router.post(
  '/refresh-token',
  isValid(userValidation.refreshTokenValidationSchema),
  userControllers.refreshToken
);

router.patch(
  '/change-status/:id',
  isAuth('admin'),
  isValid(userValidation.changeUserStatusValidationSchema),
  userControllers.changeUserStatus
);

export const authRoutes = router;
