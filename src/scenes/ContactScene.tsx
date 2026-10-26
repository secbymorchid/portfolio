import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { BrassButton } from '../components/common/BrassButton';
import { OWNER } from '../content/content';
import { ArrowLeft, Mail, Github, Linkedin, Copy, Check, Send } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface ContactSceneProps {
  onBackToStudy: () => void;
}

export const ContactScene: React.FC<ContactSceneProps> = ({ onBackToStudy }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER.email);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  return (
    <div className="relative w-screen min-h-screen bg-deep-wood overflow-x-hidden flex flex-col justify-between">
      {/* Darkened Hub Room Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none opacity-20 filter blur-md">
        <Picture assetKey="hubRoom" className="w-full h-full object-cover object-center" />
      </div>

      {/* Soft Vignette */}
      <div className="scene-vignette" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 md:p-8 border-b border-brass/25 bg-walnut/70 backdrop-blur-sm gap-4">
        <BrassButton
          variant="outline"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBackToStudy}
          aria-label="Return to the study"
        >
          Back to the study
        </BrassButton>

        <div className="text-left sm:text-right">
          <div className="flex items-center sm:justify-end gap-2 text-brass font-mono text-xs uppercase tracking-widest font-bold">
            <Send className="w-3.5 h-3.5" />
            <span>03 · Contact</span>
          </div>
          <h1 className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
            Contact &amp; Connect
          </h1>
        </div>
      </header>

      {/* Central Content Stage: Parchment Letter with Wax Seal */}
      <main className="relative z-20 flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.3 : 0.8, ease: [0.4, 0.0, 0.2, 1.0] }}
          className="relative bg-parchment text-ink rounded-sm p-6 sm:p-10 md:p-14 shadow-2xl border-2 border-brass/50 overflow-hidden"
        >
          {/* Parchment Paper Texture Layer */}
          <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
            <Picture assetKey="parchment" className="w-full h-full object-cover" />
          </div>

          {/* Brass Corner Filigree */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brass pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brass pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brass pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brass pointer-events-none" />

          {/* Letterhead Header */}
          <div className="relative z-10 border-b-2 border-brass/40 pb-6 mb-8 text-center space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
              GET IN TOUCH
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-ink">
              Let's connect
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-ink/80 pt-2 max-w-lg mx-auto leading-relaxed">
              Feel free to reach out for cybersecurity, GRC, or engineering opportunities.
            </p>
          </div>

          {/* Selectable Email Display with Copy Button */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-walnut/10 border border-brass/30 p-3.5 sm:p-4 rounded-sm mb-8">
            <div className="flex items-center gap-3 overflow-hidden">
              <Mail className="w-5 h-5 text-brass shrink-0" />
              <span className="font-mono text-sm sm:text-base text-ink font-semibold select-all truncate">
                {OWNER.email}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider bg-ink text-parchment hover:bg-brass hover:text-ink transition-colors shrink-0 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
              aria-label="Copy email address to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Three Large Brass-Outline Buttons */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Email Button */}
            <a
              href={`mailto:${OWNER.email}`}
              className="group flex flex-col items-center justify-center p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <Mail className="w-6 h-6 text-brass group-hover:text-ink mb-2 transition-colors" />
              <span className="font-cormorant text-xl font-bold text-ink">Email</span>
              <span className="font-mono text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest mt-1">
                Send email
              </span>
            </a>

            {/* GitHub Button */}
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <Github className="w-6 h-6 text-brass group-hover:text-ink mb-2 transition-colors" />
              <span className="font-cormorant text-xl font-bold text-ink">GitHub</span>
              <span className="font-mono text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest mt-1">
                @secbymorchid
              </span>
            </a>

            {/* LinkedIn Button */}
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <Linkedin className="w-6 h-6 text-brass group-hover:text-ink mb-2 transition-colors" />
              <span className="font-cormorant text-xl font-bold text-ink">LinkedIn</span>
              <span className="font-mono text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest mt-1">
                Moad Morchid
              </span>
            </a>
          </div>

          {/* Letter Bottom: Aristocratic Wax Seal Stamp */}
          <div className="relative z-10 flex flex-col items-center pt-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg border-2 border-brass/40">
              <Picture
                assetKey="waxSeal"
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink/60 mt-3">
              Moad Morchid · secbymorchid
            </p>
          </div>
        </motion.div>
      </main>

      {/* Copy Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-ink border-2 border-brass-light text-parchment px-5 py-2.5 rounded shadow-2xl flex items-center gap-2.5 font-mono text-sm"
            role="status"
            aria-live="polite"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Email copied</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center border-t border-brass/15 bg-walnut/40">
        <p className="font-mono text-xs uppercase tracking-widest text-brass/70">
          Feel free to connect via email or LinkedIn
        </p>
      </footer>
    </div>
  );
};
