import { Document } from "mongoose";

interface DocumentResult<T> {
  _doc: T;
}
interface UserType extends Document, DocumentResult<UserType> {
  name: string;
  email: string;
  password: string;
  image: string;
  subscribers?: number;
  subscribedUsers?: string[];
}

export default UserType;
