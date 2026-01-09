import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { apiCall } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Manual Login
    const handleManualSubmit = async (e) => {
        e.preventDefault();
        const res = await apiCall('/auth/login', 'POST', { email, password });
        handleAuthResponse(res);
    };

    // Google Login
    const handleGoogleSuccess = async (credentialResponse) => {
        const res = await apiCall('/auth/google-login', 'POST', {
            token: credentialResponse.credential
        });
        handleAuthResponse(res);
    };

    const handleAuthResponse = (res) => {
        if (res && res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            // Redirect based on role
            navigate(res.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } else {
            setError(res.error || 'Login failed');
        }
    };

    return (
        /* Uses the same .form-box as Register for consistency */
        <div className="form-box">
            <h2>Login</h2>
            
            {error && (
                <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleManualSubmit}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                <span style={{ padding: '0 10px', color: '#9ca3af', fontSize: '0.75rem' }}>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            </div>

            {/* Google OAuth Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin 
                    onSuccess={handleGoogleSuccess} 
                    onError={() => setError('Google Login Failed')} 
                />
            </div>

            <p>
                No account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}