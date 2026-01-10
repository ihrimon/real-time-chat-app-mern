import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (
  jwtPayload: { user_id: Types.ObjectId; email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
