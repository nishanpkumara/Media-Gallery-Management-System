import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../services/api';

export default function Register() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await apiCall('/auth/register', 'POST', user);
        
        if (res.message) {
            alert(res.message);
            navigate('/verify-otp', { state: { email: user.email } });
        } else {
            alert(res.error || "Registration failed");
        }
    };

    return (
        /* Matches '.form-box' in your App.css */
        <div className="form-box"> 
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    onChange={e => setUser({...user, name: e.target.value})} 
                />
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    onChange={e => setUser({...user, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password (min 8 characters)" 
                    minLength="8" 
                    required 
                    onChange={e => setUser({...user, password: e.target.value})} 
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}