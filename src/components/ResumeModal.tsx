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
        <div id="resume-modal-wrapper" className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="resume-modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl h-full max-h-[92vh] sm:max-h-[90vh] bg-surface border border-outline-variant shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header / Controls */}
            <div id="resume-modal-header" className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-outline-variant bg-surface-container-low gap-4">
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
                /* 1. Hide all main screen layout elements */
                nav, main, footer, button {
                  display: none !important;
                }

                /* 2. Hide modal interactive controls and backdrop */
                #resume-modal-backdrop,
                #resume-modal-header {
                  display: none !important;
                }

                /* 3. Reset modal wrapper and container to be static, transparent/white, and non-scrollable */
                #resume-modal-wrapper {
                  position: static !important;
                  display: block !important;
                  padding: 0 !important;
                  z-index: auto !important;
                }

                #resume-modal-container {
                  position: static !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  height: auto !important;
                  max-height: none !important;
                  border: none !important;
                  box-shadow: none !important;
                  background: white !important;
                  overflow: visible !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }

                /* 4. Reset body and html backgrounds and page setups */
                html, body {
                  background-color: white !important;
                  background: white !important;
                  color: black !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  height: auto !important;
                  min-height: auto !important;
                  overflow: visible !important;
                }

                /* 5. Clean layout of the printable resume sheet */
                #resume-printable {
                  background: white !important;
                  color: black !important;
                  padding: 0 !important;
                  margin: 0 auto !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  box-sizing: border-box !important;
                }

                /* Compact spacing to guarantee fitting onto 1 single page */
                #resume-printable .space-y-6,
                #resume-printable .space-y-8 {
                  margin-top: 0.65rem !important;
                  margin-bottom: 0.65rem !important;
                }
                
                #resume-printable .pb-6 {
                  padding-bottom: 0.4rem !important;
                }

                #resume-printable .grid {
                  gap: 0.4rem !important;
                }

                #resume-printable h1 {
                  font-size: 1.8rem !important;
                  line-height: 1.1 !important;
                }

                #resume-printable h2 {
                  font-size: 1rem !important;
                  line-height: 1.2 !important;
                }

                #resume-printable h3 {
                  font-size: 0.8rem !important;
                  line-height: 1.2 !important;
                  margin-bottom: 0.25rem !important;
                }

                #resume-printable p, 
                #resume-printable li, 
                #resume-printable span, 
                #resume-printable a {
                  font-size: 11px !important;
                  line-height: 1.35 !important;
                }

                #resume-printable ul {
                  margin-top: 0.15rem !important;
                }

                #resume-printable li {
                  margin-bottom: 0.1rem !important;
                }

                /* Standard margins for perfect printer layout */
                @page {
                  size: portrait;
                  margin: 1.0cm 1.2cm;
                }
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
