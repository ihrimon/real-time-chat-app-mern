import config from '../../config';
import CustomError from '../../utils/CustomError';
import { generateToken } from '../../utils/generateToken';
import verifyToken from '../../utils/verifyToken';
import { IUser } from './user.interface';
import checkPassword from '../../utils/checkPassword';
import bcrypt from 'bcryptjs';
import { User } from './user.model';
import generateHashedPassword from '../../utils/generateHashedPassword';

// create user
const registerUserIntoDB = async (payload: IUser) => {
  const { email, password: userPassword } = payload;

  const user = await User.findOne({ email });
  if (user) throw new CustomError(409, 'User already exist!');

  const hashedPassword = await generateHashedPassword(
    userPassword,
    Number(config.salt_round)
  );

  return await User.create({ ...payload, password: hashedPassword });
};

// login user
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  let user = await User.findOne({ email });
  if (!user) throw new CustomError(404, 'User doesn"t exists!');

  if (!checkPassword(password, user?.password))
    throw new CustomError(400, 'Incorrect email or password.');

  const jwtPayload = {
    user_id: user?._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// refresh token generate
const refreshToken = async (token: string) => {
  const { user_id } = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await User.findOne({ user_id });
  if (!user) throw new CustomError(404, 'User doesn"t exists!');

  const jwtPayload = {
    user_id: user?._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

// change user status
const changeUserStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const userServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  refreshToken,
  changeUserStatus,
};
