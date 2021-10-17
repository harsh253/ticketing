import { app } from "./app";
import { initDB } from "./config/db";

const PORT = 3000;

const initApp = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY (jwt-secret-key) is not added");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not added");
  }
  initDB(process.env.MONGO_URI);
  app.listen(PORT, () =>
    console.log(`Running ticketing service on port - ${PORT}`)
  );
};

initApp();
