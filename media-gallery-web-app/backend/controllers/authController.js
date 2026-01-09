import User from '../models/user.model.js';
import { sendOTPEmail } from '../utils/otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userCount = await User.countDocuments({});
    const role = userCount === 0 ? 'admin' : 'user';

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    const user = new User({
      name,
      email,
      password,
      role,
      otp: { code: otpCode, expiresAt: otpExpires },
      isActive: false
    });

    await user.save();
    await sendOTPEmail(email, otpCode);

    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp.code !== code || user.otp.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "Invalid or expired OTP"
      });
    };

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

    if (!loginUser.isActive) {
      return res.status(401).json({ message: 'Please verify your OTP first' });
    }

    //valiade password
    const isMatch = await bcrypt.compare(password, loginUser.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({
      id: loginUser._id,
      name: loginUser.name,
      email: loginUser.email,
      role: loginUser.role
    }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: 'Login Successful',
      token,
      user: {
        id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        role: loginUser.role
      }
    });
  } catch (error) {
    return res.status(500).json({message: 'Internal server error', error: error.message});
  }
};

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });

        const { name, email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            const isFirstUser = (await User.countDocuments({})) === 0;
            user = await User.create({
                name,
                email,
                avatar: picture,
                googleId,
                role: isFirstUser ? 'admin' : 'user',
                isVerified: true
            });
        }

        const appToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token: appToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(400).json({ error: "Google authentication failed" });
    }
};

export {register, verifyOTP, userLogin};