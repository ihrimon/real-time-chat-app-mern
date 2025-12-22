import { z } from 'zod';
import { UserRole, UserStatus } from '../../constants';

// create user validation schema
const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters long')
      .max(20, 'Password should not exceed 20 characters'),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    status: z.enum([...UserStatus] as [string, ...string[]]).optional(),
  }),
});

// login user validation schema
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters long')
      .max(20, 'Password should not exceed 20 characters'),
  }),
});

// refresh token validation schema
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required!'),
  }),
});

// change user status validation schema
const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  changeUserStatusValidationSchema,
};
