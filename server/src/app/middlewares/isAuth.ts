import config from '../config';
import CustomError from '../utils/CustomError';
import catchAsync from '../utils/catchAsync';
import verifyToken from '../utils/verifyToken';
import { TUserRole } from '../interface';
import { User } from '../modules/user/user.model';

const isAuth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) throw new CustomError(401, 'You are not authorized!');

    const decoded = verifyToken(token, config.jwt_secret_key as string);

    const { role, email } = decoded;

    if (requiredRole && !requiredRole.includes(role))
      throw new CustomError(401, 'You are not authorized!');

    const user = await User.findOne({ email });
    if (!user) throw new CustomError(404, 'User doesn"t exists!');

    req.user = decoded;

    next();
  });
};

export default isAuth;
