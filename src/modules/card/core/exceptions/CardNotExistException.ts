export class CardNotExistException extends Error {
  constructor() {
    super("Card does not exist");
    this.name = "CardNotExistException";
  }
}
