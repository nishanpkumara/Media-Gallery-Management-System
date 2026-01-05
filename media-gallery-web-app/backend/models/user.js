import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: { 
    type: String,
    reguire: true,
    unique: true,
    trim: true

  },
  password: {
    type: String,
    min: 8,
  },
  role: { 
    type: String,
    enum: ["user", "admin"],
    default: "user" 
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  isActive: { 
    type: Boolean, 
    default: false 
  },
});

//hashing password
userSchema.pre("save", async function (req, res) {
  if (!this.isModified("password")){
    return null;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } 
  catch (error) {
    console.log(error);
  }
  
});

const User = mongoose.model("User", userSchema);
export default User;
