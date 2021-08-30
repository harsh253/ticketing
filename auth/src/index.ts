import express from "express";
import "express-async-errors";
import { NotFoundError } from "./error/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
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

app.listen(PORT, () => console.log(`Running auth service on port - ${PORT}`));
