import { BSONType } from 'mongodb';
import mongoose from 'mongoose';
import { IBase } from '../types/models';

export interface ITestimonial extends IBase {
  title: string;
  date: Date;
  review: string;
  image?: BSONType | null;
}

export type ITestimonialDocument = ITestimonial & mongoose.Document;

const testimonialSchema = new mongoose.Schema({
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
  review: {
    type: String,
    required: true,
  },
  image: {
    type: BSONType,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

testimonialSchema.set('toObject', { virtuals: true });

export default mongoose.model<ITestimonialDocument>('Testimonial', testimonialSchema);
