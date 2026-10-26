import React from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/common/Picture';
import { BrassButton } from '../components/common/BrassButton';
import { OWNER, SKILL_CATEGORIES, EDUCATION_TIMELINE, FRAMEWORKS_TRAY } from '../content/content';
import { ArrowLeft, Award, FileText, Compass, Shield, Cpu } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface AboutSceneProps {
  onBackToStudy: () => void;
}

export const AboutScene: React.FC<AboutSceneProps> = ({ onBackToStudy }) => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="relative w-screen min-h-screen bg-deep-wood overflow-x-hidden flex flex-col justify-between">
      {/* Darkened Hub Room Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none opacity-20 filter blur-md">
        <Picture assetKey="hubRoom" className="w-full h-full object-cover object-center" />
      </div>

      {/* Soft Vignette */}
      <div className="scene-vignette" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 md:p-8 border-b border-brass/25 bg-walnut/70 backdrop-blur-sm gap-4">
        <BrassButton
          variant="outline"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBackToStudy}
          aria-label="Return to the study"
        >
          Back to the study
        </BrassButton>

        <div className="text-left sm:text-right">
          <div className="flex items-center sm:justify-end gap-2 text-brass font-mono text-xs uppercase tracking-widest font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>02 · About</span>
          </div>
          <h1 className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
            About
          </h1>
        </div>
      </header>

      {/* Central Content Stage */}
      <main className="relative z-20 flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-10 space-y-12">
        {/* Stage Container */}
        <div className="relative rounded-lg p-6 sm:p-8 md:p-12 bg-walnut/90 border border-brass/40 shadow-2xl space-y-12 overflow-hidden">
          {/* Subtle Leather Texture */}
          <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
            <Picture assetKey="leatherGrain" className="w-full h-full object-cover" />
          </div>

          {/* Section A: Profile Card */}
          <section aria-labelledby="passport-heading" className="relative z-10 flex flex-col md:flex-row items-center gap-8 bg-parchment text-ink p-6 md:p-8 rounded shadow-card border border-brass/50 overflow-hidden">
            {/* Parchment background layer */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
              <Picture assetKey="parchment" className="w-full h-full object-cover" />
            </div>

            {/* Brass Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brass/70 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brass/70 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brass/70 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brass/70 pointer-events-none" />

            {/* Profile Photo */}
            <div className="relative w-36 h-44 sm:w-44 sm:h-52 shrink-0 rounded overflow-hidden border-2 border-brass shadow-md bg-walnut/20">
              <Picture assetKey="profile" className="w-full h-full object-cover object-top" />
            </div>

            {/* Identity Details */}
            <div className="flex-1 space-y-3 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brass/40 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
                  ENSA OUJDA · MGSI
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-oxblood/15 text-oxblood font-bold border border-oxblood/30">
                  ENGINEERING
                </span>
              </div>

              <div>
                <h2 id="passport-heading" className="font-cormorant text-3xl sm:text-4xl font-bold text-ink">
                  {OWNER.fullName}
                </h2>
                <p className="font-mono text-sm uppercase tracking-wider text-cognac font-semibold">
                  @{OWNER.handle}
                </p>
              </div>

              <div className="font-serif text-base sm:text-lg text-ink/90 font-medium">
                {OWNER.title}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 text-ink/75 border-t border-brass/20">
                <div>
                  <span className="text-brass font-semibold">STATUS:</span> 3rd Year Engineering Student
                </div>
                <div>
                  <span className="text-brass font-semibold">FIELD:</span> MGSI
                </div>
                <div>
                  <span className="text-brass font-semibold">INSTITUTION:</span> ENSA Oujda (ENSAO)
                </div>
                <div>
                  <span className="text-brass font-semibold">LOCATION:</span> Oujda, Morocco
                </div>
              </div>
            </div>
          </section>

          {/* Section B: Bio */}
          <section aria-labelledby="ledger-heading" className="relative z-10 bg-parchment text-ink p-6 md:p-8 rounded shadow-card border border-brass/40">
            <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
              <Picture assetKey="parchment" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 border-b border-brass/30 pb-3">
                <FileText className="w-4 h-4 text-brass" />
                <h3 id="ledger-heading" className="font-mono text-xs uppercase tracking-widest text-brass font-bold">
                  ABOUT ME
                </h3>
              </div>

              <p className="font-serif text-lg md:text-xl text-ink leading-relaxed">
                {OWNER.bioParagraph1}
              </p>

              <p className="font-serif text-lg md:text-xl text-ink leading-relaxed">
                {OWNER.bioParagraph2}
              </p>
            </div>
          </section>

          {/* Section C: "Bridging Two Worlds" Visual */}
          <section aria-labelledby="bridging-heading" className="relative z-10 space-y-6">
            <div className="text-center">
              <h3 id="bridging-heading" className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
                Bridging Governance &amp; Defense
              </h3>
            </div>

            <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-6 pt-2">
              {/* Card 1: Governance */}
              <div className="flex-1 bg-walnut/90 text-parchment p-6 rounded border-2 border-brass/50 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-brass font-mono text-xs uppercase tracking-wider font-bold">
                  <Compass className="w-4 h-4" />
                  <span>Governance &amp; Modeling</span>
                </div>
                <h4 className="font-cormorant text-xl font-bold text-parchment-light">
                  Risk &amp; Architecture
                </h4>
                <p className="text-sm text-parchment/80 font-serif">
                  Designing structured systems, risk management (ISO 27005 / EBIOS RM), and compliance alignment.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['UML 2.5', 'Merise', 'SAP PowerDesigner', 'Risk & Compliance', 'IT Project Management', 'ISO 27001'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-deep-wood/80 text-brass-light font-mono text-xs border border-brass/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connecting Brass Chain / Line labeled secbymorchid */}
              <div className="relative flex flex-col md:flex-row items-center justify-center py-2 md:py-0 md:px-4">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    initial={{ scaleX: prefersReduced ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: prefersReduced ? 0.2 : 1.2, ease: [0.4, 0.0, 0.2, 1.0] }}
                    className="hidden md:block w-32 h-[3px] bg-gradient-to-r from-brass via-brass-light to-brass origin-left shadow-brass"
                  />
                  <div className="px-3 py-1.5 rounded-full bg-deep-wood border-2 border-brass text-brass-light font-mono text-xs tracking-wider uppercase font-bold shadow-brass z-10 shrink-0">
                    secbymorchid
                  </div>
                  <motion.div
                    initial={{ scaleX: prefersReduced ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: prefersReduced ? 0.2 : 1.2, ease: [0.4, 0.0, 0.2, 1.0] }}
                    className="hidden md:block w-32 h-[3px] bg-gradient-to-r from-brass via-brass-light to-brass origin-left shadow-brass"
                  />
                </div>
              </div>

              {/* Card 2: Defense */}
              <div className="flex-1 bg-walnut/90 text-parchment p-6 rounded border-2 border-brass/50 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-brass font-mono text-xs uppercase tracking-wider font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Security Operations</span>
                </div>
                <h4 className="font-cormorant text-xl font-bold text-parchment-light">
                  Hands-on Tooling &amp; Defense
                </h4>
                <p className="text-sm text-parchment/80 font-serif">
                  Engineering detection pipelines, deception environments, and automated network auditors.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Python', 'Bash / Linux', 'SQLite', 'Honeypots', 'Network Auditing', 'Threat Intel'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-deep-wood/80 text-brass-light font-mono text-xs border border-brass/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section D: Skills */}
          <section aria-labelledby="skills-heading" className="relative z-10 space-y-6">
            <div className="text-left border-b border-brass/30 pb-2">
              <h3 id="skills-heading" className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
                Skills &amp; Competencies
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map((category, catIdx) => (
                <div key={catIdx} className="bg-walnut/70 border border-brass/40 p-5 rounded-md space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-brass font-mono text-xs font-bold uppercase tracking-wider border-b border-brass/20 pb-2">
                    <Cpu className="w-4 h-4" />
                    <span>{category.category}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-deep-wood text-parchment-light font-mono text-xs border border-brass/30 shadow-xs hover:border-brass hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section E: Education */}
          <section aria-labelledby="education-heading" className="relative z-10 space-y-6">
            <div className="text-left border-b border-brass/30 pb-2">
              <h3 id="education-heading" className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION_TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded border-l-4 border-brass bg-walnut/70 text-parchment space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-cormorant text-xl font-bold text-parchment">
                      {item.institution}
                    </h4>
                    <span className="font-mono text-xs text-brass-light font-semibold">
                      {item.period}
                    </span>
                  </div>
                  <div className="font-serif italic text-base text-parchment/85">
                    {item.degree} — {item.location}
                  </div>
                  <p className="font-serif text-sm text-parchment/75">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section F: Frameworks */}
          <section aria-labelledby="frameworks-heading" className="relative z-10 space-y-6">
            <div className="text-left border-b border-brass/30 pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 id="frameworks-heading" className="font-cormorant text-2xl sm:text-3xl font-bold text-parchment">
                  Frameworks &amp; Standards
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {FRAMEWORKS_TRAY.map((fw, idx) => (
                <div
                  key={idx}
                  className="bg-walnut/70 border border-brass/40 p-4 rounded space-y-2 hover:border-brass transition-colors shadow-sm"
                >
                  <div className="font-mono font-bold text-sm text-brass-light flex items-center justify-between">
                    <span>{fw.name}</span>
                    <span className="w-2 h-2 rounded-full bg-brass/60" />
                  </div>
                  <p className="font-serif text-xs text-parchment/80">
                    {fw.domain}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 text-center border-t border-brass/15 bg-walnut/40">
        <p className="font-mono text-xs uppercase tracking-widest text-brass/70">
          Management &amp; Governance of Information Systems · ENSAO
        </p>
      </footer>
    </div>
  );
};
