export class PaymentMethodNotExistException extends Error {
  constructor() {
    super("Payment method does not exist");
    this.name = "PaymentMethodNotExistException";
  }
}
