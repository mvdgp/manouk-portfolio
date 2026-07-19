import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, MapPin } from 'lucide-react';
import { personalInfo, timelineEvents, skillsData, education } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const portfolioUrl = 'https://manoukvandraanen.com/';
  const masterResumeEnabled = import.meta.env.DEV && import.meta.env.VITE_RESUME_MASTER_ENABLED?.toLowerCase() === 'true';
  const masterPhone = (import.meta.env.VITE_RESUME_MASTER_PHONE || '').trim();
  const masterEmail = (import.meta.env.VITE_RESUME_MASTER_EMAIL || '').trim();
  const shouldShowMasterContact = masterResumeEnabled && Boolean(masterPhone || masterEmail);
  const leftSkillGroups = skillsData.filter(({ category }) => ['frontend', 'tools'].includes(category.toLowerCase()));
  const rightSkillGroups = skillsData.filter(({ category }) => ['backend', 'cloud'].includes(category.toLowerCase()));

  const handlePrint = () => {
    const originalTitle = document.title;
    const cleanTitle = cvFileName.replace(/\.pdf$/i, '');
    document.title = cleanTitle;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 150);
  };

  const cvFileName = `${personalInfo.name.toUpperCase().replace(/\s+/g, '_')}_CV_2026.PDF`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="resume-modal-wrapper" className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            id="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          <motion.div
            id="resume-modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl h-full max-h-[92vh] sm:max-h-[90vh] bg-surface border border-outline-variant shadow-2xl flex flex-col z-10 overflow-hidden"
          >
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

            <div id="resume-printable-container" className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 bg-white print:p-0 print:text-black">
              <div className="max-w-175 mx-auto space-y-6 sm:space-y-8 print:space-y-6" id="resume-printable">
                <div className="border-b border-outline-variant pb-6 space-y-2">
                  <h1 className="font-headline text-2xl sm:text-4xl font-extrabold tracking-tighter text-primary">{personalInfo.name}</h1>
                  <h2 className="font-headline text-base sm:text-lg font-semibold uppercase tracking-wider text-secondary">{personalInfo.title}</h2>

                  <div className="pt-2 text-xs font-mono text-on-surface-variant">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        {personalInfo.location}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                      {shouldShowMasterContact ? (
                        <>
                          {masterPhone ? (
                            <a href={`tel:${masterPhone}`} className="text-secondary underline decoration-secondary/50 underline-offset-2 hover:text-primary transition-colors">
                              {masterPhone}
                            </a>
                          ) : null}
                          {masterEmail ? (
                            <a href={`mailto:${masterEmail}`} className="text-secondary underline decoration-secondary/50 underline-offset-2 hover:text-primary transition-colors">
                              {masterEmail}
                            </a>
                          ) : null}
                        </>
                      ) : null}
                      <a
                        href={personalInfo.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline decoration-secondary/50 underline-offset-2 hover:text-primary transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline decoration-secondary/50 underline-offset-2 hover:text-primary transition-colors"
                      >
                        manoukvandraanen.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Profile Summary
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                    {personalInfo.bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Languages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 print:grid-cols-3 gap-3 print:gap-2 text-xs font-mono">
                    {personalInfo.languages.map((language: { language: string; level: string }) => (
                      <div key={language.language} className="min-w-0 border border-outline-variant/60 bg-surface-container p-3 print:p-2">
                        <p className="font-semibold text-primary">{language.language}</p>
                        <p className="mt-1 text-secondary uppercase tracking-wider">{language.level}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Technical Competence
                  </h3>
                  <div className="flex flex-col gap-3 print:grid print:grid-cols-2 print:gap-x-6 print:gap-y-2 text-xs font-mono">
                    <div className="space-y-2 print:space-y-1">
                      {leftSkillGroups.map((cat) => (
                        <div key={cat.category} className="space-y-1">
                          <span className="text-secondary font-semibold uppercase">{cat.category}:</span>
                          <p className="text-on-surface-variant font-sans leading-snug">{cat.skills.map((s) => s.name).join(', ')}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 print:space-y-1">
                      {rightSkillGroups.map((cat) => (
                        <div key={cat.category} className="space-y-1">
                          <span className="text-secondary font-semibold uppercase">{cat.category}:</span>
                          <p className="text-on-surface-variant font-sans leading-snug">{cat.skills.map((s) => s.name).join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Professional Experience
                  </h3>

                  <div className="space-y-4">
                    {timelineEvents.map((event, idx) => {
                      const roleLocation = event.location?.trim();

                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-bold text-primary font-sans">{event.role}</h4>
                            <span className="text-xs font-mono text-secondary">{event.period}</span>
                          </div>
                          <span className="text-xs text-on-surface-variant font-medium font-mono">
                            {event.company}
                            {roleLocation ? ` | ${roleLocation}` : ''}
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
                      );
                    })}
                  </div>
                </div>

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
                          key={cert.name}
                          className="px-2 py-0.5 bg-surface-container border border-outline-variant rounded"
                        >
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @media print {
                @page {
                  size: A4 portrait;
                  margin: 0;
                }

                html,
                body {
                  width: 100% !important;
                  height: auto !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                  color: black !important;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }

                #root,
                #root > div {
                  height: auto !important;
                  width: auto !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }

                body {
                  overflow: visible !important;
                }

                nav, main, footer, button {
                  display: none !important;
                }

                #resume-modal-backdrop,
                #resume-modal-header {
                  display: none !important;
                }

                #resume-modal-wrapper {
                  position: static !important;
                  display: block !important;
                  padding: 0 !important;
                  z-index: auto !important;
                  background: white !important;
                }

                #resume-modal-container {
                  position: static !important;
                  width: 210mm !important;
                  height: auto !important;
                  max-width: none !important;
                  max-height: none !important;
                  border: none !important;
                  box-shadow: none !important;
                  background: white !important;
                  overflow: visible !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }

                #resume-printable-container {
                  background: white !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  overflow: visible !important;
                  display: block !important;
                  height: auto !important;
                }

                #resume-printable {
                  background: white !important;
                  color: black !important;
                  width: 210mm !important;
                  max-width: none !important;
                  padding: 8mm 14mm 10mm !important;
                  margin: 0 !important;
                  box-sizing: border-box !important;
                  font-family: Arial, Helvetica, sans-serif !important;
                  font-size: 10.7pt !important;
                  line-height: 1.18 !important;
                  overflow: visible !important;
                  height: auto !important;
                }

                #resume-printable > div {
                  page-break-inside: avoid;
                  break-inside: avoid-page;
                }

                #resume-printable .space-y-2 > * + *,
                #resume-printable .space-y-3 > * + *,
                #resume-printable .space-y-4 > * + *,
                #resume-printable .space-y-6 > * + *,
                #resume-printable .space-y-8 > * + * {
                  margin-top: 0.1cm !important;
                }

                #resume-printable .space-y-6,
                #resume-printable .space-y-8 {
                  margin-top: 0.1cm !important;
                  margin-bottom: 0.1cm !important;
                }

                #resume-printable .pb-6 {
                  padding-bottom: 0.24cm !important;
                }

                #resume-printable .grid {
                  gap: 0.12cm 0.2cm !important;
                }

                #resume-printable h1 {
                  font-size: 18pt !important;
                  line-height: 1.08 !important;
                  margin: 0 0 0.09cm !important;
                }

                #resume-printable h2 {
                  font-size: 11.1pt !important;
                  line-height: 1.12 !important;
                  margin: 0 0 0.07cm !important;
                }

                #resume-printable h3 {
                  font-size: 10.5pt !important;
                  line-height: 1.12 !important;
                  margin: 0 0 0.06cm !important;
                }

                #resume-printable h4 {
                  font-size: 10.3pt !important;
                  line-height: 1.12 !important;
                  margin: 0 !important;
                }

                #resume-printable p,
                #resume-printable li,
                #resume-printable span,
                #resume-printable a {
                  font-size: 10.1pt !important;
                  line-height: 1.2 !important;
                  overflow-wrap: anywhere !important;
                }

                #resume-printable a {
                  color: #b45309 !important;
                  text-decoration: underline !important;
                }

                #resume-printable ul {
                  margin-top: 0.04cm !important;
                  padding-left: 0.28cm !important;
                }

                #resume-printable li {
                  margin-bottom: 0.03cm !important;
                }

                #resume-printable {
                  page-break-after: avoid !important;
                  page-break-before: avoid !important;
                }
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
