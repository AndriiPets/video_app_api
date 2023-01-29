import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users";
import videoRoute from "./routes/videos";
import commentRoute from "./routes/comments";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8000;

const MONGO = process.env.MONGO || " ";

const connect = () => {
  mongoose
    .connect(MONGO)
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      throw err;
    });
};

app.use("/api/users", usersRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

app.listen(PORT, (): void => {
  connect();
  console.log("connected to server!");
});
