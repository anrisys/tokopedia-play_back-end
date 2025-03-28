export class BusinessLogicError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = "BusinessLogicError";
    Object.setPrototypeOf(this, BusinessLogicError.prototype);
  }
}
