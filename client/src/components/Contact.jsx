import React, { useState } from 'react';
import API_URL from "../api";
import { Mail, Send, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit form.');

      setStatus({
        loading: false,
        success: true,
        message: 'Message successfully saved to SQLite backend database!'
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        message: err.message
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag"><Mail size={14} /> Get In Touch</div>
          <h2>Contact <span className="gradient-text">Me</span></h2>
          <p>Send a message directly for collaboration inquiries or job opportunities.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-panel">
            <h3> DANUSH S S</h3>
            <p>Final-year Software Developer passionate about building modern web applications, designing intuitive user interfaces, and exploring creative technologies. </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <span className="info-label">Email</span>
                  <a href="mailto:danush@example.com" className="info-value">danush@example.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">Chennai, Tamil Nadu, India</span>
                </div>
              </div>

             <div className="info-item">
                 {/*<div className="info-icon"><Phone size={20} /></div>
                <div>
                  <span className="info-label">Phone</span>
                  <a href="tel:9043796527" className="info-value">9043796527</a>
                </div>*/}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form glass-panel">
            {status.success === true && (
              <div className="status-toast success">
                <CheckCircle size={18} /> {status.message}
              </div>
            )}
            {status.success === false && (
              <div className="status-toast error">
                <AlertCircle size={18} /> {status.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="Project Inquiry / Job Opportunity" 
                value={formData.subject} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea 
                name="message" 
                rows="4" 
                required 
                placeholder="Hi Danush, I would like to discuss a project..." 
                value={formData.message} 
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={status.loading}>
              <Send size={18} /> {status.loading ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
