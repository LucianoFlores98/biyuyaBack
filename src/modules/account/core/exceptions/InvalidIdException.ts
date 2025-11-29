export class InvalidIdException extends Error {
  constructor() {
    super("Invalid ID");
    this.name = "InvalidIdException";
  }
}
