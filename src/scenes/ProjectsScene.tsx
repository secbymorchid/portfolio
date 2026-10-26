import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { FolderCard } from '../components/FolderCard';
import { DetailPanel } from '../components/DetailPanel';
import { BrassButton } from '../components/common/BrassButton';
import { PROJECTS, Project } from '../content/content';
import { ArrowLeft, Briefcase, ExternalLink } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface ProjectsSceneProps {
  onBackToStudy: () => void;
}

export const ProjectsScene: React.FC<ProjectsSceneProps> = ({ onBackToStudy }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleSelectCard = (proj: Project) => {
    setSelectedProject(proj);
  };

  const handleCloseDetail = () => {
    const closedId = selectedProject?.id;
    setSelectedProject(null);
    if (closedId && cardRefs.current[closedId]) {
      // Return focus to the originating card for accessibility
      setTimeout(() => {
        cardRefs.current[closedId]?.focus();
      }, 50);
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-deep-wood overflow-x-hidden flex flex-col justify-between">
      {/* Darkened, Blurred Hub Room Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none opacity-20 filter blur-md">
        <Picture assetKey="hubRoom" className="w-full h-full object-cover object-center" />
      </div>

      {/* Soft Vignette */}
      <div className="scene-vignette" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex flex-row items-center justify-between p-3 sm:p-6 md:p-8 border-b border-brass/25 bg-walnut/70 backdrop-blur-sm gap-2">
        {/* Back to the Study Brass Button */}
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

        {/* Title Heading */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-brass font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>01 · Projects</span>
          </div>
          <h1 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-parchment leading-tight">
            Projects &amp; Tooling
          </h1>
        </div>
      </header>

      {/* Central Stage: Open Briefcase Container */}
      <main className="relative z-20 flex-1 max-w-7xl w-full mx-auto p-2.5 sm:p-6 md:p-8 flex flex-col justify-center">
        {/* Case Open Frame & Archival Card Grid */}
        <div className="relative rounded-lg p-3 sm:p-6 md:p-8 bg-walnut/90 border border-brass/40 shadow-2xl overflow-hidden">
          {/* Subtle Leather Texture Background Inside Briefcase */}
          <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
            <Picture assetKey="leatherGrain" className="w-full h-full object-cover" />
          </div>

          {/* Brass Case Interior Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-brass/30 pb-3 mb-4 sm:mb-6 gap-2">
            <div>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brass font-bold">
                PROJECTS
              </span>
              <p className="font-serif italic text-xs sm:text-sm text-parchment/80">
                Security tooling, automated pipelines, and technical labs.
              </p>
            </div>
            <a
              href="https://github.com/secbymorchid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-brass-light hover:underline shrink-0"
            >
              <span>Explore all on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Dossier Grid with Staggered Entrance */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 max-h-[64vh] overflow-y-auto pr-1">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.2 : 0.6,
                  delay: prefersReduced ? 0 : idx * 0.08,
                  ease: [0.4, 0.0, 0.2, 1.0],
                }}
                className="h-full"
              >
                <FolderCard
                  ref={(el) => { cardRefs.current[project.id] = el; }}
                  project={project}
                  index={idx}
                  onSelect={handleSelectCard}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Expansion Panel */}
      <DetailPanel project={selectedProject} onClose={handleCloseDetail} />

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center border-t border-brass/15 bg-walnut/40">
        <p className="font-mono text-xs uppercase tracking-widest text-brass/70">
          Click any project card to view technical details
        </p>
      </footer>
    </div>
  );
};
