import { useState } from "react";
import { apiCall } from "../services/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await apiCall('/contact', 'POST', formData); 

    if(!res.error){
      setFormData({ name: '', email: '', message: '' });
      setStatus('Message sent successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus(`Error: ${res.error}`);
    }
  }
  
  return (
    <div className="form-box">
      <h2>Contact Us</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Have a question? Send us a message and we'll get back to you.
      </p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name"
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required
        />

        <input 
          type="email" 
          placeholder="Your Email"
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required
        />

        <textarea 
          placeholder="How can we help you?"
          rows="4"
          value={formData.message} 
          onChange={(e) => setFormData({...formData, message: e.target.value})} 
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />

        <button type="submit">Send Message</button>

        {status && (
          <p style={{ 
            marginTop: '1rem', 
            textAlign: 'center', 
            fontWeight: '600',
            color: status.includes('Error') ? '#ef4444' : '#10b981' 
          }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}