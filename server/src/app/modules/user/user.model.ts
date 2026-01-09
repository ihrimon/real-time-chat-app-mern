import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import { UserRole, UserStatus } from '../../constants';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: 'user',
  },
  status: {
    type: String,
    enum: UserStatus,
    default: 'active',
  }
}, {
  timestamps: true
});


export const User = model('User', userSchema);