import React, { useState } from 'react';
import { OWNER, PROJECTS, SKILL_CATEGORIES, EDUCATION_TIMELINE, FRAMEWORKS_TRAY, CERTIFICATIONS } from '../content/content';
import { ExternalLink, Mail, Github, Linkedin, Copy, Check, ArrowLeft } from 'lucide-react';
import { BrassButton } from './common/BrassButton';

interface PlainVersionProps {
  onReturnToInteractive: () => void;
}

export const PlainVersion: React.FC<PlainVersionProps> = ({ onReturnToInteractive }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OWNER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#140e0a] text-parchment-light font-serif p-4 sm:p-8 md:p-16 max-w-5xl mx-auto leading-relaxed">
      {/* Header bar */}
      <header className="border-b border-brass/40 pb-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-parchment">
            {OWNER.fullName}
          </h1>
          <p className="font-mono text-sm tracking-widest uppercase text-brass mt-1">
            {OWNER.handle} · {OWNER.title}
          </p>
          <p className="font-serif italic text-lg text-parchment/80 mt-2">
            "{OWNER.headline}"
          </p>
        </div>

        <button
          onClick={onReturnToInteractive}
          className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-brass-light border border-brass/50 px-4 py-2 rounded hover:bg-brass/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Interactive Experience</span>
        </button>
      </header>

      {/* Main Semantic Content */}
      <main className="space-y-16">
        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="font-cormorant text-3xl font-bold text-brass border-b border-brass/30 pb-2">
            01. Executive Profile &amp; Mission
          </h2>
          <div className="space-y-4 text-lg text-parchment/90">
            <p>{OWNER.bioParagraph1}</p>
            <p>{OWNER.bioParagraph2}</p>
          </div>

          {/* Bridging Two Worlds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-walnut/70 border border-brass/40 p-6 rounded">
              <h3 className="font-cormorant text-xl font-bold text-brass mb-3">
                Pillar I: Risk &amp; Governance (GRC)
              </h3>
              <p className="text-sm text-parchment/80 mb-3">
                Information systems design, enterprise architecture modeling, compliance audits, and risk frameworks.
              </p>
              <div className="flex flex-wrap gap-2">
                {['UML 2.5', 'Merise', 'SAP PowerDesigner', 'ISO 27001', 'EBIOS RM', 'NIST CSF', 'PSSI'].map((t, i) => (
                  <span key={i} className="text-xs font-mono bg-deep-wood px-2.5 py-1 border border-brass/30 text-brass-light rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-walnut/70 border border-brass/40 p-6 rounded">
              <h3 className="font-cormorant text-xl font-bold text-brass mb-3">
                Pillar II: Hands-on Security Operations
              </h3>
              <p className="text-sm text-parchment/80 mb-3">
                Threat deception, custom SIEM log pipelines, network surface auditing, and defensive tool engineering.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Bash / Linux', 'SQLite', 'Docker', 'Cowrie Deception', 'MITRE ATT&CK', 'Sockets'].map((t, i) => (
                  <span key={i} className="text-xs font-mono bg-deep-wood px-2.5 py-1 border border-brass/30 text-brass-light rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <h2 className="font-cormorant text-3xl font-bold text-brass border-b border-brass/30 pb-2">
            02. Featured Engineering &amp; Research Projects
          </h2>
          <p className="text-sm text-parchment/80">
            Directly from verified GitHub repositories (<a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="text-brass-light underline">github.com/secbymorchid</a>).
          </p>

          <div className="space-y-8">
            {PROJECTS.map((proj) => (
              <article key={proj.id} className="bg-walnut/60 border border-brass/30 p-6 rounded space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-brass/20 pb-2">
                  <h3 className="font-cormorant text-2xl font-bold text-parchment">
                    {proj.number}. {proj.title}
                  </h3>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-brass-light hover:underline"
                  >
                    View Code <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-base text-parchment/90 italic">
                  "{proj.oneLineOutcome}"
                </p>

                <div className="text-sm text-parchment/80 space-y-2">
                  <p><strong>Problem Addressed:</strong> {proj.problemSolved}</p>
                  <div>
                    <strong>Core Technical Controls:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-parchment/75">
                      {proj.keyFeatures.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <p><strong>GRC Angle:</strong> <span className="text-brass-light">{proj.grcAngle}</span></p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="text-xs font-mono bg-deep-wood px-2 py-0.5 border border-brass/25 rounded text-parchment/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills & Domains */}
        <section id="skills" className="space-y-6">
          <h2 className="font-cormorant text-3xl font-bold text-brass border-b border-brass/30 pb-2">
            03. Competencies &amp; Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-walnut/50 border border-brass/30 p-5 rounded space-y-3">
                <h3 className="font-cormorant text-lg font-bold text-parchment">
                  {cat.category}
                </h3>
                <ul className="space-y-1.5 text-sm font-mono text-parchment/80">
                  {cat.skills.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brass rounded-full" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Frameworks Tray */}
        <section id="frameworks" className="space-y-4">
          <h2 className="font-cormorant text-2xl font-bold text-brass border-b border-brass/30 pb-2">
            04. Verified Frameworks &amp; Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FRAMEWORKS_TRAY.map((fw, idx) => (
              <div key={idx} className="bg-walnut/40 border border-brass/25 p-4 rounded text-sm">
                <div className="font-bold font-mono text-brass-light">{fw.name}</div>
                <div className="text-parchment/70 text-xs mt-1">{fw.domain}</div>
                <div className="text-[11px] font-mono text-parchment/50 mt-2">Source: {fw.sourceRepo}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section id="education" className="space-y-4">
          <h2 className="font-cormorant text-2xl font-bold text-brass border-b border-brass/30 pb-2">
            05. Education &amp; Academic Background
          </h2>
          <div className="space-y-4">
            {EDUCATION_TIMELINE.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-brass pl-4 py-1 space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-cormorant text-xl font-bold text-parchment">{edu.institution}</h3>
                  <span className="font-mono text-xs text-brass-light">{edu.period}</span>
                </div>
                <div className="font-serif italic text-sm text-parchment/85">{edu.degree} · {edu.location}</div>
                <p className="text-sm text-parchment/70">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Labs */}
        <section id="certifications" className="space-y-4">
          <h2 className="font-cormorant text-2xl font-bold text-brass border-b border-brass/30 pb-2">
            06. Certifications &amp; Hands-on Accreditations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-walnut/40 border border-brass/25 p-4 rounded text-sm">
                <div className="font-cormorant font-bold text-lg text-parchment">{cert.title}</div>
                <div className="font-mono text-xs text-brass mb-1">{cert.category}</div>
                <div className="text-parchment/70 text-xs">{cert.skills}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-6 pt-4 border-t border-brass/40">
          <h2 className="font-cormorant text-3xl font-bold text-brass">
            07. Contact &amp; Connect
          </h2>
          <p className="text-lg text-parchment/85">
            Interested in discussing Information Systems Governance, GRC risk assessments, or hands-on security tooling?
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-walnut/90 border border-brass/50 px-4 py-2.5 rounded font-mono text-sm">
              <span className="select-all">{OWNER.email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1 hover:text-brass-light transition-colors"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-brass" />}
              </button>
            </div>
            {copied && <span className="font-mono text-xs text-emerald-400">Email copied to clipboard</span>}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <BrassButton
              variant="outline"
              size="md"
              icon={<Mail className="w-4 h-4" />}
              onClick={() => window.location.href = `mailto:${OWNER.email}`}
            >
              Send Dispatch
            </BrassButton>
            <BrassButton
              variant="outline"
              size="md"
              icon={<Github className="w-4 h-4" />}
              onClick={() => window.open(OWNER.github, '_blank', 'noopener,noreferrer')}
            >
              GitHub Profile
            </BrassButton>
            <BrassButton
              variant="outline"
              size="md"
              icon={<Linkedin className="w-4 h-4" />}
              onClick={() => window.open(OWNER.linkedin, '_blank', 'noopener,noreferrer')}
            >
              LinkedIn Profile
            </BrassButton>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-brass/30 text-center text-sm font-mono text-parchment/60 space-y-2">
        <p>"{OWNER.signOff}"</p>
        <p>// SECBYMORCHID · {OWNER.fullName} · MGSI @ ENSAO</p>
      </footer>
    </div>
  );
};
