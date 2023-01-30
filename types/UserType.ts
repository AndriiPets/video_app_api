import { Document } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  subscribers?: number;
  subscribedUsers?: string[];
}

export default UserType;
