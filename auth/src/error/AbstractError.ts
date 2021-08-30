interface SerializedError {
  message: string;
  field?: string;
}

export abstract class AbstractError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): SerializedError[];

  constructor() {
    super();
    Object.setPrototypeOf(this, AbstractError.prototype);
  }
}
