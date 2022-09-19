import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IOrder } from '../models/order';
import * as orderService from '../services/order.service';
import { StatusCode } from '../types/common';

export const getAllOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const ordersList: IOrder[] = await orderService.getAllOrders();
  res.status(StatusCode.success).send(ordersList);
});

export const getOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const order: IOrder = await orderService.getOrder(req.params.id);
  res.status(StatusCode.success).send(order);
});

export const createOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const createdOrder: IOrder = await orderService.createOrder(req.body);
  res.status(StatusCode.success).send(createdOrder);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updatedOrder: IOrder = await orderService.updateOrder(req.params.id, req.body);
  res.status(StatusCode.success).send(updatedOrder);
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deletedOrder: IOrder = await orderService.deleteOrder(req.params.id);
  res.status(StatusCode.success).send(deletedOrder);
});
