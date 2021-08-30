import { body, ValidationChain } from "express-validator";

const validator = (): ValidationChain[] => {
  return [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be min 4 characters long"),
  ];
};

export { validator as signUpValidator };
