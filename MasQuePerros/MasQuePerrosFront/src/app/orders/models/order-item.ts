import { Item } from '../../items/item'
import { Order } from './order';

export class OrderItem {

  id: number = 0;
  amount: number = 0;
  item: Item = new Item();
  order: Order = new Order();
}
