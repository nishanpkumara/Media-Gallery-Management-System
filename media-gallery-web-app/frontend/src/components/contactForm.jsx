// components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if(res.ok) alert("Message sent!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <input 
        type="text" placeholder="Name" className="w-full mb-2 p-2 border" 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
      />
      <input 
        type="email" placeholder="Email" className="w-full mb-2 p-2 border" 
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
      />
      <textarea 
        placeholder="Message" className="w-full mb-2 p-2 border" 
        onChange={(e) => setFormData({...formData, message: e.target.value})} 
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default ContactForm;