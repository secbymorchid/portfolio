import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { ParallaxLayer } from '../components/common/ParallaxLayer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface IntroSceneProps {
  onPowerOn: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onPowerOn }) => {
  const prefersReduced = usePrefersReducedMotion();
  const powerSwitchRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and focus power switch
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    powerSwitchRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPowerOn();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full h-[100dvh] overflow-hidden select-none bg-deep-wood">
      {/* Background Room with Mouse Parallax Drift */}
      <ParallaxLayer factor={12} className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full scale-105">
          <Picture
            assetKey="scene0Room"
            priority={true}
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.08]"
          />

          {/* Lamp Warm Radial Glow with Low-Amplitude Flicker */}
          <div
            className="absolute top-[18%] left-[26%] w-[420px] h-[420px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 lamp-glow-anim"
            style={{
              background: 'radial-gradient(circle, rgba(255, 190, 90, 0.38) 0%, rgba(217, 140, 50, 0.18) 45%, transparent 75%)',
            }}
          />
        </div>
      </ParallaxLayer>

      {/* Soft Vignette Overlay */}
      <div className="scene-vignette" />

      {/* Center Stage: IBM Computer on Desk */}
      <main className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReduced ? 0.3 : 1.2, ease: [0.4, 0.0, 0.2, 1.0] }}
          className="relative flex flex-col items-center w-full max-w-lg md:max-w-2xl px-2"
        >
          {/* Clickable Computer Frame */}
          <div className="relative group w-full max-w-[320px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[680px] mx-auto">
            <Picture
              assetKey="ibmComputer"
              priority={true}
              className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] pointer-events-none select-none"
            />

            {/* Interactive Hotspot over the entire computer & power switch */}
            <button
              ref={powerSwitchRef}
              type="button"
              role="button"
              aria-label="Power on the computer to initialize Morchid Systems BIOS"
              onClick={onPowerOn}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full cursor-pointer rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-light focus-visible:ring-offset-4 focus-visible:ring-offset-deep-wood"
            >
              {/* Power Switch Area Red LED Indicator with 3s Idle Pulse aligned precisely on the monitor power toggle */}
              <div
                className="absolute w-3.5 h-4.5 sm:w-4 sm:h-5 md:w-5 md:h-6 rounded-sm bg-red-600/90 led-pulse transition-transform group-hover:scale-125 -translate-x-1/2 -translate-y-1/2"
                style={{ left: '73.1%', top: '42.8%' }}
                title="Power switch"
              />
            </button>
          </div>

          {/* Brass Caption beneath computer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 sm:mt-6 flex flex-col items-center text-center px-2 cursor-pointer"
            onClick={onPowerOn}
          >
            <div className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-sm border border-brass/50 bg-deep-wood/85 backdrop-blur-xs shadow-brass flex items-center gap-2 max-w-[90vw] hover:border-brass transition-colors">
              <span className="w-2 h-2 rounded-full bg-red-500 led-pulse shrink-0" />
              <p className="font-cormorant font-semibold text-base sm:text-lg md:text-xl text-parchment tracking-wide">
                Press the power switch to begin
              </p>
            </div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brass/70 mt-1.5 sm:mt-2">
              Moad Morchid · secbymorchid
            </span>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};
