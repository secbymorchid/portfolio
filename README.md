# Moad Morchid — Executive Portfolio
> **Where governance meets defense.**  
> Technical handle: **`secbymorchid`** | MGSI @ ENSAO

An interactive, production-quality portfolio website designed in an authentic **"old money"** aesthetic—bridging Information Systems Governance (UML, Merise, SAP PowerDesigner, ISO 27001, EBIOS RM) with hands-on Security Operations (Python, Bash, Linux, SQLite, threat deception, and network auditing).

---

## Technical Stack & Architecture

- **Core:** React 18, TypeScript (strict mode), Vite 5
- **Styling:** Tailwind CSS with custom design tokens (`walnut`, `deep-wood`, `cognac`, `oxblood`, `forest`, `brass`, `parchment`, `ink`, `phosphor`)
- **Typography:** Cormorant Garamond (Headings), EB Garamond (Body), IBM Plex Mono (Terminal & Badges)
- **Animation:** Framer Motion (slow, weighty cubic-bezier transitions `[0.4, 0.0, 0.2, 1.0]`, zero spring bounce, no WebGL/Three.js)
- **Audio:** Zero audio tags, no Howler, no audio effects of any kind.
- **State Machine:** Single deterministic state machine: `intro` -> `boot` -> `hub` -> `projects` | `about` | `contact` -> `hub`.
- **Accessibility & Fallback:** Dedicated **Plain Version** toggle (fast, zero animation, fully semantic single-page layout with localStorage state persistence), full keyboard navigation with brass focus rings, and `prefers-reduced-motion` compliance.

---

## Repository Structure

```text
├── public/
│   ├── assets/              # Optimized WebP and original asset fallbacks
│   └── favicon.svg          # Brass "M" monogram SVG icon
├── src/
│   ├── assets.ts            # Type-safe asset registry, fallbacks & metadata
│   ├── content/
│   │   └── content.ts       # Central typed data file (bio, projects, skills, education)
│   ├── motion.ts            # Centralized weighty easing curves and transition durations
│   ├── components/
│   │   ├── common/
│   │   │   ├── BrassButton.tsx     # Reusable brass button (primary, outline, subtle)
│   │   │   ├── Picture.tsx         # Modern <picture> element serving WebP + fallback
│   │   │   └── ParallaxLayer.tsx   # Two-layer mouse drift with touch/reduced-motion disable
│   │   ├── Case.tsx                # 3D interactive leather briefcases with clasp glints
│   │   ├── DetailPanel.tsx         # Declassified dossier expansion modal (Esc to close)
│   │   ├── FolderCard.tsx          # Archival dossier cards with wax-seal tabs & brass corners
│   │   ├── PlainVersion.tsx        # High-performance crawlable single-page alternative
│   │   └── Terminal.tsx            # CRT BIOS typing sequence & interactive Easter egg shell
│   ├── scenes/
│   │   ├── IntroScene.tsx          # Scene 0: Antique study desk with IBM PC & power toggle
│   │   ├── BootScene.tsx           # CRT zoom push & phosphor green terminal boot sequence
│   │   ├── HubScene.tsx            # Scene 1: Study console table with three briefcases
│   │   ├── ProjectsScene.tsx       # Scene 2: Open cognac case with staggered project dossiers
│   │   ├── AboutScene.tsx          # Scene 3: Open oxblood case with passport card & ledger bio
│   │   └── ContactScene.tsx        # Scene 4: Open forest case with letter, seal, & copyable email
│   ├── index.css            # Design tokens, film grain noise, CRT scanlines, vignette
│   ├── App.tsx              # Scene state machine orchestrator & asset preloading
│   └── main.tsx             # React DOM entrypoint
├── index.html               # Meta tags, Open Graph, Google fonts preconnect
├── package.json             # Dependencies and build scripts
├── tailwind.config.js       # Custom design system tokens
└── vite.config.ts           # Vite build configuration
```

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node.js v20.18.0)
- npm 9+

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/secbymorchid/portfolio_website_moad_morchid.git
   cd portfolio_website_moad_morchid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs static assets to `dist/`.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## Editing Content & Replacing Images

### 1. Editing Text Content
All website copy, biographical summaries, projects, skill matrices, frameworks, and education entries reside in a single typed configuration file:  
`src/content/content.ts`

- **Owner Profile & Bio:** Edit `OWNER` object (name, handle, headline, bios, links).
- **Projects:** Edit `PROJECTS` array. Each project item contains `id`, `number`, `title`, `oneLineOutcome`, `problemSolved`, `techStack`, `keyFeatures`, `repoUrl`, `grcAngle`, and optional `architectureSlot`.
- **Competencies:** Update `SKILL_CATEGORIES` (Governance & Modeling, Security Operations, Programming & Tooling).
- **Education:** Update `EDUCATION_TIMELINE`. (Note: Earlier preparatory curriculum is currently marked with `[TODO]`).
- **Frameworks:** Update `FRAMEWORKS_TRAY`. Only include frameworks verified by real repository controls.

### 2. Replacing Images & Textures
Image assets reside in `public/assets/` and are registered in `src/assets.ts`.

- Place updated images into `public/assets/` using the standard filenames:
  - `scene0-room` (Study desk background)
  - `ibm-computer` (Vintage PC workstation)
  - `crt-glow` (CRT monitor bloom texture)
  - `hub-room` (Study library console table background)
  - `case-projects-closed`, `case-about-closed`, `case-contact-closed` (Closed briefcases)
  - `case-projects-open`, `case-about-open`, `case-contact-open` (Open briefcases)
  - `wax-seal` (Monogram wax seal stamp)
  - `parchment` (Aged paper texture)
  - `leather-grain` (Smoked leather texture)
  - `passport-card` (Diplomatic passport card frame)
  - `profile` (Portrait photo)
- For maximum performance, generate a companion `.webp` version (max width 2560px for room backgrounds, 1800px for cases).
- If any asset file is removed or missing, `<Picture>` automatically falls back to a brass-bordered mono placeholder so the site remains operational.

---

## Deployment Instructions

### Netlify
1. Connect your repository to Netlify.
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy site.

### Vercel
1. Import repository on Vercel.
2. Framework Preset: **Vite**.
3. Build & Development Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy.

### GitHub Pages
1. Build the production bundle: `npm run build`.
2. Configure GitHub Pages to deploy from your `gh-pages` branch or configure a GitHub Actions workflow:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
         - uses: actions/deploy-pages@v4
   ```

---

## Acceptance Verification Summary

- [x] All 15 assets imported from local machine and optimized with WebP copies & fallback.
- [x] Computer click boots BIOS terminal with typewriter effect, CRT scanlines, and skip button.
- [x] Terminal features interactive Easter egg shell (`help`, `whoami`, `projects`, `about`, `contact`, `clear`).
- [x] Hub presents exactly three briefcases (Cognac, Oxblood, Forest) on mahogany table.
- [x] 3D lid-lift opening animation transitions into respective content cases.
- [x] 6 Projects extracted from authentic `secbymorchid` GitHub repositories with suggested GRC mappings.
- [x] About scene features HTML-overlaid passport card, 18px+ ledger bio, animated "Bridging Two Worlds" chain, luggage-tag skills, education timeline, and frameworks tray.
- [x] Contact scene features "Let's connect", selectable email with clipboard copy button & toast, and 3 brass links. Strictly no form.
- [x] Zero audio anywhere in the application.
- [x] Accessible Plain Version toggle with full content and localStorage persistence.
- [x] Mobile responsive (tested at 360px, 768px, 1024px, 1440px, 1920px).
- [x] `npm run build` passes with zero TypeScript errors or warnings.
