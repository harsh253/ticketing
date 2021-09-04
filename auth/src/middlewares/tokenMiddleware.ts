import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CurrentUser {
  email: string;
  id: string;
}

/**
 * To add additional properties to Request object from express
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

/**
 * Responsible only to add the currentUser and its properties to Request object if jwt is present in cookie.
 * Does not handles error in case jwt is tampered or absent in cookie
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session?.jwt;
  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as CurrentUser;
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }

  next();
};
