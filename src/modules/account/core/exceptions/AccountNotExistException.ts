export class AccountNotExistException extends Error {
  constructor() {
    super("Account does not exist");
    this.name = "AccountNotExistException";
  }
}
