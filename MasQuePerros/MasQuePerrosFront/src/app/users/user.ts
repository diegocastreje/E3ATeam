import { PaymentMethod } from "./payment-method";
import { Role } from "./role";

export class User {
    id: number;
    user: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    birth_day: string;
    email: string;
    first_access: boolean;
    role: Role;
    paymentMethod: PaymentMethod;

    constructor (id: number, user: string, password: string, first_name: string, middle_name: string, last_name: string, birth_day: string, email: string, first_access: boolean, role: Role, paymentMethod: PaymentMethod){
        this.id = id;
        this.user = user;
        this.password = password;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.birth_day = birth_day;
        this.email = email;
        this.first_access = first_access;
        this.role = role;
        this.paymentMethod = paymentMethod;
    }
}
