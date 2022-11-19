import mongoose from 'mongoose';
import { IBase } from '../types/models';

export interface IJournalPost extends IBase {
  title: string;
  date: Date;
  oneOnOneUserId: string;
  notes: string;
  workOn?: string;
  links?: string[];
  misc?: string;
}

export type IJournalPostDocument = IJournalPost & mongoose.Document;

const journalPostSchema = new mongoose.Schema({
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
  oneOnOneUserId: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  workOn: {
    type: String,
    required: false,
  },
  links: {
    type: Array,
    required: false,
  },
  misc: {
    type: String,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

journalPostSchema.set('toObject', { virtuals: true });

export default mongoose.model<IJournalPostDocument>('Journal Post', journalPostSchema);
