export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  oneLineOutcome: string;
  problemSolved: string;
  techStack: string[];
  keyFeatures: string[];
  repoUrl: string;
  grcAngle: string;
  architectureSlot?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  description: string;
}

export interface FrameworkItem {
  name: string;
  domain: string;
  sourceRepo: string;
}

export const OWNER = {
  fullName: "Moad Morchid",
  handle: "secbymorchid",
  title: "3rd Year Engineering Student, MGSI @ ENSA Oujda",
  headline: "Where governance meets defense.",
  email: "moad.morchid.cybersec@gmail.com",
  github: "https://github.com/secbymorchid",
  linkedin: "https://www.linkedin.com/in/moad-morchid-8575b43a0/",
  bioParagraph1: "3rd-year engineering student specializing in Management and Governance of Information Systems (MGSI) at the National School of Applied Sciences of Oujda (ENSAO). I operate at the intersection of IT project management, risk & governance (GRC), and hands-on security operations.",
  bioParagraph2: "Under my technical handle secbymorchid, I build automated security tooling and detection pipelines using Python, Bash, Linux, and SQLite—bridging governance policies with real-world technical defense.",
  signOff: "Where governance meets defense.",
};

export const BIOS_BOOT_LINES = [
  "MORCHID SYSTEMS BIOS v1.0",
  "Initializing information systems...... OK",
  "Loading governance modules............. OK",
  "Loading risk & compliance.............. OK",
  "Loading security operations............ OK",
  "User: Moad Morchid  |  handle: secbymorchid",
  "> System ready. Authentication verified.",
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: "Commands: open study, projects, about, contact, whoami, clear",
  whoami: "Moad Morchid (secbymorchid) — 3rd Year MGSI @ ENSA Oujda\nBridging IT Project Management & GRC with hands-on Security Operations.",
  "open study": "Unlocking Study Console... Entering the study.",
  "open-study": "Unlocking Study Console... Entering the study.",
  study: "Unlocking Study Console... Entering the study.",
  enter: "Unlocking Study Console... Entering the study.",
  start: "Unlocking Study Console... Entering the study.",
  projects: "Opening Projects case...",
  about: "Opening About case...",
  contact: "Opening Contact case...",
};

export const PROJECTS: Project[] = [
  {
    id: "automated-ssh-siem",
    number: "I",
    title: "Automated SSH Brute-Force SIEM Pipeline",
    subtitle: "Bash & SQLite Log Pipeline",
    oneLineOutcome: "Automates extraction of failed SSH login attempts and normalizes threat events into SQLite.",
    problemSolved: "Linux auth logs (/var/log/auth.log) are unstructured and shift columns on irregular events (e.g. 'invalid user'). This pipeline parses, normalizes, and loads them into SQL automatically.",
    techStack: ["Bash", "awk", "SQLite", "Linux Security"],
    keyFeatures: [
      "Custom ETL parsing auth logs with awk logic",
      "Dynamic handling for 'invalid user' column shifting",
      "SQLite persistence for historical querying",
      "Rapid identification of repeat attacker IPs"
    ],
    repoUrl: "https://github.com/secbymorchid/Automated-SSH-Brute-Force-Detection-Intelligence-Pipeline",
    grcAngle: "NIST CSF DE.AE-1 & ISO 27001 Control A.12.4.1 (Event Logging)",
    architectureSlot: "auth.log -> awk Normalizer -> SQLite Database -> Threat Queries"
  },
  {
    id: "ssh-honeypot-project",
    number: "II",
    title: "Enterprise SSH Honeypot & Threat Intel",
    subtitle: "Cowrie, Docker & MITRE ATT&CK",
    oneLineOutcome: "Multi-tier Cowrie honeypot capturing adversary attacks, enriched with MaxMind GeoIP2 and mapped to MITRE ATT&CK.",
    problemSolved: "Capturing live attacker behaviors safely requires strict host isolation. This system traps botnets inside a hardened sandbox and translates commands into MITRE ATT&CK techniques.",
    techStack: ["Python", "Cowrie", "Docker", "GeoIP2", "MITRE ATT&CK", "Streamlit"],
    keyFeatures: [
      "3-tier isolation (Host -> Isolated VM -> Hardened Docker)",
      "High-speed NDJSON ingestion for Cowrie logs",
      "GeoIP2 enrichment for attacker origin tracking",
      "Automated MITRE ATT&CK TTP mapping",
      "Interactive Streamlit SOC dashboard"
    ],
    repoUrl: "https://github.com/secbymorchid/ssh-honeypot-project",
    grcAngle: "RGPD / GDPR Recital 49 & ISO 27001 Control A.13.1 (Network Security)",
    architectureSlot: "Attacker -> Port 22 -> Cowrie Docker -> Python ETL -> GeoIP & MITRE -> Streamlit"
  },
  {
    id: "network-port-auditor",
    number: "III",
    title: "Multi-Threaded Network Port & Service Auditor",
    subtitle: "Python Network Reconnaissance",
    oneLineOutcome: "High-concurrency Python port scanner with banner grabbing for automated asset discovery.",
    problemSolved: "Rogue ports and unpatched network services increase the attack surface. This multi-threaded scanner quickly identifies open ports and service versions across subnets.",
    techStack: ["Python 3", "Sockets", "Threading", "Queue", "Network Recon"],
    keyFeatures: [
      "Multi-threaded worker pool with thread-safe queues",
      "Fast socket timeouts and clean connection handling",
      "Automated banner grabbing for daemon detection",
      "Structured output for rapid surface auditing"
    ],
    repoUrl: "https://github.com/secbymorchid/python-drills",
    grcAngle: "ISO 27001 Control A.12.6.1 & NIST CSF ID.AM-2 (Asset Inventory)",
    architectureSlot: "Target Range -> Thread Pool -> Socket Probes -> Banner Grab -> Report"
  },
  {
    id: "rpctf-writeups",
    number: "IV",
    title: "Red Phoenix CTF 2026 (1st Place)",
    subtitle: "1st Place Winner (6,750 pts)",
    oneLineOutcome: "Documented technical writeups and exploit scripts across Rev, Crypto, Web, Pwn, and Forensics.",
    problemSolved: "Solving competitive security challenges under tight deadlines, including binary reverse engineering, cryptographic attacks, and web exploitation.",
    techStack: ["Python", "Ghidra", "GDB", "Cryptography", "Web Security"],
    keyFeatures: [
      "In-depth walkthroughs for the 8 most complex challenges",
      "Custom Python exploit scripts and mathematical crypto solutions",
      "Binary decompilation and debugging with Ghidra and GDB",
      "PCAP traffic analysis and hidden data recovery"
    ],
    repoUrl: "https://github.com/secbymorchid/RPCTF2026",
    grcAngle: "NIST CSF DE.AE-2 (Vulnerability & Exploit Analysis)",
    architectureSlot: "Target -> Static Analysis (Ghidra) -> Dynamic Debug (GDB) -> Exploit"
  },
  {
    id: "securebank-lab",
    number: "V",
    title: "Secure Banking Information System Lab",
    subtitle: "PowerDesigner, PostgreSQL RLS & Linux Hardening",
    oneLineOutcome: "Secure banking information system built from conceptual models to PostgreSQL Row Level Security and ISO 27001 mapping.",
    problemSolved: "Aligning conceptual enterprise architecture with database-level isolation. Combines Merise modeling in SAP PowerDesigner with PostgreSQL Row Level Security.",
    techStack: ["SAP PowerDesigner", "PostgreSQL RLS", "Linux Hardening", "Python SIEM", "ISO 27001"],
    keyFeatures: [
      "Conceptual, logical, and physical data modeling in PowerDesigner",
      "PostgreSQL Row Level Security (RLS) tenant isolation",
      "Linux server baseline hardening",
      "Audit trail logging for financial transactions"
    ],
    repoUrl: "https://github.com/secbymorchid/securebank-lab",
    grcAngle: "ISO 27001 Controls A.9.4.2 & A.9.4.5 (Access Control & Data Isolation)",
    architectureSlot: "PowerDesigner Models -> PostgreSQL RLS -> Hardened Host -> SIEM Audit"
  },
  {
    id: "c-algorithms-structures",
    number: "VI",
    title: "C Algorithms & Memory Architecture Lab",
    subtitle: "Low-Level Memory Safety",
    oneLineOutcome: "Low-level C implementations focusing on manual memory management, pointer arithmetic, and algorithmic logic.",
    problemSolved: "Understanding memory corruption, heap allocation lifecycles, and pointer mechanics required for reverse engineering and secure software development.",
    techStack: ["C", "GDB", "Memory Management (malloc/free)", "Pointer Arithmetic"],
    keyFeatures: [
      "Dynamic merge sort with manual heap allocation",
      "Leak-free memory cleanup and pointer arithmetic",
      "Analysis of malloc vs calloc memory behaviors",
      "Defensive patterns against buffer overflows"
    ],
    repoUrl: "https://github.com/secbymorchid/C-Algorithms-Data-Structures",
    grcAngle: "ISO 27001 Control A.14.2.5 (Secure Engineering Principles)",
    architectureSlot: "C Code -> Heap Allocation -> Pointer Traversal -> GDB Inspection"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Governance & Modeling",
    skills: [
      "ISO/IEC 27001",
      "NIST CSF",
      "EBIOS RM",
      "ISO 27005",
      "UML 2.5",
      "Merise (MCD/MLD)",
      "SAP PowerDesigner",
      "IT Project Management",
      "Agile & Scrum"
    ]
  },
  {
    category: "Security Operations",
    skills: [
      "Threat Deception & Cowrie",
      "MITRE ATT&CK Matrix",
      "SIEM & Log Telemetry",
      "GeoIP Threat Enrichment",
      "Network Port Auditing",
      "Linux Hardening",
      "Incident Triage",
      "Reverse Engineering (Ghidra/GDB)"
    ]
  },
  {
    category: "Programming & Tooling",
    skills: [
      "Python 3",
      "Bash / Shell",
      "C & Memory Management",
      "PostgreSQL & RLS",
      "SQLite 3",
      "Linux (Ubuntu/Debian)",
      "Docker & Compose",
      "Git"
    ]
  }
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    institution: "National School of Applied Sciences of Oujda (ENSAO)",
    degree: "3rd Year Engineering Student — Management & Governance of Information Systems (MGSI)",
    location: "Oujda, Morocco",
    period: "2026 - Present",
    description: "Engineering curriculum focused on information systems modeling (UML, Merise, SAP PowerDesigner), IT project management, risk governance (ISO 27001, EBIOS RM), and practical cybersecurity defense operations."
  }
];

export const FRAMEWORKS_TRAY: FrameworkItem[] = [
  {
    name: "ISO/IEC 27001",
    domain: "Information Security Management System (ISMS)",
    sourceRepo: "ssh-honeypot-project & securebank-lab"
  },
  {
    name: "MITRE ATT&CK",
    domain: "Adversarial Tactics & Techniques",
    sourceRepo: "ssh-honeypot-project"
  },
  {
    name: "RGPD / GDPR Recital 49",
    domain: "Network & Information Security Legitimate Interest",
    sourceRepo: "ssh-honeypot-project"
  },
  {
    name: "NIST CSF",
    domain: "Identify, Protect, Detect, Respond, Recover",
    sourceRepo: "secbymorchid profile & SIEM pipeline"
  },
  {
    name: "EBIOS RM",
    domain: "Cyber Risk Management & Assessment",
    sourceRepo: "secbymorchid profile"
  },
  {
    name: "ISO/IEC 27005",
    domain: "Information Security Risk Management",
    sourceRepo: "secbymorchid profile"
  }
];

export const CERTIFICATIONS = [
  {
    title: "Google Cybersecurity",
    category: "Professional Certification",
    skills: "SIEM triage, SOC incident response, Linux hardening, SQL telemetry"
  },
  {
    title: "Cisco Networking Academy",
    category: "Networking & Infrastructure",
    skills: "Network protocols, TCP/IP fundamentals, routing, infrastructure defense"
  },
  {
    title: "TryHackMe Labs",
    category: "Hands-on SecOps",
    skills: "SOC Level 1 pathways, attack analysis, detection engineering"
  },
  {
    title: "Red Phoenix CTF 2026 Champion",
    category: "Competition",
    skills: "1st Place Winner (6,750 pts) across 30 technical security challenges"
  }
];
