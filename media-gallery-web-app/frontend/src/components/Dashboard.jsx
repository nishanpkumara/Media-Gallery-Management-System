import React, { useEffect, useState } from 'react';
import { apiCall } from '../services/api';
import { Link } from 'react-router-dom'; // Added this

function Dashboard() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserMessages();
    }, []);

    const fetchUserMessages = async () => {
        const res = await apiCall('/contact/my-messages', 'GET');
        if (res.contacts) {
            setMessages(res.contacts);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this message?")) {
            const res = await apiCall(`/contact/delete/${id}`, 'DELETE');
            if (res.message?.toLowerCase().includes("success")) {
                setMessages(messages.filter(m => m._id !== id));
            }
        }
    };

    if (loading) return <div className="form-box" style={{textAlign: 'center'}}>Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>My Contact Messages</h2>
                <p>Manage the messages you've sent.</p>
                
                {/* NEW: Redirect Button to Contact Page */}
                <Link to="/contact" className="add-msg-btn">
                    + Send New Message
                </Link>
            </div>
            
            <div className="message-grid">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg._id} className="message-card">
                            <p className="main-msg">"{msg.message}"</p>
                            <div className="msg-meta">
                                <span className="msg-to">To: {msg.email}</span>
                                <button onClick={() => handleDelete(msg._id)} className="delete-link">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No messages found.</p>
                        <Link to="/contact" style={{color: '#2563eb', fontWeight: '600'}}>
                            Click here to send your first message!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;