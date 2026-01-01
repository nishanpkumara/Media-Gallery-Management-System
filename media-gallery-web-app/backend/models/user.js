const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true
  },
  password: String,
  role: { 
    type: String, 
    default: "user" 
  },
  otp: {
    code: String,expiresAt: Date
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;