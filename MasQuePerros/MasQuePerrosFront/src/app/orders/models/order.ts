import { User } from '../../users/user'

export class Order {

  id: number = 0;
  name: string = "";
  user: User = new User();
  total: number = 0;
}
