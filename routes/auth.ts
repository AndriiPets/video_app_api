import express from "express";
import {
  signup,
  signin,
  logout,
  googleAuth,
} from "../controllers/authController";

const router = express.Router();

//Create a user
router.post("/signup", signup);

//Signin
router.post("/signin", signin);

//Google auth
router.post("/google", googleAuth);

//logout
router.get("/logout", logout);

export default router;
