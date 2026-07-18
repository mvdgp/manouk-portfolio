/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TopNavBar from './components/TopNavBar';
import HeroSection from './components/HeroSection';
import ProjectReel from './components/ProjectReel';
import SkillsGrid from './components/SkillsGrid';
import ProfessionalJourney from './components/ProfessionalJourney';
import ContactSection from './components/ContactSection';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { personalInfo } from './data';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const getShortName = (nameStr: string) => {
    const parts = nameStr.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].toUpperCase()}`;
    }
    return nameStr.toUpperCase();
  };

  const brandName = getShortName(personalInfo.name);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-secondary/20 selection:text-secondary selection:font-medium">
      {/* Top Fixed Header */}
      <TopNavBar />

      {/* Main Contents */}
      <main className="mt-16 md:mt-20">
        
        {/* Hero Landing */}
        <HeroSection />

        {/* Dynamic Project Reels / Carousel */}
        <ProjectReel />

        {/* Technical Directory / Skills Progressions */}
        <SkillsGrid />

        {/* Timeline Profile / Journey */}
        <ProfessionalJourney />

        {/* Contact System */}
        <ContactSection />
      </main>

      {/* Corporate Modern Footer */}
      <footer className="bg-surface-container-highest w-full py-12 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 gap-8 max-w-[1440px] mx-auto">
          {/* Logo brand */}
          <span className="font-headline text-lg font-black uppercase tracking-widest text-secondary">
            {brandName}
          </span>

          {/* Copy info */}
          <p className="font-sans text-xs md:text-sm text-on-surface-variant text-center md:text-left">
            © 2026 {personalInfo.name}. Built with Precision.
          </p>

          {/* External links */}
          <div className="flex gap-8 font-mono text-xs uppercase tracking-wider">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-hover text-on-surface-variant hover:text-secondary transition-colors duration-200 font-bold"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-hover text-on-surface-variant hover:text-secondary transition-colors duration-200 font-bold"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top interactive float button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary hover:bg-secondary text-white border border-transparent shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 z-45"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

