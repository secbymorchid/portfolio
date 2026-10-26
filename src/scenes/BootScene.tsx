import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { Terminal } from '../components/Terminal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface BootSceneProps {
  onComplete: () => void;
  onNavigate: (scene: 'projects' | 'about' | 'contact') => void;
}

export const BootScene: React.FC<BootSceneProps> = ({ onComplete, onNavigate }) => {
  const prefersReduced = usePrefersReducedMotion();

  // Strictly lock body scroll during boot to avoid any page dropping or jitter
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full h-[100dvh] overflow-hidden bg-black select-none flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Background Room Subtle Ambient Blur */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: prefersReduced ? 1 : 1.8, opacity: prefersReduced ? 0.15 : 0.1 }}
        transition={{ duration: prefersReduced ? 0.3 : 1.2, ease: [0.4, 0.0, 0.2, 1.0] }}
        style={{ transformOrigin: '50% 50%' }}
      >
        <Picture
          assetKey="scene0Room"
          className="w-full h-full object-cover object-center filter blur-sm"
        />
      </motion.div>

      {/* CRT Monitor Enclosure & Screen Area */}
      <motion.div
        className="relative z-10 w-full max-w-3xl h-[min(86vh,540px)] flex flex-col items-center justify-center"
        initial={{ scale: prefersReduced ? 1 : 0.85, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: prefersReduced ? 0.3 : 0.9, ease: [0.4, 0.0, 0.2, 1.0] }}
      >
        {/* Vintage IBM 5151 CRT Bezel Frame */}
        <div className="relative w-full h-full bg-[#1e1a15] rounded-xl p-3 sm:p-5 shadow-[0_0_80px_rgba(0,0,0,0.95)] border-4 border-[#3a3228] flex flex-col box-border">
          {/* Top monitor branding */}
          <div className="flex items-center justify-between pb-2 px-2 border-b border-[#352f26] text-[11px] font-mono text-[#a89678] uppercase tracking-widest shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-parchment/90">IBM 5151</span>
              <span className="text-[#655848]">|</span>
              <span>MORCHID SYSTEMS 5150</span>
            </div>
            <span className="flex items-center gap-1.5 text-phosphor">
              <span className="w-2 h-2 rounded-full bg-phosphor animate-pulse" />
              ONLINE · PHOSPHOR P1
            </span>
          </div>

          {/* CRT Curved Screen Glass */}
          <div className="relative flex-1 min-h-0 w-full mt-2 rounded-lg overflow-hidden bg-black border-2 border-[#120f0b] shadow-[inset_0_0_35px_rgba(0,0,0,0.95)] flex flex-col">
            {/* CRT Bloom / Glow Background */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.6 }}
            >
              <Picture assetKey="crtGlow" className="w-full h-full object-cover" />
            </motion.div>

            {/* Terminal Monospace Text Component */}
            <Terminal onComplete={onComplete} onNavigate={onNavigate} />

            {/* CRT Glass Reflection & Scanlines */}
            <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-40" />
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.85) 100%)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
