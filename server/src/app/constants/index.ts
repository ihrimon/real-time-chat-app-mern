import { TGender, TUserRole, TUserStatus } from '../interfaces';

export const UserRole: TUserRole[] = [
  'super_admin',
  'admin',
  'moderator',
  'user',
];
export const UserStatus: TUserStatus[] = ['active', 'blocked'];
export const Gender: TGender[] = ['Male', 'Female', 'Other'];
