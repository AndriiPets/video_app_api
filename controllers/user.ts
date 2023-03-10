import express from "express";
import createError from "../error";
import User from "../models/User";
import UserType from "../models/User";
import Video from "../models/Video";

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
    return next(createError(403, "You can only modify your account!"));
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.params.id === req.query.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your account!"));
  }
};

export const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await User.findByIdAndUpdate(req.query.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await User.findByIdAndUpdate(req.query.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successful");
  } catch (err) {
    next(err);
  }
};

export const like = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.query.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video has been liked by you");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.query.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("You disliked the video");
  } catch (err) {
    next(err);
  }
};

export const getAllSubscribedChannels = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    const subChannels = user!.subscribedUsers!;

    const list = await Promise.all(
      subChannels.map((channelId) => {
        return User.find({ _id: channelId });
      })
    );

    res.status(200).json(list.flat());
  } catch (err) {
    next(err);
  }
};
