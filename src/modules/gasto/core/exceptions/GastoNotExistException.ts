export class GastoNotExistException extends Error {
  constructor() {
    super("Gasto does not exist");
    this.name = "GastoNotExistException";
  }
}
