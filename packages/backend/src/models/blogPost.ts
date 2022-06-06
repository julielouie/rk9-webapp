import mongoose from 'mongoose';
import { IBase } from '../types/models';

export interface IBlogPost extends IBase {
  title: string;
  date: Date;
  post: string;
  image?: string | null;
}

export type IBlogPostDocument = IBlogPost & mongoose.Document;

const blogPostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  date: {
    type: Date,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

blogPostSchema.set('toObject', { virtuals: true });

export default mongoose.model<IBlogPostDocument>('Blog Post', blogPostSchema);
