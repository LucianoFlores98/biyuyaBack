export class IncreaseRateNotExistException extends Error {
  constructor() {
    super("Increase rate does not exist");
    this.name = "IncreaseRateNotExistException";
  }
}
