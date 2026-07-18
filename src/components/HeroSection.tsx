import { motion } from 'motion/react';
import { ArrowRight, Code, Terminal, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col justify-center items-center px-6 md:px-20 max-w-[1440px] mx-auto py-16 text-center select-none"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-10"
      >
        {/* Tag / Category */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-secondary/5 px-4 py-1.5 border border-secondary/15 rounded-full">
          <Terminal className="w-3.5 h-3.5 text-secondary" />
          <span className="font-mono text-[11px] font-semibold text-secondary uppercase tracking-widest">
            {personalInfo.subTitle}
          </span>
          <span className="w-1 h-1 bg-secondary rounded-full" />
          <span className="font-mono text-[11px] text-on-surface-variant">{personalInfo.activeStatus}</span>
        </motion.div>

        {/* Dynamic Titles */}
        <div className="space-y-4">
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl md:text-[84px] font-black text-primary leading-none tracking-tighter"
          >
            {personalInfo.name}
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="font-headline text-2xl md:text-4xl font-bold text-on-surface-variant tracking-tight"
          >
            {personalInfo.title}
          </motion.h2>
        </div>

        {/* Description Bio */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="shimmer-btn bg-primary text-on-primary font-mono text-xs font-semibold px-8 py-4 hover:bg-secondary transition-all duration-300 flex items-center gap-2 tracking-widest uppercase border border-transparent active:scale-95 cursor-pointer"
          >
            VIEW WORK
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => scrollToSection('about')}
            className="border border-primary text-primary font-mono text-xs font-semibold px-8 py-4 hover:border-secondary hover:text-secondary hover:bg-secondary-container/5 transition-all duration-300 tracking-widest uppercase active:scale-95 cursor-pointer"
          >
            CONTACT ME
          </button>
        </motion.div>

        {/* Micro Dashboard Details */}
        <motion.div
          variants={itemVariants}
          className="pt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-outline-variant/50 text-left font-mono"
        >
          <div>
            <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider">Expertise</span>
            <span className="text-xs text-primary font-semibold">.NET & React</span>
          </div>
          <div className="border-x border-outline-variant/50 px-4">
            <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider">Located</span>
            <span className="text-xs text-primary font-semibold">{personalInfo.location}</span>
          </div>
          <div className="pl-4">
            <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider">Experience</span>
            <span className="text-xs text-primary font-semibold">{personalInfo.experienceYears}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
