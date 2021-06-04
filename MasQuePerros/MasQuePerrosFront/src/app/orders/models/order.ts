import { User } from '../../users/user'
import { OrderItem } from './order-item';

export class Order {

  order_id: number = 0;
  items: OrderItem[] = [];
  user: User = new User();
  price: number = 0;
}
