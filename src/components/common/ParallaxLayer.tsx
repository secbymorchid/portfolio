import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ParallaxLayerProps {
  factor?: number; // max offset in px (e.g. 12)
  className?: string;
  children: React.ReactNode;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  factor = 12,
  className = '',
  children,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      mouseX.set(normalizedX * factor);
      mouseY.set(normalizedY * factor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [factor, prefersReduced, mouseX, mouseY]);

  if (prefersReduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={layerRef}
      style={{ x: smoothX, y: smoothY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
