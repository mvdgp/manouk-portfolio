import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Mail, MapPin } from 'lucide-react';
import { personalInfo, timelineEvents, skillsData, education } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const cvFileName = `${personalInfo.name.toUpperCase().replace(/\s+/g, '_')}_CV_2026.PDF`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl h-full max-h-[92vh] sm:max-h-[90vh] bg-surface border border-outline-variant shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header / Controls */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-outline-variant bg-surface-container-low gap-4">
              <div className="flex items-center min-w-0">
                <span className="font-label-mono text-xs uppercase tracking-widest text-secondary font-semibold truncate block">
                  {cvFileName}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-outline hover:border-secondary hover:text-secondary text-on-surface-variant font-label-mono text-xs transition-colors shrink-0 cursor-pointer"
                  title="Print Resume"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PRINT</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-surface-container-high transition-colors border border-outline-variant/60 rounded cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-on-surface" />
                </button>
              </div>
            </div>

            {/* Printable Area / Resume Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 bg-white print:p-0 print:text-black">
              <div className="max-w-[700px] mx-auto space-y-6 sm:space-y-8 print:space-y-6" id="resume-printable">
                
                {/* Header */}
                <div className="border-b border-outline-variant pb-6 space-y-2">
                  <h1 className="font-headline text-2xl sm:text-4xl font-extrabold tracking-tighter text-primary">{personalInfo.name}</h1>
                  <h2 className="font-headline text-base sm:text-lg font-semibold uppercase tracking-wider text-secondary">{personalInfo.title}</h2>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-mono text-on-surface-variant">
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                      <Mail className="w-3.5 h-3.5 text-secondary" />
                      {personalInfo.email}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Profile Summary
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                    {personalInfo.bio}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="space-y-3">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Technical Competence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs font-mono">
                    {skillsData.map((cat) => (
                      <div key={cat.category} className="space-y-1">
                        <span className="text-secondary font-semibold uppercase">{cat.category}:</span>
                        <p className="text-on-surface-variant font-sans">{cat.skills.map((s) => s.name).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Professional Experience
                  </h3>

                  <div className="space-y-4">
                    {timelineEvents.map((event, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-bold text-primary font-sans">{event.role}</h4>
                          <span className="text-xs font-mono text-secondary">{event.period}</span>
                        </div>
                        <span className="text-xs text-on-surface-variant font-medium font-mono">
                          {event.company} | {personalInfo.location}
                        </span>
                        <ul className="list-none space-y-1 text-xs text-on-surface-variant font-sans pl-3 pt-1">
                          {event.achievements.map((ach, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              className="relative before:content-['■'] before:absolute before:-left-3 before:text-[6px] before:text-secondary before:top-1.5"
                            >
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Education & Certifications
                  </h3>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <div>
                        <strong className="text-primary font-sans">{education.degree}</strong>
                        <p className="text-on-surface-variant font-mono text-[11px]">{education.institution}</p>
                      </div>
                      <span className="font-mono text-secondary">{education.period}</span>
                    </div>
                    <div className="pt-1 flex flex-wrap gap-2 text-[10px] font-mono">
                      {education.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-0.5 bg-surface-container border border-outline-variant rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Print Styling Override helper */}
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                #resume-printable, #resume-printable * {
                  visibility: visible;
                }
                #resume-printable {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
