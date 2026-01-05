import { Router } from "express";
import { deactivateUser, register, userLogin, verifyOTP } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/verifyOTP").post(verifyOTP);
router.route("/login").post(userLogin);
router.route("/deactivate/:id").patch(deactivateUser);


export default router;