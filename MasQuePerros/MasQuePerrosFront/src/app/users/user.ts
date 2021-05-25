import { PaymentMethod } from './payment-method';
import { Role } from './role';

export class User {
  user_id: number;
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  first_access: boolean;
  role: Role;
  payment_method: PaymentMethod;

  constructor(
    user_id: number,
    username: string,
    password: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    birth_date: string,
    email: string,
    first_access: boolean,
    role: Role,
    payment_method: PaymentMethod
  ) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.email = email;
    this.first_access = first_access;
    this.role = role;
    this.payment_method = payment_method;
  }
}
