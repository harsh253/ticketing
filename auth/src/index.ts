import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { initDB } from "./config/db";
import { NotFoundError } from "./error/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false, // we don't need encryption here
    secure: true,
  })
);
app.use(express.json());
const PORT = 3000;

const routes = [currentUserRouter, signInRouter, signOutRouter, signUpRouter];

routes.forEach((route) => {
  app.use(route);
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

initDB();

app.listen(PORT, () => console.log(`Running auth service on port - ${PORT}`));
