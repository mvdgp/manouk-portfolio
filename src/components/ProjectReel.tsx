import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, Code } from 'lucide-react';
import { projectsData } from '../data';

export default function ProjectReel() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const reelRef = useRef<HTMLDivElement>(null);

  // Handle scroll tracking
  const handleScroll = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    
    // Calculate scroll progress percentage
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    // Calculate current index based on which card is in view
    const cardElements = reelRef.current.children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cardElements.length - 1; i++) { // Skip spacer
      const card = cardElements[i] as HTMLElement;
      const distance = Math.abs(card.offsetLeft - scrollLeft - reelRef.current.offsetLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setCurrentIndex(closestIndex + 1);
  };

  const scrollToIndex = (index: number) => {
    if (!reelRef.current) return;
    const cardElements = reelRef.current.children;
    if (index >= 0 && index < projectsData.length) {
      const targetCard = cardElements[index] as HTMLElement;
      reelRef.current.scrollTo({
        left: targetCard.offsetLeft - reelRef.current.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="bg-surface-container py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-outline-variant pb-8">
          <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block mb-2">Portfolio</span>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-2">Featured Projects</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl">
            A selection of engineering challenges met with clean code and strategic architecture.
          </p>

          {/* Progress Tracker Bar */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex-grow h-0.5 bg-outline-variant relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-secondary"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              />
            </div>
            <div className="ml-6 font-mono text-xs font-semibold text-secondary flex items-center gap-4">
              {/* Manual Nav controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => scrollToIndex(currentIndex - 2)}
                  disabled={currentIndex === 1}
                  className="p-1.5 border border-outline-variant hover:border-secondary disabled:opacity-30 disabled:pointer-events-none hover:text-secondary transition-all"
                  aria-label="Previous Project"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollToIndex(currentIndex)}
                  disabled={currentIndex === projectsData.length}
                  className="p-1.5 border border-outline-variant hover:border-secondary disabled:opacity-30 disabled:pointer-events-none hover:text-secondary transition-all"
                  aria-label="Next Project"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="min-w-[40px] text-right">
                {currentIndex} / {projectsData.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wheel Carousel Container */}
      <div
        ref={reelRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-6 md:px-20 pb-12 max-w-[1440px] mx-auto scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="flex-none w-[85vw] md:w-[480px] snap-center group"
          >
            <div className="flex flex-col h-full bg-surface p-6 border border-transparent hover:border-secondary hover:scale-[1.01] hover:shadow-xl transition-all duration-300 ease-out">
              
              {/* Styled Image Preview */}
              <div className="aspect-video w-full overflow-hidden mb-6 relative bg-surface-container">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={project.image}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tags / Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] border border-outline-variant px-2.5 py-1 text-on-surface-variant group-hover:border-secondary group-hover:text-secondary transition-colors font-medium tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title / Short Desc */}
              <h3 className="font-headline text-lg md:text-xl font-bold text-primary mb-2 tracking-tight group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* Divider Line */}
              <div className="h-px bg-outline-variant w-full my-4" />

              {/* CTAs */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-primary text-primary hover:bg-secondary/5 hover:border-secondary hover:text-secondary font-mono text-xs transition-all uppercase tracking-wider font-bold"
                  onClick={(e) => {
                    if (project.liveUrl === '#' || !project.liveUrl) e.preventDefault();
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-on-primary hover:bg-secondary font-mono text-xs transition-colors uppercase tracking-wider font-bold"
                  onClick={(e) => {
                    if (project.githubUrl === '#' || !project.githubUrl) e.preventDefault();
                  }}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for end of scroll */}
        <div className="flex-none w-px md:w-20" />
      </div>
    </section>
  );
}
