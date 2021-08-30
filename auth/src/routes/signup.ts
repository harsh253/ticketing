import express, { Request, Response } from "express";
import { signUpValidator } from "../validators/signupValidator";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../error/RequestValidationError";
import { DatabaseConnectionError } from "../error/DatabaseConnectionError";

const router = express.Router();

router.post(
  `/api/users/signup`,
  signUpValidator(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();

    const { email, password } = req.body;

    res.send({});
  }
);

export { router as signUpRouter };
