import mongoose from 'mongoose';
import { IBase } from '../types/models';
import { IGroup } from './group';
import { IUser } from './user';

export interface IPost extends IBase {
  user: Pick<IUser, 'id' | 'name'>;
  date: Date;
  group?: Pick<IGroup, 'id' | 'name'> | null;
  oneOnOneUserId?: string | null;
  text?: string;
  media?: string | null;
  mediaType?: string | null;
}

export type IPostDocument = IPost & mongoose.Document;

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    id: String,
    name: String,
  },
  date: {
    type: Date,
    required: true,
  },
  group: {
    id: String,
    name: String,
  },
  oneOnOneUserId: {
    type: String || null,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  media: {
    type: String,
    required: false,
  },
  mediaType: {
    type: String,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

postSchema.set('toObject', { virtuals: true });

export default mongoose.model<IPostDocument>('Post', postSchema);
