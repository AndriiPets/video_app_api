import express from "express";
import createError from "../error";
import User from "../models/User";

export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.params.id === req.query.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "Invalid access"));
  }
};

export const deleteUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export const getUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export const subscribe = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export const unsubscribe = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export const like = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export const dislike = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};
