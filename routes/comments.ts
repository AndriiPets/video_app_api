import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment";
import verifyToken from "../verifyToken";

const router = express.Router();

//adding comment to the video
router.post("/", verifyToken, addComment);

//delete comment from video
router.delete("/:id", verifyToken, deleteComment);

//get all video comments
router.get("/:videoId", verifyToken, getComments);

export default router;
