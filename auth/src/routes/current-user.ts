import express from "express";
import { requireAuthMiddleware } from "../middlewares/requireAuthMiddleware";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { CURRENT_USER } from "../modules/constants";

const router = express.Router();

router.get(
  `${CURRENT_USER}`,
  tokenMiddleware,
  requireAuthMiddleware,
  (req, res) => {
    return res.send({
      currentUser: req.currentUser,
    });
  }
);

export { router as currentUserRouter };
