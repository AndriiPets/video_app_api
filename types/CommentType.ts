import { Document } from "mongoose";

interface CommentType extends Document {
  userId: string;
  videoId: string;
  desc: string;
}

export default CommentType;
