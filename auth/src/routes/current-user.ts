import express from "express";
import { requireAuthMiddleware } from "../middlewares/requireAuthMiddleware";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";

const router = express.Router();

router.get(
  `/api/users/current-user`,
  tokenMiddleware,
  requireAuthMiddleware,
  (req, res) => {
    return res.send({
      currentUser: req.currentUser,
    });
  }
);

export { router as currentUserRouter };
