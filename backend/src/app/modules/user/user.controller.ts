import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { sendWelcomeEmail } from '../../utils/emailHandler';
import { userServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.registerUserIntoDB(req.body);

  await sendWelcomeEmail(result?.email, result?.name, config.client_url);

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { refreshToken, accessToken } = await userServices.loginUserIntoDB(
    req.body
  );

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60,
  });

  res.status(200).json({
    success: true,
    message: 'You are logged in!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await userServices.refreshToken(req.cookies.refreshToken);

  res.status(200).json({
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeUserStatus(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'User Status has been changed!',
    data: result,
  });
});

export const userControllers = {
  registerUser,
  loginUser,
  refreshToken,
  changeUserStatus,
};
