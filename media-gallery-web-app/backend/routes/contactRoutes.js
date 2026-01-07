import { Router } from "express";
import {createContact, viewMessages, updateMessage, deleteMessage,viewMessagesByAdmin} from '../controllers/contactController.js'
import { isAdmin, verifyToken } from "../middlewares/auth.js";

const router = Router();

router.route("/").post(verifyToken, createContact); //working fine
router.route("/my-messages").get(verifyToken, viewMessages);
router.route("/:id").put(verifyToken, updateMessage);
router.route("/:id").delete(verifyToken, deleteMessage);

router.route("/viewContact").get(verifyToken, viewMessages);

router.route("/").get(verifyToken,isAdmin, viewMessagesByAdmin); //view all messages by admin
router.route("/:id").delete(verifyToken, isAdmin, deleteMessage); //delete any contact by admin

export default router;