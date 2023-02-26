import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  popular,
  randomVideos,
  search,
  subVideos,
  updateVideo,
  userVideos,
} from "../controllers/video";
import verifyToken from "../verifyToken";

const router = express.Router();

//create video
router.post("/", verifyToken, addVideo);

//update video
router.put("/:id", verifyToken, updateVideo);

//delete video
router.delete("/:id", verifyToken, deleteVideo);

//get video
router.get("/find/:id", getVideo);

//add view
router.put("/veiw/:id", addView);

//sort by popularity
router.get("/trend", popular);

//get a random videos collection
router.get("/random", randomVideos);

//get all videos by a user
router.get("/channel/:id", userVideos);

//get all videos uploaded by user subscribers
router.get("/sub", verifyToken, subVideos);

//search videos by tags
router.get("/tags", getByTag);

//search videos by title
router.get("/search", search);

export default router;
