import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { downloadResumePdf } from '../resume/downloadResumePdf';
import { personalInfo } from '../data';

export default function TopNavBar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

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
      const sections = ['hero', 'projects', 'skills', 'experience', 'about'];
      const scrollPosition = window.scrollY + 160; // Offset for navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = async () => {
    if (isDownloadingResume) return;

    setIsDownloadingResume(true);

    try {
      await downloadResumePdf();
    } finally {
      setIsDownloadingResume(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant">
        <div className="flex justify-between items-center px-6 md:px-20 py-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="font-headline text-2xl font-black tracking-tighter text-primary"
          >
            {brandName}
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects');
              }}
              className={`nav-link-hover font-headline text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeSection === 'projects'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('skills');
              }}
              className={`nav-link-hover font-headline text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeSection === 'skills'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('experience');
              }}
              className={`nav-link-hover font-headline text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeSection === 'experience'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Experience
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`nav-link-hover font-headline text-sm uppercase tracking-wider transition-colors duration-300 ${
                activeSection === 'about'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Download Resume Button */}
          <button
            onClick={handleResumeDownload}
            disabled={isDownloadingResume}
            className="shimmer-btn bg-primary text-on-primary font-mono text-xs font-semibold px-4 py-2.5 hover:bg-secondary transition-all duration-300 uppercase hidden lg:flex items-center gap-2 border border-transparent active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            {isDownloadingResume ? 'Preparing PDF' : 'Download Resume'}
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary p-2 focus:outline-none transition-transform hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-surface lg:hidden flex flex-col p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary">{brandName}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary p-2 transition-transform hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects');
              }}
              className="font-headline text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('skills');
              }}
              className="font-headline text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('experience');
              }}
              className="font-headline text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              Experience
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className="font-headline text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              Contact
            </a>

            <div className="mt-8">
              <button
                onClick={async () => {
                  setMobileMenuOpen(false);
                  await handleResumeDownload();
                }}
                disabled={isDownloadingResume}
                className="shimmer-btn w-full bg-primary text-on-primary font-mono text-sm py-4 hover:bg-secondary transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {isDownloadingResume ? 'Preparing PDF' : 'Download Resume'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
