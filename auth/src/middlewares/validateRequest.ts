import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../error/RequestValidationError";
/**
 * This middleware is to be used after a middleware that returns a ValidationChain[]
 *
 * @param req Will contain errors from the ValidationChain
 * @param res
 * @param next
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
