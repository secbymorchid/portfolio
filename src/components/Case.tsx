import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Picture } from './common/Picture';
import { ASSETS } from '../assets';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface CaseProps {
  id: 'projects' | 'about' | 'contact';
  label: string;
  themeColor: 'cognac' | 'oxblood' | 'forest';
  closedAsset: keyof typeof ASSETS;
  openAsset: keyof typeof ASSETS;
  onSelect: (id: 'projects' | 'about' | 'contact') => void;
  isOpening: boolean;
  disabled?: boolean;
}

export const Case: React.FC<CaseProps> = ({
  id,
  label,
  themeColor,
  closedAsset,
  openAsset,
  onSelect,
  isOpening,
  disabled = false,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const themeBorderClasses = {
    cognac: 'border-cognac/60 group-hover:border-brass',
    oxblood: 'border-oxblood/60 group-hover:border-brass',
    forest: 'border-forest/60 group-hover:border-brass',
  }[themeColor];

  const themePillClasses = {
    cognac: 'bg-cognac/30 text-amber-200 border-brass/50',
    oxblood: 'bg-oxblood/30 text-rose-200 border-brass/50',
    forest: 'bg-forest/30 text-emerald-200 border-brass/50',
  }[themeColor];

  const handleClick = () => {
    if (disabled || isOpening) return;
    onSelect(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Open ${label} briefcase`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative flex flex-col items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brass-light focus-visible:ring-offset-4 focus-visible:ring-offset-deep-wood rounded-lg p-2 transition-transform duration-500"
      animate={{
        y: isOpening ? -16 : isHovered ? -8 : 0,
        scale: isOpening ? 1.05 : 1,
      }}
      transition={{
        duration: prefersReduced ? 0.2 : 0.6,
        ease: [0.4, 0.0, 0.2, 1.0],
      }}
    >
      {/* 3D Briefcase Container */}
      <div
        className="relative w-[250px] xs:w-[270px] sm:w-72 md:w-64 lg:w-72 xl:w-80 aspect-[4/3] rounded-md overflow-hidden bg-transparent drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
        style={{ perspective: prefersReduced ? 'none' : '1200px' }}
      >
        {/* Closed Case Image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            opacity: isOpening ? 0 : 1,
            rotateX: isOpening && !prefersReduced ? -35 : 0,
          }}
          transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: [0.4, 0.0, 0.2, 1.0] }}
          style={{ transformOrigin: 'top center' }}
        >
          <Picture
            assetKey={closedAsset}
            className="w-full h-full object-contain filter contrast-[1.03] drop-shadow-md"
          />

          {/* Brass Clasps Flash / Glint sweep on hover */}
          {isHovered && !isOpening && !prefersReduced && (
            <div className="glint-effect animate-[glint-sweep_1.2s_ease-in-out_infinite]" />
          )}
        </motion.div>

        {/* Open Case Image Crossfade */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpening ? 1 : 0,
          }}
          transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: [0.4, 0.0, 0.2, 1.0] }}
        >
          <Picture
            assetKey={openAsset}
            className="w-full h-full object-contain filter contrast-[1.03]"
          />
        </motion.div>

        {/* Clasp Flash on Opening */}
        {isOpening && (
          <motion.div
            className="absolute inset-0 bg-brass/30 pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>

      {/* Brass Case Plaque / Label */}
      <div className="mt-4 flex flex-col items-center">
        <div
          className={`px-5 py-1.5 rounded-sm border ${themeBorderClasses} ${themePillClasses} transition-all duration-500 shadow-sm flex items-center gap-2 group-hover:scale-105 group-hover:shadow-brass`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brass group-hover:bg-brass-light animate-pulse" />
          <h2 className="font-cormorant text-xl md:text-2xl font-bold tracking-wider text-parchment group-hover:text-white">
            {label}
          </h2>
          <span className="w-1.5 h-1.5 rounded-full bg-brass group-hover:bg-brass-light animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
