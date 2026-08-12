import React, { useEffect, useState } from 'react';
import API_URL from "../api";
import { ExternalLink, Github, Trash2, Code, Sparkles } from 'lucide-react';

const singleDanushProject = [
  {
    id: 1,
    title: "IoT Smart Home Automation System",
    description:
      "A smart home automation system built with ESP8266 and Arduino IoT Cloud for real-time remote appliance control and Google Assistant voice integration.",
    category: "IoT / Hardware",
    technologies:
      "ESP8266, Arduino IoT Cloud, Google Assistant, C++",
    image_url:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    demo_url: "https://github.com/ssdanush22-rgb",
    github_url: "https://github.com/ssdanush22-rgb"
  }
];

export default function Projects({ refreshTrigger, onOpenAddModal }) {
  const [projects, setProjects] = useState(singleDanushProject);
  const [category, setCategory] = useState('All');

  const fetchProjects = (cat) => {
    const url =
      cat && cat !== 'All'
        ? `/api/projects?category=${cat}`
        : '/api/projects';

    fetch(`${API_URL}${url}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
      });
  };

  useEffect(() => {
    fetchProjects(category);
  }, [category, refreshTrigger]);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setProjects(prev => prev.filter(p => p.id !== id));

      fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE'
      }).catch(() => {});
    }
  };

  // Dynamically extract unique project categories
  const categories = [
    'All',
    ...Array.from(new Set(projects.map(p => p.category)))
  ];

  const filteredProjects =
    category === 'All'
      ? projects
      : projects.filter(
          p =>
            p.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <section id="projects" className="projects-section">
      <div className="container">

        <div className="section-header">
          <div className="section-tag">
            <Code size={14} /> Portfolio Showcase
          </div>

          <h2>
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p>
            Explore hardware, IoT, and software projects I've engineered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-wrapper">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${
                  category === cat ? 'active' : ''
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            className="btn-secondary add-proj-inline"
            onClick={onOpenAddModal}
          >
            <Sparkles size={16} /> Add New Project
          </button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="empty-state glass-panel">
            <p>No projects found in this category.</p>

            <button
              className="btn-primary"
              onClick={onOpenAddModal}
            >
              Add Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">

            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className="project-card glass-panel"
              >

                <div className="card-image-wrap">
                  <img
                    src={
                      proj.image_url ||
                      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={proj.title}
                    className="card-img"
                  />

                  <span className="card-category-badge">
                    {proj.category}
                  </span>
                </div>

                <div className="card-content">

                  <div className="card-header">
                    <h3 className="card-title">
                      {proj.title}
                    </h3>

                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDelete(proj.id, proj.title)
                      }
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="card-description">
                    {proj.description}
                  </p>

                  <div className="tech-tags">
                    {proj.technologies
                      .split(',')
                      .map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-tag"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                  </div>

                  <div className="card-footer">

                    <a
                      href={
                        proj.demo_url ||
                        'https://github.com/ssdanush22-rgb'
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="card-link primary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>

                    <a
                      href={
                        proj.github_url ||
                        'https://github.com/ssdanush22-rgb'
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="card-link secondary"
                    >
                      <Github size={16} />
                      Source Code
                    </a>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}