import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Database, ShieldAlert, Trash2, KeyRound } from 'lucide-react';
import { Inquiry } from '../types';
import { personalInfo } from '../data';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Local storage inquiry state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load existing messages on mount
  useEffect(() => {
    const saved = localStorage.getItem('manouk_portfolio_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading inquiries', err);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate Network Delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        timestamp: new Date().toLocaleString(),
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('manouk_portfolio_inquiries', JSON.stringify(updated));

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form
      setName('');
      setEmail('');
      setMessage('');

      // Auto clear success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1200);
  };

  const deleteInquiry = (id: string) => {
    const filtered = inquiries.filter((item) => item.id !== id);
    setInquiries(filtered);
    localStorage.setItem('manouk_portfolio_inquiries', JSON.stringify(filtered));
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

          {/* Local State Database Viewer trigger */}
          {inquiries.length > 0 && (
            <div className="pt-6">
              <button
                onClick={() => setShowInbox(!showInbox)}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-outline-variant hover:border-secondary hover:text-secondary text-on-surface-variant font-mono text-xs transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{showInbox ? 'HIDE' : 'VIEW'} SUBMITTED INQUIRIES ({inquiries.length})</span>
              </button>
            </div>
          )}
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

              {/* Success Notice inside form */}
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
                      Your inquiry has been stored locally in browser sandbox memory. Use the view button to inspect.
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

      {/* Local Server Database Panel (Slides down below) */}
      <AnimatePresence>
        {showInbox && inquiries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-12 overflow-hidden border border-outline-variant bg-surface-container-low p-6 font-mono text-xs"
          >
            <div className="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-secondary" />
                <span className="font-bold uppercase">LOCAL PORTABLE DATABASE (BROWSER STATE)</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-semibold">SANDBOX MEMORY STORAGE</span>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {inquiries.map((item) => (
                <div key={item.id} className="border border-outline-variant p-4 bg-white space-y-2 relative group">
                  <button
                    onClick={() => deleteInquiry(item.id)}
                    className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-1"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex flex-wrap gap-x-4 text-[10px] text-secondary font-bold">
                    <span>ID: {item.id}</span>
                    <span>TIMESTAMP: {item.timestamp}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-primary font-bold">Sender: <span className="font-sans font-medium text-on-surface-variant">{item.name} ({item.email})</span></p>
                    <p className="text-primary font-bold">Payload Message:</p>
                    <p className="font-sans text-on-surface-variant text-xs leading-relaxed bg-surface-container-low/50 p-2.5 border-l-2 border-secondary/40">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
