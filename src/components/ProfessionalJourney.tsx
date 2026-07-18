import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Briefcase, Award, Zap } from 'lucide-react';
import { timelineEvents, education } from '../data';

export default function ProfessionalJourney() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First one expanded by default

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="bg-surface-dim py-24">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block mb-2">History</span>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary mb-4">
            Professional Journey
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-outline-variant ml-4 space-y-12 pb-4">
          {timelineEvents.map((event, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={idx} className="relative pl-10 group select-none">
                
                {/* Custom Diamond Marker on Timeline */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className={`absolute w-4 h-4 -left-[9px] top-1.5 transition-all duration-300 border-4 border-surface-dim outline-none cursor-pointer ${
                    isExpanded
                      ? 'bg-secondary scale-125 rotate-45'
                      : 'bg-primary hover:bg-secondary hover:scale-125'
                  }`}
                  aria-label={`Expand details for ${event.role}`}
                />

                {/* Period */}
                <span className="font-mono text-xs text-secondary uppercase tracking-wider font-bold">
                  {event.period}
                </span>

                {/* Title Card Header */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className="cursor-pointer flex justify-between items-start pt-1.5 group"
                >
                  <div>
                    <h3 className="font-headline text-lg md:text-2xl font-bold text-primary transition-colors group-hover:text-secondary tracking-tight">
                      {event.role}
                    </h3>
                    <p className="font-mono text-xs text-on-surface-variant font-semibold mt-1">
                      {event.company}
                    </p>
                  </div>
                  <div className="text-on-surface-variant/40 group-hover:text-secondary transition-colors pt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Short Initial Description */}
                <p className="font-sans text-sm text-on-surface-variant mt-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Expanding Achievements Block */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {/* Achievements bullets */}
                      <div className="mt-4 space-y-3 pt-2 border-t border-outline-variant/30">
                        <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-bold block mb-1">
                          Key Achievements:
                        </span>
                        <ul className="space-y-3 font-sans text-xs md:text-sm text-on-surface-variant pl-4">
                          {event.achievements.map((achievement, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              className="relative before:content-['■'] before:absolute before:-left-4 before:text-[6px] before:text-secondary before:top-1.5 leading-relaxed"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack row */}
                        <div className="pt-4 flex flex-wrap gap-1.5 items-center">
                          <span className="font-mono text-[9px] text-secondary uppercase font-bold tracking-widest mr-2">
                            Technologies used:
                          </span>
                          {event.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] px-2 py-0.5 bg-surface/80 border border-outline-variant/60 rounded text-on-surface-variant font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Education & Certifications Section */}
        <div className="mt-20 pt-16 border-t border-outline-variant/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Education Block */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block mb-2">Academics</span>
                <h3 className="font-headline text-2xl font-extrabold text-primary flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary" /> Education
                </h3>
              </div>
              
              <div className="relative pl-6 border-l-2 border-secondary/30 space-y-1">
                <span className="font-mono text-xs text-secondary font-bold uppercase tracking-wider">
                  {education.period}
                </span>
                <h4 className="font-headline text-lg font-bold text-primary tracking-tight">
                  {education.degree}
                </h4>
                <p className="font-sans text-sm text-on-surface-variant font-semibold">
                  {education.institution}
                </p>
                <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed pt-2">
                  {education.description}
                </p>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block mb-2">Credentials</span>
                <h3 className="font-headline text-2xl font-extrabold text-primary flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" /> Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {education.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3 p-4 bg-surface/50 border border-outline-variant/60 hover:border-secondary/40 transition-colors duration-200">
                    <Zap className="w-4 h-4 text-secondary shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="font-sans text-sm font-bold text-primary leading-tight">
                        {cert.name}
                      </h4>
                      <p className="font-mono text-[9px] text-on-surface-variant/70 uppercase mt-1 tracking-wider">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
