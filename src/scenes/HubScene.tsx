import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { ParallaxLayer } from '../components/common/ParallaxLayer';
import { Case } from '../components/Case';
import { OWNER } from '../content/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '../assets';

interface HubSceneProps {
  onOpenCase: (scene: 'projects' | 'about' | 'contact') => void;
}

interface CaseItem {
  id: 'projects' | 'about' | 'contact';
  label: string;
  themeColor: 'cognac' | 'oxblood' | 'forest';
  closedAsset: keyof typeof ASSETS;
  openAsset: keyof typeof ASSETS;
}

const CASES: CaseItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    themeColor: 'cognac',
    closedAsset: 'caseProjectsClosed',
    openAsset: 'caseProjectsOpen',
  },
  {
    id: 'about',
    label: 'About',
    themeColor: 'oxblood',
    closedAsset: 'caseAboutClosed',
    openAsset: 'caseAboutOpen',
  },
  {
    id: 'contact',
    label: 'Contact',
    themeColor: 'forest',
    closedAsset: 'caseContactClosed',
    openAsset: 'caseContactOpen',
  },
];

export const HubScene: React.FC<HubSceneProps> = ({ onOpenCase }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [openingCase, setOpeningCase] = useState<'projects' | 'about' | 'contact' | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleSelectCase = (id: 'projects' | 'about' | 'contact') => {
    if (openingCase) return;
    setOpeningCase(id);

    const delay = prefersReduced ? 250 : 750;
    setTimeout(() => {
      onOpenCase(id);
    }, delay);
  };

  const nextMobileCase = () => {
    setActiveMobileIndex((prev) => (prev + 1) % CASES.length);
  };

  const prevMobileCase = () => {
    setActiveMobileIndex((prev) => (prev - 1 + CASES.length) % CASES.length);
  };

  const activeCase = CASES[activeMobileIndex];

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden select-none bg-deep-wood flex flex-col justify-between">
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
      <header className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-6 md:p-8 shrink-0">
        <div>
          <h1 className="font-cormorant text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment drop-shadow-md">
            {OWNER.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-brass font-bold">
              {OWNER.handle}
            </span>
            <span className="text-brass/60">·</span>
            <span className="font-serif italic text-xs sm:text-sm md:text-base text-parchment/80">
              {OWNER.headline}
            </span>
          </div>
        </div>

        {/* Mobile Segmented Switcher Pills (hidden on desktop) */}
        <div className="md:hidden flex items-center justify-center gap-1.5 mt-2.5">
          {CASES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveMobileIndex(idx)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider border transition-all duration-300 ${
                activeMobileIndex === idx
                  ? 'bg-brass/25 border-brass-light text-brass-light font-bold shadow-brass scale-105'
                  : 'bg-walnut/70 border-brass/30 text-parchment/60 hover:text-parchment'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Center Stage: The Console Table with Briefcases */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 min-h-0">
        <ParallaxLayer factor={16} className="w-full max-w-6xl">
          {/* Desktop View: All 3 Briefcases side-by-side */}
          <motion.div
            className="hidden md:flex flex-row items-center justify-center gap-6 lg:gap-10"
            animate={{
              scale: openingCase && !prefersReduced ? 1.08 : 1,
            }}
            transition={{ duration: prefersReduced ? 0.3 : 0.9, ease: [0.4, 0.0, 0.2, 1.0] }}
          >
            {CASES.map((c) => (
              <Case
                key={c.id}
                id={c.id}
                label={c.label}
                themeColor={c.themeColor}
                closedAsset={c.closedAsset}
                openAsset={c.openAsset}
                onSelect={handleSelectCase}
                isOpening={openingCase === c.id}
                disabled={!!openingCase}
              />
            ))}
          </motion.div>

          {/* Mobile View: Focused Single Briefcase Carousel with Arrows & Smooth Transitions */}
          <div className="md:hidden flex flex-col items-center justify-center w-full">
            <div className="relative w-full flex items-center justify-center px-1">
              {/* Prev Button */}
              <button
                type="button"
                onClick={prevMobileCase}
                aria-label="Previous case"
                className="absolute left-1 z-30 p-2 text-brass hover:text-brass-light active:scale-90 transition-transform bg-walnut/60 border border-brass/30 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Active Mobile Case with AnimatePresence */}
              <div className="w-full flex justify-center py-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-center"
                  >
                    <Case
                      id={activeCase.id}
                      label={activeCase.label}
                      themeColor={activeCase.themeColor}
                      closedAsset={activeCase.closedAsset}
                      openAsset={activeCase.openAsset}
                      onSelect={handleSelectCase}
                      isOpening={openingCase === activeCase.id}
                      disabled={!!openingCase}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextMobileCase}
                aria-label="Next case"
                className="absolute right-1 z-30 p-2 text-brass hover:text-brass-light active:scale-90 transition-transform bg-walnut/60 border border-brass/30 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Carousel Indicator Dots */}
            <div className="flex items-center gap-2 mt-2">
              {CASES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMobileIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx ? 'w-5 bg-brass' : 'w-1.5 bg-brass/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </main>

      {/* Footer Microcopy */}
      <footer className="relative z-30 pb-3 pt-1 text-center shrink-0">
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-brass/80 drop-shadow-sm"
        >
          Select a case to open it.
        </motion.p>
      </footer>
    </div>
  );
};
