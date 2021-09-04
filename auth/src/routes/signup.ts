import express, { Request, Response } from "express";
import { signUpValidator } from "../validators/signupValidator";
import { BusinessValidationError } from "../error/BusinessValidationError";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validateRequest";
import { SIGN_UP } from "../modules/constants";

const router = express.Router();

router.post(
  `${SIGN_UP}`,
  signUpValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
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

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! //secretkey
    );

    req.session = {
      jwt: token,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
