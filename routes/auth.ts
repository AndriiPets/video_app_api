import express from "express";
import { signup, signin, logout } from "../controllers/authController";

const router = express.Router();

//Create a user
router.post("/signup", signup);

//Signin
router.post("/signin", signin);

//Google auth
router.post("/google");

//logout
router.get("/logout", logout);

export default router;
