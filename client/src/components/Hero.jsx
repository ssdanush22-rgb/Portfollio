import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles } from 'lucide-react';
import profile from "../assets/PFP.png";
export default function Hero() {
  return (
    <section id="about" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-text">
          <div className="section-tag">
            <Sparkles size={14} /> Final Year Software Engineer
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text"> Deepak</span> 
          </h1>
          <p className="hero-subtitle">
            Final-year Software Developer and UI Designer passionate about building modern web applications,
            interactive user interfaces, and creative digital experiences.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              View Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="social-links">
            <a href="https://github.com/Deepak-Desanta" target="_blank" rel="noreferrer" title="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/deepak-g-787aa9330?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deepakgnanavel21@gmail.com" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-frame glass-panel">
            <img 
              src={profile}
              alt="Deepak Profile" 
              className="avatar-img"
            />
            <div className="floating-badge tech-badge-1 glass-panel">
              <span className="badge-dot"></span> Software Developer
            </div>
            <div className="floating-badge tech-badge-2 glass-panel">
             <span className="badge-dot"></span> UI Designer
            </div> 
          </div>
        </div>
      </div>
    </section>
  );
}
