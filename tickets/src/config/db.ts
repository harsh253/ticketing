import mongoose from "mongoose";
import { DatabaseConnectionError } from "@hj-ticketing-common/common";

export const initDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.info("Connected to DB - tickets");
  } catch (err) {
    console.error(err);
    throw new DatabaseConnectionError();
  }
};
