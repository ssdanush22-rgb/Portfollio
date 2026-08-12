import React from 'react';
import { Heart, Terminal, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="logo">
            <Code2 size={20} className="accent-icon" />
            <span className="logo-text">Danush <span className="gradient-text">S S</span></span>
          </div>
          <p>© {new Date().getFullYear()} Danush S S. Built with React, Express, and SQLite.</p>
        </div>

        {/*<div className="footer-right">
          <span className="footer-badge">
            <Terminal size={14} /> Full-Stack Portfolio Project
          </span>
        </div>*/}
      </div>
    </footer>
  );
}
