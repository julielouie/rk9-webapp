import mongoose from 'mongoose';
import { IBase } from '../types/models';
import { PayloadValidationException } from '../exceptions/badRequestExceptions';

export interface IUser extends IBase {
  username: string;
  name?: string;
  email?: string;
}

export type IUserDocument = IUser & mongoose.Document;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
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
});

// ────────────────────────────────────────────────────────────────────────────────

userSchema.pre<IUserDocument>('save', async function () {
  const doc = this;

  // check if user already exists
  const user = await doc.model('User').findOne({ username: doc.username });

  if (user) {
    const errorMsg = `A user with the username ${doc.username} already exists`;
    throw new PayloadValidationException(errorMsg);
  }
});

userSchema.set('toObject', { virtuals: true });

export default mongoose.model<IUserDocument>('User', userSchema);
