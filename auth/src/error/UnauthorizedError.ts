import { AbstractError } from "./AbstractError";

export class UnauthorizedError extends AbstractError {
  constructor() {
    super();

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  statusCode = 401;
  serializeErrors() {
    return [
      {
        message: "Not Authorized",
      },
    ];
  }
}
