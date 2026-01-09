import { TUserRole, TUserStatus } from '../../interfaces';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  status: TUserStatus;
}
