import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { personalInfo } from '../data';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch('https://formspree.io/f/xwpllwlw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);

        // Reset form
        setName('');
        setEmail('');
        setMessage('');

        // Auto clear success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const data = await response.json();
        const msg = data?.error || (data?.errors && data.errors.map((err: any) => err.message).join(', ')) || 'Submission failed.';
        setErrorMessage(msg);
        setShowError(true);
      }
    } catch (err) {
      console.error('Formspree error:', err);
      setErrorMessage('A network error occurred. Please try again.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="about" className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Info Col */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase text-secondary font-bold tracking-widest block">Inquiry</span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
              Let's build something exceptional.
            </h2>
            <p className="font-sans text-base text-on-surface-variant max-w-md leading-relaxed">
              Currently open to senior engineering opportunities, microservices architecture audits, and high-impact strategic collaborations.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 text-on-surface group cursor-pointer w-fit"
            >
              <div className="w-10 h-10 border border-outline-variant/60 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                <Mail className="w-4 h-4 text-secondary group-hover:rotate-6 transition-transform" />
              </div>
              <div>
                <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-mono">Direct Channel</span>
                <span className="font-mono text-sm group-hover:text-secondary transition-colors font-semibold">{personalInfo.email}</span>
              </div>
            </a>

            <div className="flex items-center gap-4 text-on-surface group w-fit">
              <div className="w-10 h-10 border border-outline-variant/60 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-mono">Location Base</span>
                <span className="font-mono text-sm font-semibold">{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Col */}
        <div className="relative">
          <div className="bg-surface-container p-8 border border-outline-variant hover:border-secondary transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase font-bold tracking-widest text-secondary block">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-transparent border-b-2 border-outline/30 focus:border-secondary outline-none py-2 transition-all duration-300 font-sans text-sm focus:pl-2 text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase font-bold tracking-widest text-secondary block">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@company.com"
                  className="w-full bg-transparent border-b-2 border-outline/30 focus:border-secondary outline-none py-2 transition-all duration-300 font-sans text-sm focus:pl-2 text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase font-bold tracking-widest text-secondary block">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your product or engineering needs..."
                  className="w-full bg-transparent border-b-2 border-outline/30 focus:border-secondary outline-none py-2 transition-all duration-300 font-sans text-sm resize-none focus:pl-2 text-primary leading-relaxed"
                />
              </div>

              {/* Success and Error Notices inside form */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-4 font-sans text-xs text-emerald-800 leading-relaxed"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block font-bold">Inquiry Sent Successfully!</strong>
                      Your message has been sent directly to my email via Formspree.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 font-sans text-xs text-red-800 leading-relaxed"
                  >
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <strong className="block font-bold">Failed to Send Message</strong>
                      {errorMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn w-full bg-primary disabled:opacity-50 text-on-primary font-mono font-bold text-xs py-4 hover:bg-secondary hover:shadow-lg active:scale-[0.98] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
