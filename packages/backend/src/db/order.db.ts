import OrderModel, { IOrder, IOrderDocument } from '../models/order';
import { OrderNotFoundException } from '../exceptions/notFoundExceptions';
import * as orderSchema from '../schemas/order.schema';

export const getAllOrders = async (): Promise<IOrder[]> => {
  const query: any = {};
  const orderList: IOrder[] = await OrderModel.find(query).select('-__v').exec();
  return orderList;
};

export const getOrder = async (id: string): Promise<IOrder> => {
  const order: IOrderDocument | null = await OrderModel.findOne({ id }).select('-__v').exec();
  if (!order) throw new OrderNotFoundException(id);

  const result: IOrder = order.toObject();
  delete result._id;
  return result;
};

export const createOrder = async (payload: orderSchema.PostAndPutOrder): Promise<IOrder> => {
  const order = new OrderModel(payload);
  order.id = order._id;
  const savedOrder = await order.save();

  const result: IOrder = savedOrder.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const updateOrder = async (
  id: string,
  payload: orderSchema.PostAndPutOrder,
): Promise<IOrder> => {
  const order = await OrderModel.findOneAndUpdate({ id }, payload, { new: true });
  if (!order) throw new OrderNotFoundException(id);

  const result: IOrder = order.toObject();
  delete result._id;
  delete result.__v;
  return result;
};

export const deleteOrder = async (id: string): Promise<IOrder> => {
  const deletedOrder = await OrderModel.findOne({ id }).exec();
  if (!deletedOrder) throw new OrderNotFoundException(id);

  return deletedOrder.deleteOne();
};
