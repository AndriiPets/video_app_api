import { Document } from "mongoose";

interface VideoType extends Document {
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: Date;
}

export default VideoType;
