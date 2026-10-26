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
      <header className="relative z-30 flex flex-row items-center justify-between p-3 sm:p-6 md:p-8 border-b border-brass/25 bg-walnut/70 backdrop-blur-sm gap-2">
        <BrassButton
          variant="outline"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBackToStudy}
          aria-label="Return to the study"
        >
          <span className="hidden sm:inline">Back to the study</span>
          <span className="sm:hidden">Study</span>
        </BrassButton>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-brass font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>03 · Contact</span>
          </div>
          <h1 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-parchment leading-tight">
            Contact &amp; Connect
          </h1>
        </div>
      </header>

      {/* Central Content Stage: Parchment Letter with Wax Seal */}
      <main className="relative z-20 flex-1 max-w-3xl w-full mx-auto p-2.5 sm:p-6 md:p-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.3 : 0.8, ease: [0.4, 0.0, 0.2, 1.0] }}
          className="relative bg-parchment text-ink rounded-sm p-4 sm:p-10 md:p-14 shadow-2xl border-2 border-brass/50 overflow-hidden"
        >
          {/* Parchment Paper Texture Layer */}
          <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
            <Picture assetKey="parchment" className="w-full h-full object-cover" />
          </div>

          {/* Brass Corner Filigree */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-brass pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-brass pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-brass pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-brass pointer-events-none" />

          {/* Letterhead Header */}
          <div className="relative z-10 border-b-2 border-brass/40 pb-4 sm:pb-6 mb-5 sm:mb-8 text-center space-y-1">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brass font-bold">
              GET IN TOUCH
            </span>
            <h2 className="font-cormorant text-2xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
              Let's connect
            </h2>
            <p className="font-serif italic text-xs sm:text-base text-ink/80 pt-1 sm:pt-2 max-w-lg mx-auto leading-relaxed">
              Feel free to reach out for cybersecurity, GRC, or engineering opportunities.
            </p>
          </div>

          {/* Selectable Email Display with Copy Button */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-walnut/10 border border-brass/30 p-3 sm:p-4 rounded-sm mb-5 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto justify-center sm:justify-start">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brass shrink-0" />
              <span className="font-mono text-xs sm:text-base text-ink font-semibold select-all break-all text-center">
                {OWNER.email}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider bg-ink text-parchment hover:bg-brass hover:text-ink transition-colors shrink-0 shadow-sm focus-visible:ring-2 focus-visible:ring-brass cursor-pointer"
              aria-label="Copy email address to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Three Large Brass-Outline Buttons */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
            {/* Email Button */}
            <a
              href={`mailto:${OWNER.email}`}
              className="group flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <div className="flex items-center sm:flex-col gap-2.5 sm:gap-1">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-brass group-hover:text-ink sm:mb-2 transition-colors shrink-0" />
                <span className="font-cormorant text-lg sm:text-xl font-bold text-ink">Email</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest sm:mt-1">
                Send email &rarr;
              </span>
            </a>

            {/* GitHub Button */}
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <div className="flex items-center sm:flex-col gap-2.5 sm:gap-1">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-brass group-hover:text-ink sm:mb-2 transition-colors shrink-0" />
                <span className="font-cormorant text-lg sm:text-xl font-bold text-ink">GitHub</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest sm:mt-1">
                @secbymorchid &rarr;
              </span>
            </a>

            {/* LinkedIn Button */}
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-5 rounded border border-brass/60 bg-white/40 hover:bg-brass hover:text-ink hover:border-brass-light transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-brass"
            >
              <div className="flex items-center sm:flex-col gap-2.5 sm:gap-1">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-brass group-hover:text-ink sm:mb-2 transition-colors shrink-0" />
                <span className="font-cormorant text-lg sm:text-xl font-bold text-ink">LinkedIn</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-ink/70 group-hover:text-ink/90 uppercase tracking-widest sm:mt-1">
                Moad Morchid &rarr;
              </span>
            </a>
          </div>

          {/* Letter Bottom: Aristocratic Wax Seal Stamp */}
          <div className="relative z-10 flex flex-col items-center pt-1">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg border-2 border-brass/40">
              <Picture
                assetKey="waxSeal"
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-ink/60 mt-2 sm:mt-3">
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
