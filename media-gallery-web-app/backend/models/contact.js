const mongoose = require('mongoose');
const { create } = require('node:domain');
const { type } = require('node:os');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;