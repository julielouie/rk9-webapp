import mongoose from 'mongoose';
import { IBase } from '../types/models';
import { ReturnUser } from './user';

export interface IGroup extends IBase {
  name: string;
  members: ReturnUser[];
}

export type IGroupDocument = IGroup & mongoose.Document;

const groupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  members: {
    type: Array,
    required: true,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

groupSchema.set('toObject', { virtuals: true });

export default mongoose.model<IGroupDocument>('Group', groupSchema);
