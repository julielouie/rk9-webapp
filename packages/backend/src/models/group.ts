import mongoose from 'mongoose';
import { IBase } from '../types/models';

export interface IGroup extends IBase {
  id: string;
  name: string;
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
    unique: true,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

groupSchema.set('toObject', { virtuals: true });

export default mongoose.model<IGroupDocument>('Group', groupSchema);
