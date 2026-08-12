import React, { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">

        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <Code2 size={20} />
          </div>
          <span>Danush S S</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right Side */}
        <div className="nav-actions">
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>

          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </a>

          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}