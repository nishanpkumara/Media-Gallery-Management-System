import { Router } from "express";
import { register, userLogin, verifyOTP,googleLogin } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/verifyOTP").post(verifyOTP);
router.route("/login").post(userLogin);
router.route("/google-login").post(googleLogin);

export default router;
