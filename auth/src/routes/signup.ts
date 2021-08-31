import express, { Request, Response } from "express";
import { signUpValidator } from "../validators/signupValidator";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../error/RequestValidationError";
import { BusinessValidationError } from "../error/BusinessValidationError";
import { User } from "../models/User";

const router = express.Router();

router.post(
  `/api/users/signup`,
  signUpValidator(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password }: { email: string; password: string } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BusinessValidationError("Email already exists");
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
