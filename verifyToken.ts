import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";
import createError from "./error";

export interface CustomRequest extends express.Request {
  token: string | JwtPayload;
}

type jwtToken = {
  id: string;
  iat: number;
};

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    console.log(req.cookies);

    if (!token) return next(createError(401, "Not authanticated!"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as jwtToken;
    req.query = { id: decoded.id };

    next();
  } catch (err) {
    next(createError(403, "User not identified!"));
  }
};

export default verifyToken;
