import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error/UnauthorizedError";

/**
 * Requires tokenMiddleware to be called before.
 * Responsible for throwing error if currentUser property is absent in request object.
 * @param req
 * @param res
 * @param next
 */
export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }
  next();
};
