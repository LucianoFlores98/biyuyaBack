export class InvalidFieldException extends Error {
  constructor(invalidFields: string[]) {
    super(`Los siguientes campos no son válidos: ${invalidFields.join(', ')}`);
    this.name = "InvalidFieldException";
  }
}
