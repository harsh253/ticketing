import { app } from "./app";
import { initDB } from "./config/db";

const PORT = 3000;

const initApp = () => {
  initDB();
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY (jwt-secret-key) is not added");
  }
  app.listen(PORT, () => console.log(`Running auth service on port - ${PORT}`));
};

initApp();
