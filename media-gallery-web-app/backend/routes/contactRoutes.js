import { Router } from "express";
import {createContact, viewContact, updateContact, deleteContact} from '../controllers/contactController.js'

const router = Router();

router.route("/create").post(createContact);
router.route("/my-messages").get(viewContact);
router.route("/:id").put(updateContact);
router.route("/deleteContact/:id").delete(deleteContact);
// import { auth, admin } from '../middlewares/auth'

// router.get("/api/contact/my-messages", auth, async (req, res) => {
//   const messages = await Contact.find({ userId: req.user.id });
//   res.json(messages);
// });

// router.put("/api/contact/:id", auth, async (req, res) => {
//   // Logic: Ensure user owns the message before updating
//   const message = await Contact.findOne({ _id: req.params.id, userId: req.user.id });
//   if (!message) return res.status(404).json({ msg: "Message not found or unauthorized" });
  
//   await Contact.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ message: "Updated" });
// });

// // 4. Admin View: Get ALL messages (Requirement PAGE 5)
// router.get("/api/admin/contact", auth, admin, async (req, res) => {
//   const messages = await Contact.find().populate('userId', 'name email');
//   res.json(messages);
// });

// router.delete("/api/admin/contact/:id", auth, admin, async (req, res) => {
//   await Contact.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted by Admin" });
// });

export default router;