import React, { useState } from 'react';
import API_URL from '../api';
import { X, Plus, Sparkles, Image, Link, Code2 } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Full-Stack',
    technologies: '',
    image_url: '',
    demo_url: '',
    github_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      setLoading(false);

      onProjectAdded();
      onClose();

      setFormData({
        title: '',
        description: '',
        category: 'Full-Stack',
        technologies: '',
        image_url: '',
        demo_url: '',
        github_url: ''
      });

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">

        <div className="modal-header">
          <div>
            <h2>Add New Project</h2>
            <p>Add a project to your portfolio database.</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">

          <div className="form-group">
            <label>Project Title *</label>

            <input
              type="text"
              name="title"
              required
              placeholder="e.g. AI-Powered Data Analytics Platform"
              value={formData.title}
              onChange={handleChange}
            />
          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile/AI">Mobile / AI</option>
              </select>
            </div>


            <div className="form-group">
              <label>Tech Stack (Comma Separated) *</label>

              <input
                type="text"
                name="technologies"
                required
                placeholder="React, Express, SQLite, Tailwind"
                value={formData.technologies}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="form-group">
            <label>Description *</label>

            <textarea
              name="description"
              rows="3"
              required
              placeholder="Brief summary of key features and architecture..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Image URL (Optional)</label>

            <input
              type="url"
              name="image_url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Live Demo Link (Optional)</label>

              <input
                type="url"
                name="demo_url"
                placeholder="https://my-app.vercel.app"
                value={formData.demo_url}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>GitHub Repository URL (Optional)</label>

              <input
                type="url"
                name="github_url"
                placeholder="https://github.com/user/repo"
                value={formData.github_url}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="modal-actions">

            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving to DB...' : 'Save Project to DB'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}