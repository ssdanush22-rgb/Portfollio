import React, { useEffect, useState } from 'react';
import API_URL from "../api";
import { Layers, CheckCircle2 } from 'lucide-react';

const deepakSkillsData = [
  // Programming Languages
  { id: 1, name: "C++", category: "Programming Languages" },
  { id: 2, name: "JavaScript", category: "Programming Languages" },
  { id: 3, name: "HTML5", category: "Programming Languages" },
  { id: 4, name: "CSS3", category: "Programming Languages" },

  // Frontend Development
  { id: 5, name: "Responsive Web Design", category: "Frontend Development" },
  { id: 6, name: "JavaScript (ES6+)", category: "Frontend Development" },
  { id: 7, name: "HTML5 & CSS3", category: "Frontend Development" },

  // UI/UX Design
  { id: 8, name: "Figma", category: "UI/UX Design" },
  { id: 9, name: "UI Design", category: "UI/UX Design" },
  { id: 10, name: "Wireframing", category: "UI/UX Design" },
  { id: 11, name: "Prototyping", category: "UI/UX Design" },

  // Game Development
  { id: 12, name: "Godot Engine", category: "Game Development" },
  { id: 13, name: "Aseprite", category: "Game Development" },

  // Creative Tools
  { id: 14, name: "Adobe After Effects", category: "Creative Tools" },
  { id: 15, name: "DaVinci Resolve", category: "Creative Tools" },
  { id: 16, name: "CapCut", category: "Creative Tools" },
  { id: 17, name: "Canva", category: "Creative Tools" },

  // Development Tools
  { id: 18, name: "Git", category: "Development Tools" },
  { id: 19, name: "GitHub", category: "Development Tools" },
  { id: 20, name: "VS Code", category: "Development Tools" }
];

export default function Skills() {
  const [skills, setSkills] = useState(deepakSkillsData);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
      });
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(skills.map(s => s.category)))
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter(
          s =>
            s.category.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <section id="skills" className="skills-section">
      <div className="container">

        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} /> Skills & Expertise
          </div>

          <h2>
            Technical <span className="gradient-text">Skills</span>
          </h2>

          <p>
            Technologies I've learned through academic projects,
            personal projects, and continuous learning.
          </p>
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tab-btn ${
                activeCategory === cat ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="skill-card glass-panel"
            >
              <div className="skill-header">
                <div className="skill-title-wrap">
                  <CheckCircle2
                    size={18}
                    className="skill-icon"
                  />

                  <span className="skill-name">
                    {skill.name}
                  </span>
                </div>
              </div>

              <span className="skill-category-badge">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}