import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../content/content';
import { Picture } from './common/Picture';
import { BrassButton } from './common/BrassButton';
import { ExternalLink, X, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface DetailPanelProps {
  project: Project | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ project, onClose }) => {
  const prefersReduced = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-deep-wood/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-panel-title"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Dossier Detail Card */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95, y: prefersReduced ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.95, y: prefersReduced ? 0 : 20 }}
            transition={{ duration: prefersReduced ? 0.2 : 0.5, ease: [0.4, 0.0, 0.2, 1.0] }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-parchment text-ink rounded-sm shadow-2xl border-2 border-brass/60 flex flex-col overflow-hidden"
          >
            {/* Archival Parchment Texture */}
            <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
              <Picture assetKey="parchment" className="w-full h-full object-cover" />
            </div>

            {/* Brass Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brass pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brass pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brass pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brass pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-brass/40 px-4 sm:px-6 py-3 sm:py-4 bg-walnut/10">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 shadow-sm">
                  <Picture assetKey="waxSeal" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brass font-bold">
                    PROJECT {project.number} · OVERVIEW
                  </span>
                  <h2 id="detail-panel-title" className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-ink leading-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project modal"
                className="p-1.5 sm:p-2 rounded bg-ink/5 hover:bg-ink/15 text-ink/70 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-brass shrink-0 ml-2"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(92vh-130px)]">
              {/* Problem Solved */}
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brass flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4" /> Problem Solved
                </h3>
                <p className="font-serif text-sm sm:text-base md:text-lg text-ink/90 leading-relaxed bg-white/40 p-3 sm:p-4 rounded border-l-4 border-cognac shadow-sm">
                  {project.problemSolved}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brass flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4" /> Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white/30 p-2.5 sm:p-3 rounded text-xs sm:text-sm text-ink/90 border border-brass/20">
                      <span className="text-brass font-bold font-mono">0{idx + 1}.</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Diagram / Execution Slot */}
              {project.architectureSlot && (
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-brass flex items-center gap-1.5 font-bold">
                    <Cpu className="w-4 h-4" /> System Architecture
                  </h3>
                  <div className="bg-ink/95 text-parchment p-3 sm:p-4 rounded font-mono text-[11px] sm:text-xs md:text-sm overflow-x-auto border border-brass/40 shadow-inner">
                    <code>{project.architectureSlot}</code>
                  </div>
                </div>
              )}

              {/* GRC Angle */}
              <div className="space-y-1.5 sm:space-y-2 bg-forest/10 p-3 sm:p-4 rounded border border-forest/30">
                <h3 className="font-mono text-xs uppercase tracking-widest text-forest font-bold">
                  GRC Angle &amp; Alignment
                </h3>
                <p className="font-serif text-xs sm:text-sm md:text-base text-ink font-medium">
                  {project.grcAngle}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded bg-walnut/15 text-ink text-[11px] sm:text-xs font-mono border border-brass/40 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with GitHub action */}
            <div className="relative z-10 border-t border-brass/30 px-4 sm:px-6 py-3 sm:py-4 bg-walnut/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-serif text-xs text-ink/70 hidden sm:inline">
                Verified repository on GitHub
              </span>
              <div className="w-full sm:w-auto flex items-center justify-end">
                <BrassButton
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                  icon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => window.open(project.repoUrl, '_blank', 'noopener,noreferrer')}
                >
                  View on GitHub
                </BrassButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
