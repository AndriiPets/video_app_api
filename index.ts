import express, {
  Request,
  Response,
  Application,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users";
import videoRoute from "./routes/videos";
import commentRoute from "./routes/comments";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

app.use(errorHandler);

app.listen(PORT, (): void => {
  connect();
  console.log("connected to server!");
});
