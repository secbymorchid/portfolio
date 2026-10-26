import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { ParallaxLayer } from '../components/common/ParallaxLayer';
import { Case } from '../components/Case';
import { OWNER } from '../content/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HubSceneProps {
  onOpenCase: (scene: 'projects' | 'about' | 'contact') => void;
}

export const HubScene: React.FC<HubSceneProps> = ({ onOpenCase }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [openingCase, setOpeningCase] = useState<'projects' | 'about' | 'contact' | null>(null);

  const handleSelectCase = (id: 'projects' | 'about' | 'contact') => {
    if (openingCase) return;
    setOpeningCase(id);

    const delay = prefersReduced ? 300 : 900;
    setTimeout(() => {
      onOpenCase(id);
    }, delay);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden md:h-screen md:overflow-hidden select-none bg-deep-wood flex flex-col justify-between">
      {/* Background Room with Slow Parallax Layer */}
      <ParallaxLayer factor={8} className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          className="relative w-full h-full scale-105"
          animate={{
            scale: openingCase && !prefersReduced ? 1.35 : 1.05,
            opacity: openingCase ? 0.35 : 0.85,
          }}
          transition={{ duration: prefersReduced ? 0.3 : 0.9, ease: [0.4, 0.0, 0.2, 1.0] }}
        >
          <Picture
            assetKey="hubRoom"
            priority={true}
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          />
        </motion.div>
      </ParallaxLayer>

      {/* Soft Vignette Overlay */}
      <div className="scene-vignette" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-10 gap-4">
        <div>
          <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment drop-shadow-md">
            {OWNER.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
              {OWNER.handle}
            </span>
            <span className="text-brass/60">·</span>
            <span className="font-serif italic text-sm md:text-base text-parchment/80">
              {OWNER.headline}
            </span>
          </div>
        </div>
      </header>

      {/* Center Stage: The Console Table with 3 Briefcases */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-0">
        <ParallaxLayer factor={16} className="w-full max-w-6xl">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-10"
            animate={{
              scale: openingCase && !prefersReduced ? 1.08 : 1,
            }}
            transition={{ duration: prefersReduced ? 0.3 : 0.9, ease: [0.4, 0.0, 0.2, 1.0] }}
          >
            {/* Case 1: Projects (Cognac) */}
            <Case
              id="projects"
              label="Projects"
              themeColor="cognac"
              closedAsset="caseProjectsClosed"
              openAsset="caseProjectsOpen"
              onSelect={handleSelectCase}
              isOpening={openingCase === 'projects'}
              disabled={!!openingCase}
            />

            {/* Case 2: About (Oxblood) */}
            <Case
              id="about"
              label="About"
              themeColor="oxblood"
              closedAsset="caseAboutClosed"
              openAsset="caseAboutOpen"
              onSelect={handleSelectCase}
              isOpening={openingCase === 'about'}
              disabled={!!openingCase}
            />

            {/* Case 3: Contact (Forest) */}
            <Case
              id="contact"
              label="Contact"
              themeColor="forest"
              closedAsset="caseContactClosed"
              openAsset="caseContactOpen"
              onSelect={handleSelectCase}
              isOpening={openingCase === 'contact'}
              disabled={!!openingCase}
            />
          </motion.div>
        </ParallaxLayer>
      </main>

      {/* Footer Microcopy */}
      <footer className="relative z-30 pb-6 pt-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-widest text-brass/80 drop-shadow-sm"
        >
          Select a case to open it.
        </motion.p>
      </footer>
    </div>
  );
};
