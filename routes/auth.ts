import express from "express";
import { signup, signin } from "../controllers/authController";

const router = express.Router();

//Create a user
router.post("/signup", signup);

//Signin
router.post("/signin", signin);

//Google auth
router.post("/google");

export default router;
