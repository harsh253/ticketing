import { AbstractError } from "./AbstractError";

export class NotFoundError extends AbstractError {
  statusCode = 404;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Not found",
      },
    ];
  }
}
