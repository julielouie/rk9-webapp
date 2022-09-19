import { IOrder } from '../models/order';

export class OrderMap {
  static toSimpleDTO(order: IOrder): IOrder {
    return this.toDTO(order);
  }

  static toDTO(order: IOrder): IOrder {
    return {
      id: order.id,
      client: order.client,
      items: order.items,
      fulfilled: order.fulfilled,
      total: order.total,
    };
  }
}
