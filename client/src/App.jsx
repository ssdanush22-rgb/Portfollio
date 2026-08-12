import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';

export default function App() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundParticles />
      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}