import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroScene } from './scenes/IntroScene';
import { BootScene } from './scenes/BootScene';
import { HubScene } from './scenes/HubScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { AboutScene } from './scenes/AboutScene';
import { ContactScene } from './scenes/ContactScene';
import { PlainVersion } from './components/PlainVersion';
import { ASSETS } from './assets';
import { sceneVariants } from './motion';

export type SceneState = 'intro' | 'boot' | 'hub' | 'projects' | 'about' | 'contact';

export const App: React.FC = () => {
  // State machine: interactive experience only by default
  const [currentScene, setCurrentScene] = useState<SceneState>('intro');
  const [isPlainVersion, setIsPlainVersion] = useState<boolean>(false);

  // Preload Scene 1 assets during Scene 0
  useEffect(() => {
    const hubAssets = [
      ASSETS.hubRoom.webp,
      ASSETS.caseProjectsClosed.webp,
      ASSETS.caseAboutClosed.webp,
      ASSETS.caseContactClosed.webp,
    ];

    hubAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Preload remaining content assets when reaching Hub
  useEffect(() => {
    if (currentScene === 'hub') {
      const remainingAssets = [
        ASSETS.caseProjectsOpen.webp,
        ASSETS.caseAboutOpen.webp,
        ASSETS.caseContactOpen.webp,
        ASSETS.parchment.webp,
        ASSETS.waxSeal.webp,
        ASSETS.profile.webp,
      ];
      remainingAssets.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [currentScene]);

  // Persist plain version toggle in localStorage
  const handleTogglePlainVersion = () => {
    setIsPlainVersion((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('morchid_plain_version', String(next));
      } catch (err) {
        console.warn('LocalStorage unavailable for plain version toggle:', err);
      }
      return next;
    });
  };

  // Mark intro as seen in localStorage
  const markIntroSeen = () => {
    try {
      localStorage.setItem('morchid_has_seen_intro', 'true');
    } catch (err) {
      console.warn('LocalStorage unavailable for hasSeenIntro:', err);
    }
  };

  // Scene navigation handlers
  const handlePowerOn = () => {
    setCurrentScene('boot');
  };

  const handleBootComplete = () => {
    markIntroSeen();
    setCurrentScene('hub');
  };

  const handleTerminalNavigate = (scene: 'projects' | 'about' | 'contact') => {
    markIntroSeen();
    setCurrentScene(scene);
  };

  const handleOpenCase = (scene: 'projects' | 'about' | 'contact') => {
    setCurrentScene(scene);
  };

  const handleBackToStudy = () => {
    setCurrentScene('hub');
  };

  if (isPlainVersion) {
    return <PlainVersion onReturnToInteractive={handleTogglePlainVersion} />;
  }

  return (
    <div className="relative w-screen min-h-screen bg-deep-wood text-parchment overflow-x-hidden font-serif">
      {/* Subtle Film Grain Noise Overlay */}
      <div className="film-grain" />

      {/* State Machine Scenes with AnimatePresence */}
      <AnimatePresence mode="wait">
        {currentScene === 'intro' && (
          <motion.div
            key="scene-intro"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <IntroScene
              onPowerOn={handlePowerOn}
            />
          </motion.div>
        )}

        {currentScene === 'boot' && (
          <motion.div
            key="scene-boot"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <BootScene
              onComplete={handleBootComplete}
              onNavigate={handleTerminalNavigate}
            />
          </motion.div>
        )}

        {currentScene === 'hub' && (
          <motion.div
            key="scene-hub"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <HubScene
              onOpenCase={handleOpenCase}
            />
          </motion.div>
        )}

        {currentScene === 'projects' && (
          <motion.div
            key="scene-projects"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <ProjectsScene onBackToStudy={handleBackToStudy} />
          </motion.div>
        )}

        {currentScene === 'about' && (
          <motion.div
            key="scene-about"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <AboutScene onBackToStudy={handleBackToStudy} />
          </motion.div>
        )}

        {currentScene === 'contact' && (
          <motion.div
            key="scene-contact"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <ContactScene onBackToStudy={handleBackToStudy} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
