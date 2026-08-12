import React, { useEffect, useState } from 'react';
import { MessageSquareText, Mail, Calendar, User, RefreshCw, X } from 'lucide-react';
import API_URL from "../api";

export default function MessagesAdmin({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);

    fetch(`${API_URL}/api/messages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load messages:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-modal glass-panel">

        <div className="admin-header">
          <div>
            <div className="section-kicker">
              <MessageSquareText size={16} />
              ADMIN
            </div>

            <h2>Contact Submissions Database</h2>
          </div>

          <div className="admin-actions">
            <button
              className="btn-secondary"
              onClick={fetchMessages}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              className="btn-delete"
              onClick={onClose}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <MessageSquareText size={32} />
            <p>No messages received in SQLite database yet.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <div
                key={msg.id}
                className="message-card glass-panel"
              >
                <div className="msg-header">

                  <div className="msg-user">
                    <User size={16} className="accent-icon" />

                    <strong>{msg.name}</strong>

                    <span className="msg-email">
                      <Mail size={13} />
                      {msg.email}
                    </span>
                  </div>

                  <span className="msg-date">
                    <Calendar size={12} />
                    {new Date(msg.created_at).toLocaleString()}
                  </span>

                </div>

                <div className="msg-subject">
                  Subject: {msg.subject || 'No subject'}
                </div>

                <p className="msg-body">
                  {msg.message}
                </p>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}