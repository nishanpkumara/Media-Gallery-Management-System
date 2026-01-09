import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCall } from '../services/api';

export default function VerifyOTP() {
    const [code, setCode] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve the email passed from the Register page
    const email = location.state?.email || "";

    const handleVerify = async (e) => {
        e.preventDefault();
        // Calls the verifyOTP endpoint with email and code
        const res = await apiCall('/auth/verifyOTP', 'POST', { email, code });
        
        if (res.token) {
            localStorage.setItem('token', res.token);
            alert("Account Verified Successfully!");
            navigate('/login');
        } else {
            alert(res.msg || res.error || "Verification failed");
        }
    };

    return (
        /* Reusing the .form-box class from App.css for consistent UI */
        <div className="form-box">
            <h2>Verify OTP</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Enter the 6-digit code sent to: <br/>
                <strong style={{ color: '#111827' }}>{email}</strong>
            </p>
            
            <form onSubmit={handleVerify}>
                <input 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    required 
                    maxLength="6"
                    style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' }}
                    onChange={e => setCode(e.target.value)} 
                />
                <button type="submit">Verify Account</button>
            </form>
            
            <p className="auth-footer">
                Didn't receive a code? <button onClick={() => window.location.reload()} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '600', padding: '0', fontSize: '0.875rem' }}>Resend</button>
            </p>
        </div>
    );
}