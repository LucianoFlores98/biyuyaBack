export class WalletNotExistException extends Error {
  constructor() {
    super("Wallet does not exist");
    this.name = "WalletNotExistException";
  }
}
