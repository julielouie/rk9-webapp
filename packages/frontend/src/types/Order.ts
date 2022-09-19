import { User } from './User';

export interface Order {
  id?: string;
  client: Pick<User, 'id' | 'name'>;
  items: Item[];
  fulfilled: boolean;
  total: number;
}

export interface Item {
  name: string;
  size: string;
  quantity: number;
  price: number;
}
