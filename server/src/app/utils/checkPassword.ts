import bcrypt from 'bcryptjs';

const checkPassword = async (oldPassword: string, newPassword: string) => {
  return await bcrypt.compare(oldPassword, newPassword);
};

export default checkPassword;
