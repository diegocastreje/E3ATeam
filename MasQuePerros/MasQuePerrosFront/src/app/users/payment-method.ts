export class PaymentMethod {
  payment_id: number;
  description: string;

  constructor(payment_id: number, description: string) {
    this.payment_id = payment_id;
    this.description = description;
  }
}
