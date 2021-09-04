import mongoose from "mongoose";
import { DatabaseConnectionError } from "../error/DatabaseConnectionError";

const connectionString = `mongodb://auth-mongo-srv:27017/auth`;

export const initDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.info("Connected to DB - auth");
  } catch (err) {
    console.error(err);
    throw new DatabaseConnectionError();
  }
};
