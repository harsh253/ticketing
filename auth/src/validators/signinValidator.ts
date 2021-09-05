import { body, ValidationChain } from "express-validator";

const validator = (): ValidationChain[] => {
  return [
    body("email").trim().isEmail().withMessage("Email is not valid"),
    body("password").trim().notEmpty().withMessage("Please enter a password"),
  ];
};

export { validator as signInValidator };
