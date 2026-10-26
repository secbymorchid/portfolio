import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../content/content';
import { Picture } from './common/Picture';

interface FolderCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  isSpecialWorkshop?: boolean;
}

export const FolderCard = forwardRef<HTMLButtonElement, FolderCardProps>(
  ({ project, onSelect, isSpecialWorkshop = false }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        data-testid="folder-card"
        aria-label={`Open dossier for ${project.title}`}
        onClick={() => onSelect(project)}
        className={`group relative text-left w-full h-full rounded-sm p-5 md:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-card hover:shadow-brass focus-visible:ring-2 focus-visible:ring-brass-light outline-none border border-brass/40 ${
          isSpecialWorkshop
            ? 'bg-walnut/90 text-parchment border-dashed'
            : 'bg-parchment text-ink hover:-translate-y-1.5'
        }`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Parchment background texture overlay */}
        {!isSpecialWorkshop && (
          <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none">
            <Picture assetKey="parchment" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Brass corner accents */}
        <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-brass/70 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-brass/70 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-brass/70 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-brass/70 pointer-events-none" />

        {/* Top Header: Project Number & Wax Seal Tab */}
        <div className="relative z-10 flex items-center justify-between w-full border-b border-brass/30 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-cormorant font-bold text-base md:text-lg text-brass">
              PROJECT {project.number}
            </span>
          </div>

          {/* Mini Wax Seal Tab */}
          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 shadow-sm opacity-90 group-hover:scale-110 transition-transform">
            <Picture assetKey="waxSeal" className="w-full h-full object-cover mix-blend-multiply" />
          </div>
        </div>

        {/* Content: Title & Outcome */}
        <div className="relative z-10 flex-1 space-y-2">
          <h3 className="font-cormorant text-xl md:text-2xl font-bold leading-snug tracking-tight text-ink group-hover:text-cognac transition-colors">
            {project.title}
          </h3>
          <p className="font-serif text-sm md:text-base text-ink/80 leading-relaxed line-clamp-3">
            {project.oneLineOutcome}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="relative z-10 pt-4 mt-auto border-t border-brass/20 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-mono tracking-wide bg-walnut/10 text-ink/90 border border-brass/30 group-hover:border-brass/60"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-ink/60">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </motion.button>
    );
  }
);

FolderCard.displayName = 'FolderCard';
