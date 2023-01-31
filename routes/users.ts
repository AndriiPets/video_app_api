import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user";
import verifyToken from "../verifyToken";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", deleteUser);

//get user
router.get("/find/:id", getUser);

//subscribe to user
router.put("/sub/:id", subscribe);

//unsub  from user
router.put("/unsub/:id", unsubscribe);

//like video
router.put("/like/:videoId", like);

//dislike a video
router.put("/dislike/:videoId", dislike);

export default router;
