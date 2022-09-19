import { map } from 'p-iteration';
import * as db from '../db/order.db';
import * as orderSchema from '../schemas/order.schema';
import { OrderMap } from '../mappers/OrderMap';
import { IOrder } from '../models/order';

export const getAllOrders = async (): Promise<IOrder[]> => {
  const allOrders = await db.getAllOrders();
  return map(allOrders, (order) => OrderMap.toSimpleDTO(order));
};

export const getOrder = async (id: string): Promise<IOrder> => {
  const orderInfo = await db.getOrder(id);
  return OrderMap.toDTO(orderInfo);
};

export const createOrder = async (payload: orderSchema.PostAndPutOrder): Promise<IOrder> => {
  const createdOrder = await db.createOrder(payload);
  return OrderMap.toDTO(createdOrder);
};

export const updateOrder = async (
  id: string,
  payload: orderSchema.PostAndPutOrder,
): Promise<IOrder> => {
  const updatedOrder = await db.updateOrder(id, payload);
  return OrderMap.toDTO(updatedOrder);
};

export const deleteOrder = async (id: string): Promise<IOrder> => {
  const deletedOrder = await db.deleteOrder(id);
  return OrderMap.toDTO(deletedOrder);
};
