const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middlewares/auth");

const router = express.Router();

// Submit message
router.post("/", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
});

// My messages
router.get("/my-messages", auth, async (req, res) => {
  const messages = await Contact.find({ userId: req.user.id });
  res.json(messages);
});

// Edit
router.put("/:id", auth, async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;