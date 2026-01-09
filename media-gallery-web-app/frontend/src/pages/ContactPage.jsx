import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    return (
        /* Using the same centering logic as your other pages */
        <div className="dashboard-container">
            <div className="contact-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
                
                {/* Left Side: The Form */}
                <div>
                    <ContactForm />
                </div>

                {/* Right Side: Navigation Helper */}
                <div className="form-box" style={{ margin: '0' }}>
                    <h2>Your Messages</h2>
                    <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
                        Want to see the messages you've already sent or check for replies?
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link to="/dashboard" className="add-msg-btn" style={{ textAlign: 'center' }}>
                            Go to Dashboard
                        </Link>
                        
                        {isAdmin && (
                            <Link to="/admin/dashboard" className="add-msg-btn" style={{ 
                                textAlign: 'center', 
                                backgroundColor: '#111827' 
                            }}>
                                View All (Admin)
                            </Link>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}