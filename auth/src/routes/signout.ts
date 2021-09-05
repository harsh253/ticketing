import express from "express";
import { SIGN_OUT } from "../modules/constants";

const router = express.Router();

router.post(`${SIGN_OUT}`, (req, res) => {
  req.session = null;
  return res.status(200).send({
    message: "Signed out",
  });
});

export { router as signOutRouter };
