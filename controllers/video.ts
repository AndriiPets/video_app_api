import express from "express";
import createError from "../error";
import User from "../models/User";
import Video from "../models/Video";

export const addVideo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const newVideo = new Video({ userId: req.query.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return createError(404, "video not found");
    if (req.query.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return createError(403, "You can update only your videos!");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return createError(404, "video not found");
    if (req.query.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("the video has been deleted!");
    } else {
      return createError(403, "You can delete only your videos!");
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("view added!");
  } catch (err) {
    next(err);
  }
};

export const randomVideos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const popular = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const subVideos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findById(req.query.id);
    const subChannels = user!.subscribedUsers!;

    const list = await Promise.all(
      subChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res
      .status(200)
      .json(
        list
          .flat()
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      );
  } catch (err) {
    next(err);
  }
};

export const userVideos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const videos = await Video.find({ userId: req.params.id });

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const tag = req.query.tags as string;
  const tags = tag.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
