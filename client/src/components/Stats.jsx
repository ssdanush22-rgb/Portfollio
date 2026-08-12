import React, { useEffect, useState } from 'react';
import API_URL from "../api";
import { FolderGit2, Cpu, MessageSquareText, Award } from 'lucide-react';

export default function Stats() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    yearsOfExperience: 3
  });

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setStats(data);
        }
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
      });
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid glass-panel">

          <div className="stat-item">
            <div className="stat-icon">
              <FolderGit2 size={24} />
            </div>

            <div className="stat-number gradient-text">
              1
            </div>

            <div className="stat-label">
              Projects Published
            </div>
          </div>


          <div className="stat-item">
            <div className="stat-icon">
              <Cpu size={24} />
            </div>

            <div className="stat-number gradient-text">
              20
            </div>

            <div className="stat-label">
              Final-year Software & UI Designer
            </div>
          </div>


          <div className="stat-item">
            <div className="stat-icon">
              <MessageSquareText size={24} />
            </div>

            <div className="stat-number gradient-text">
              Final Year
            </div>

            <div className="stat-label">
              Academic Status
            </div>
          </div>


          <div className="stat-item">
            <div className="stat-icon">
              <Award size={24} />
            </div>

            <div className="stat-number gradient-text">
              Full-Stack Development
            </div>

            <div className="stat-label">
              Currently Learning
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}