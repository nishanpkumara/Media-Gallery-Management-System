import React, { useState } from 'react';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Logic: POST to /api/auth/register, then setStep(2)
    setStep(2);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded shadow">
      {step === 1 ? (
        <form onSubmit={handleRegister}>
          <h2 className="text-2xl mb-4">Create Account</h2>
          <input type="email" placeholder="Email" className="w-full mb-3 p-2 border" required onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full mb-3 p-2 border" required />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Send OTP</button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Verify Email</h2>
          <p className="mb-4 text-sm">Enter the 6-digit code sent to {email}</p>
          <input type="text" placeholder="Enter OTP" className="w-full mb-3 p-2 border text-center tracking-widest" />
          <button className="w-full bg-green-600 text-white py-2 rounded">Verify & Login</button>
        </div>
      )}
    </div>
  );
};

export default Register;