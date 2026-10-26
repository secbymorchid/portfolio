import { Transition } from 'framer-motion';

/**
 * Design System Motion Constants
 * Slow, weighty, dignified easing with zero bounce/spring overshoot.
 */

export const EASING_WEIGHTY = [0.4, 0.0, 0.2, 1.0] as const;
export const EASING_GENTLE = [0.25, 0.1, 0.25, 1.0] as const;

export const DURATIONS = {
  instant: 0.1,
  fast: 0.4,
  standard: 0.7,
  slow: 0.9,
  cameraPush: 1.4,
  sceneCrossfade: 0.8,
  caseLift: 0.7,
  staggerCard: 0.08,
} as const;

export const transitionWeighty: Transition = {
  duration: DURATIONS.standard,
  ease: EASING_WEIGHTY,
};

export const transitionSlow: Transition = {
  duration: DURATIONS.slow,
  ease: EASING_WEIGHTY,
};

export const transitionCameraPush: Transition = {
  duration: DURATIONS.cameraPush,
  ease: EASING_WEIGHTY,
};

export const transitionCrossfade: Transition = {
  duration: DURATIONS.sceneCrossfade,
  ease: EASING_WEIGHTY,
};

export const sceneVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitionCrossfade },
  exit: { opacity: 0, transition: transitionCrossfade },
};
