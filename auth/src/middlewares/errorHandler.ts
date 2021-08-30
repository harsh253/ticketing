import { Request, Response, NextFunction } from "express";
import { AbstractError } from "../error/AbstractError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AbstractError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  return res.status(500).send({
    message: "Something went wrong",
  });
};
