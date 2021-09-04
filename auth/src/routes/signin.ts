import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BusinessValidationError } from "../error/BusinessValidationError";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/User";
import { SIGN_IN } from "../modules/constants";
import { Encryptor } from "../services/Encryptor";
import { signInValidator } from "../validators/signinValidator";

const router = express.Router();

router.post(
  `${SIGN_IN}`,
  signInValidator(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BusinessValidationError("Invalid credentials");
    }

    const isPasswordValid = await Encryptor.isValid(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      throw new BusinessValidationError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! //secretkey
    );

    req.session = {
      jwt: token,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
