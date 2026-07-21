import { MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { personalInfo, timelineEvents, skillsData, education } from '../data';

export function getCvFileName() {
  return `${personalInfo.name.toUpperCase().replace(/\s+/g, '_')}_CV_2026.PDF`;
}

interface ResumeDocumentProps {
  className?: string;
  rootId?: string;
}

export default function ResumeDocument({ className = '', rootId = 'resume-export-source' }: ResumeDocumentProps) {
  const portfolioUrl = 'https://manoukvandraanen.com/';
  const linkedinDisplayUrl = personalInfo.socials.linkedin.replace(/^https?:\/\//i, '');
  const portfolioDisplayUrl = portfolioUrl.replace(/^https?:\/\//i, '');
  const masterResumeEnabled = import.meta.env.DEV && import.meta.env.VITE_RESUME_MASTER_ENABLED?.toLowerCase() === 'true';
  const masterPhone = (import.meta.env.VITE_RESUME_MASTER_PHONE || '').trim();
  const masterEmail = (import.meta.env.VITE_RESUME_MASTER_EMAIL || '').trim();
  const shouldShowMasterContact = masterResumeEnabled && Boolean(masterPhone || masterEmail);
  const leftSkillGroups = skillsData.filter(({ category }) => ['frontend', 'tools'].includes(category.toLowerCase()));
  const rightSkillGroups = skillsData.filter(({ category }) => ['backend', 'cloud'].includes(category.toLowerCase()));

  return (
    <div id={rootId} className={`resume-document ${className}`.trim()}>
      <div className="resume-section border-b border-outline-variant pb-6">
        <div className="resume-header-layout relative">
          <div className="resume-header-main min-w-0 space-y-2">
            <div className="resume-header-title-block pr-24">
              <h1 className="font-headline text-2xl sm:text-4xl font-extrabold tracking-tighter text-primary">{personalInfo.name}</h1>
              <h2 className="font-headline text-base sm:text-lg font-semibold uppercase tracking-wider text-secondary">{personalInfo.title}</h2>
            </div>

            <div className="pt-2 text-xs font-mono text-on-surface-variant">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  {personalInfo.location}
                </span>
              </div>
              <div className="resume-contact-links mt-2 flex gap-x-6 gap-y-2">
                {shouldShowMasterContact ? (
                  <>
                    {masterPhone ? (
                      <a href={`tel:${masterPhone}`} className="text-secondary underline decoration-secondary/50 underline-offset-2 transition-colors">
                        {masterPhone}
                      </a>
                    ) : null}
                    {masterEmail ? (
                      <a href={`mailto:${masterEmail}`} className="text-secondary underline decoration-secondary/50 underline-offset-2 transition-colors">
                        {masterEmail}
                      </a>
                    ) : null}
                  </>
                ) : null}
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline decoration-secondary/50 underline-offset-2 transition-colors"
                >
                  {linkedinDisplayUrl}
                </a>
              </div>
            </div>
          </div>

          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-portfolio-qr absolute top-0 right-0 flex flex-col items-center gap-0.5 pt-0 text-center no-underline"
          >
            <QRCodeSVG
              value={portfolioUrl}
              size={58}
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#111111"
              className="mx-auto block"
              title={`QR code for ${portfolioDisplayUrl}`}
            />
            <span className="block text-[4px] leading-none font-mono font-normal uppercase tracking-[0.04em] text-center text-on-surface-variant/40">
              [ Digital Portfolio ]
            </span>
          </a>
        </div>
      </div>

      <div className="resume-section resume-section-block space-y-2">
        <h3 className="resume-section-heading font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Profile Summary
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed font-sans">{personalInfo.bio}</p>
      </div>

      <div className="resume-section resume-section-block space-y-2">
        <h3 className="resume-section-heading font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Languages
        </h3>
        <div className="resume-languages-grid grid grid-cols-3 gap-3 text-xs font-mono">
          {personalInfo.languages.map((language: { language: string; level: string }) => (
            <div key={language.language} className="min-w-0 border border-outline-variant/60 bg-surface-container p-3">
              <p className="font-semibold text-primary">{language.language}</p>
              <p className="mt-1 text-secondary uppercase tracking-wider">{language.level}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="resume-section resume-section-block space-y-3">
        <h3 className="resume-section-heading font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Technical Competence
        </h3>
        <div className="resume-competence-grid grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-mono">
          <div className="space-y-2">
            {leftSkillGroups.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <span className="text-secondary font-semibold uppercase">{cat.category}:</span>
                <p className="text-on-surface-variant font-sans leading-snug">{cat.skills.map((s) => s.name).join(', ')}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {rightSkillGroups.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <span className="text-secondary font-semibold uppercase">{cat.category}:</span>
                <p className="text-on-surface-variant font-sans leading-snug">{cat.skills.map((s) => s.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="resume-section resume-section-block resume-section-experience space-y-4">
        <h3 className="resume-section-heading font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Professional Experience
        </h3>

        <div className="resume-role-list space-y-4">
          {timelineEvents.map((event, idx) => {
            const roleLocation = event.location?.trim();

            return (
              <div key={idx} className="resume-role space-y-1">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-sm font-bold text-primary font-sans">{event.role}</h4>
                  <span className="text-xs font-mono text-secondary whitespace-nowrap">{event.period}</span>
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

      <div className="resume-section resume-section-block space-y-2">
        <h3 className="resume-section-heading font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary rotate-45" /> Education & Certifications
        </h3>
        <div className="space-y-2 text-xs font-sans">
          <div className="flex justify-between gap-4">
            <div>
              <strong className="text-primary font-sans">{education.degree}</strong>
              <p className="text-on-surface-variant font-mono text-[11px]">{education.institution}</p>
            </div>
            <span className="font-mono text-secondary whitespace-nowrap">{education.period}</span>
          </div>
          <div className="pt-1 flex flex-wrap gap-2 text-[10px] font-mono">
            {education.certifications.map((cert) => (
              <span key={cert.name} className="px-2 py-0.5 bg-surface-container border border-outline-variant rounded">
                {cert.name} • {cert.issuer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}