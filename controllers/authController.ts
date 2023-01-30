import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import UserType from "../types/UserType";

export const signup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User<UserType>({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("user has been created!");
  } catch (err) {
    next(err);
  }
};
