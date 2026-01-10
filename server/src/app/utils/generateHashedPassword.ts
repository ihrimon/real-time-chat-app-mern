import bcrypt from 'bcryptjs';

const generateHashedPassword = async (password: string, saltRound: number) => {
  return await bcrypt.hash(password, saltRound);
};

export default generateHashedPassword;
