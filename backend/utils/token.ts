import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import { UserProps } from '../types';

export const generateToken = (user: UserProps) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  };

  return jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });
};
