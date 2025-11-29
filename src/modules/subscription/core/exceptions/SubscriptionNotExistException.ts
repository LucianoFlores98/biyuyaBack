export class SubscriptionNotExistException extends Error {
  constructor() {
    super("Subscription does not exist");
    this.name = "SubscriptionNotExistException";
  }
}
