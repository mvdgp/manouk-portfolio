import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { personalInfo, skillsData } from '../data';

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; desc: string } | null>(null);
  const [evalMode, setEvalMode] = useState(false);

  return (
    <section id="skills" className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block">Capabilities</span>
        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary">Technical Competency</h2>

        {/* Dynamic Mode Switcher */}
        <div className="inline-flex border border-outline-variant p-1 bg-surface-container-low select-none mt-4">
          <button
            onClick={() => setEvalMode(false)}
            className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              !evalMode
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            GRID DIRECTORY
          </button>
          <button
            onClick={() => setEvalMode(true)}
            className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              evalMode
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            PROFICIENCY RATINGS
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!evalMode ? (
          /* Standard Grid Layout */
          <motion.div
            key="grid-dir"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {skillsData.map((cat) => (
              <div
                key={cat.category}
                className="border-l border-outline-variant pl-6 space-y-4 hover:border-secondary transition-colors duration-300 group"
              >
                <h3 className="font-mono text-xs text-secondary uppercase tracking-widest font-bold mb-6">
                  {cat.category}
                </h3>
                <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill({ name: skill.name, desc: skill.description })}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="hover:text-primary transition-all duration-200 cursor-help flex items-center group/item relative"
                    >
                      {/* Custom Square Bullet */}
                      <span className="w-1.5 h-1.5 bg-secondary rotate-45 mr-3 group-hover/item:scale-150 transition-transform duration-200" />
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ) : (
          /* High Fidelity Proficiency Bars with Detailed descriptions */
          <motion.div
            key="prof-bars"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillsData.map((cat) => (
              <div
                key={cat.category}
                className="border border-outline-variant/60 p-6 bg-surface-container-low space-y-6"
              >
                <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary flex items-center justify-between border-b border-outline-variant pb-2">
                  <span>{cat.category} Core</span>
                  <GraduationCap className="w-4 h-4 text-secondary" />
                </h3>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-primary font-bold">{skill.name}</span>
                        <span className="text-secondary font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Bar Container */}
                      <div className="h-1.5 bg-surface-container-high relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="absolute h-full bg-secondary"
                        />
                      </div>
                      <p className="text-[11px] font-sans text-on-surface-variant leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 border-t border-outline-variant/40 pt-8">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h3 className="font-mono text-xs uppercase tracking-widest text-secondary font-bold mb-4">Languages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalInfo.languages.map((language: { language: string; level: string; details?: string }) => (
              <motion.div
                key={language.language}
                whileHover={{ y: -6, scale: 1.01, boxShadow: '0 18px 40px -20px rgba(0, 0, 0, 0.22)' }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className="group border border-outline-variant/60 bg-surface-container-low p-4 hover:border-secondary transition-all duration-300 ease-out"
              >
                <p className="font-headline text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-secondary">{language.language}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-secondary">{language.level}</p>
                {language.details ? (
                  <p className="mt-2 text-sm text-on-surface-variant font-sans transition-colors duration-300 group-hover:text-primary">{language.details}</p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Hover Helper Pane (Desktop Only) */}
      {!evalMode && (
        <div className="hidden md:block h-14 mt-12 border-t border-outline-variant/40 pt-4 text-center font-mono text-xs">
          {hoveredSkill ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-on-surface-variant inline-flex items-center gap-2 max-w-xl mx-auto"
            >
              <span className="text-secondary font-bold">[{hoveredSkill.name}]:</span>
              <span className="font-sans text-on-surface-variant">{hoveredSkill.desc}</span>
            </motion.div>
          ) : (
            <span className="text-on-surface-variant/50">Hover over any skill to inspect focus areas.</span>
          )}
        </div>
      )}
    </section>
  );
}
