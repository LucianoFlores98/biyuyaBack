export class InsufficientIPCDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsufficientIPCDataException";
  }
}
