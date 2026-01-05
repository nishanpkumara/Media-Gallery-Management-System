import User from '../models/user.js';
import { sendOTPEmail } from '../utils/otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60000); // 10 mins

  const user = new User({ 
    name, email, password, 
    otp: { code: otpCode, expiresAt: otpExpires },
    isActive: false //for soft delete
  });

  await user.save();
  await sendOTPEmail(email, otpCode);
  
  res.status(200).json({ message: 'OTP sent to your email' });
};

const verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp.code !== code || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Activate user and clear OTP
    user.isActive = true;
    user.otp = undefined;
    await user.save();

    // role for Admin
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userLogin = async (req, res) => {
  try {

    //validate fields
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({message: 'All fields are required'});
    }

    //find user
    const loginUser = await User.findOne({ email });
    if(!loginUser){
      return res.status(404).json({message: 'User Not Found'});
    };

    //valiade password
    const isMatch = bcrypt.compare(password, loginUser.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    return res.status(200).json({
      message: 'Login Successfull',
      loginUser
    });
  } catch (error) {
    return res.status(500).json({message: 'Internal server error', error: error.message});
  }
}

export {register, verifyOTP, userLogin};