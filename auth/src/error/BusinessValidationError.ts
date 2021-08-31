import { AbstractError } from "./AbstractError";

export class BusinessValidationError extends AbstractError {
  statusCode = 400;

  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, BusinessValidationError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
