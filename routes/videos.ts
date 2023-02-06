import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  popular,
  randomVideos,
  subVideos,
  updateVideo,
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
router.put("veiw/:id", addView);

//sort by popularity
router.get("/trend", popular);

//get a random videos collection
router.get("/random", randomVideos);

//get all videos uploaded by user subscribers
router.get("/sub", verifyToken, subVideos);

export default router;
