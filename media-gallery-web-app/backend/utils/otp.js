import nodemailer from'nodemailer';

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your Verification Code - Media Gallery Web App',
    text: `Your OTP is: ${otp}. It expires in 10 minutes. Try not to share it with anyone.`
  };

  await transporter.sendMail(mailOptions);
};

export { sendOTPEmail };