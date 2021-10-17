import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { NotFoundError, errorHandler } from "@hj-ticketing-common/common";
import { createTicketRouter } from "./routes/createTicketRouter";

const app = express();
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false, // we don't need encryption here
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(express.json());

const routes = [createTicketRouter];

routes.forEach((route) => {
  app.use(route);
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
