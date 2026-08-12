import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Header />

      <main>
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