import express from "express";
import { signup } from "../controllers/authController";

const router = express.Router();

//Create a user
router.post("/signup", signup);

//Signin
router.post("/signin");

//Google auth
router.post("/google");

export default router;
