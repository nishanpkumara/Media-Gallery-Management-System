import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login';
import Register from './components/Register';
import VerifyOTP from './components/VerifyOTP';
import Dashboard from './components/Dashboard';

// Pages
import MediaGalleryPage from './pages/MediaGalleryPage';
import ImageUploadPage from './pages/ImageUploadPage';
import ContactPage from './pages/ContactPage';
import AdminUserPage from './pages/AdminUserPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginSuccess from './pages/LoginSuccess';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.role === 'admin') ? children : <Navigate to="/dashboard" />;
};

export default function App() {
    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/login-success" element={<LoginSuccess />} />

            {/* --- User Protected Routes --- */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/gallery" element={<ProtectedRoute><MediaGalleryPage /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><ImageUploadPage /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />

            {/* --- Admin Only Routes --- */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUserPage /></AdminRoute>} />

            {/* --- Default Redirect --- */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}