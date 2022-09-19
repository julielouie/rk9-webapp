import mongoose from 'mongoose';
import { IBase } from '../types/models';
import { IUser } from './user';

export interface IOrder extends IBase {
  client: Pick<IUser, 'id' | 'name'>;
  items: { name: string; size: string; quantity: number; price: number }[];
  fulfilled: boolean;
  total: number;
}

export type IOrderDocument = IOrder & mongoose.Document;

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  client: {
    id: String,
    name: String,
  },
  items: [
    {
      name: String,
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  fulfilled: {
    type: Boolean,
    required: false,
  },
  total: {
    type: Number,
    required: false,
  },
});

// ────────────────────────────────────────────────────────────────────────────────

orderSchema.set('toObject', { virtuals: true });

export default mongoose.model<IOrderDocument>('Order', orderSchema);
