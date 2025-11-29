export class RevenueNotExistException extends Error {
  constructor() {
    super("Revenue does not exist");
    this.name = "RevenueNotExistException";
  }
}
