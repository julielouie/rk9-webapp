import mongoose from 'mongoose';
import { IBase } from '../types/models';
import { IGroup } from './group';

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  groups: IGroup[];
  role: string;
  dogName: string;
  dogName2?: string;
  dogName3?: string;
  dogName4?: string;
  dogName5?: string;
}

export type ReturnUser = Pick<
  IUser,
  | 'id'
  | 'name'
  | 'email'
  | 'groups'
  | 'role'
  | 'dogName'
  | 'dogName2'
  | 'dogName3'
  | 'dogName4'
  | 'dogName5'
>;

export type IUserDocument = IUser & mongoose.Document;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
  },
  email: {
    type: String,
    minLength: 2,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  groups: {
    type: Array,
    required: true,
  },
  role: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  dogName: {
    type: String,
    required: true,
  },
  dogName2: {
    type: String,
    required: false,
  },
  dogName3: {
    type: String,
    required: false,
  },
  dogName4: {
    type: String,
    required: false,
  },
  dogName5: {
    type: String,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

userSchema.set('toObject', { virtuals: true });

export default mongoose.model<IUserDocument>('User', userSchema);
