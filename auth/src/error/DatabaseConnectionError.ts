import { AbstractError } from "./AbstractError";

export class DatabaseConnectionError extends AbstractError {
  statusCode = 500;
  message = "Could not connect to database";

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
