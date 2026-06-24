import type { Domain } from "@/lib/domains";
import { site } from "@/data/site";

export type ProjectFilter = "AI" | "Security" | "Full-Stack" | "Hardware";

/** One node in a project's data-flow / architecture diagram. */
export interface ArchStage {
  label: string;
  sub?: string;
  domain: Domain;
  /** Parallel branches shown as pills under the stage (e.g. tri-modal detectors). */
  parallel?: string[];
  /** Short loop annotation, e.g. "self-corrects" / "step loop". */
  loop?: string;
}

export interface ProjectArchitecture {
  stages: ArchStage[];
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  /** Tag pill text, e.g. "AI · Healthcare". */
  tag: string;
  /** Primary domain drives the accent colour / glow. */
  domain: Domain;
  /** Optional secondary accent (e.g. SEAM is AI + Security). */
  accent?: Domain;
  /** Filter buckets this project appears under. */
  categories: ProjectFilter[];
  description: string;
  longDescription: string;
  /** Key headline metric, highlighted in the domain colour. */
  stat: string;
  stack: string[];
  /** Per-project architecture / data-flow, rendered in the modal. */
  architecture?: ProjectArchitecture;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "healthcare-copilot",
    title: "Healthcare Copilot",
    tag: "AI · Healthcare",
    domain: "ai",
    categories: ["AI"],
    description:
      "Plain-English clinical questions → safe, validated SQL → charts & insights.",
    longDescription:
      "A multi-agent RAG data analyst that turns natural-language clinical questions into HIPAA-compliant, read-only SQL. A LangGraph state machine orchestrates Plan → Generate → Validate → Optimize agents that self-correct failing queries before they ever touch the database. Every generated query is parsed into an AST with sqlglot and checked against a deterministic safety engine — no DDL/DML, no stacked queries, no tautologies — then executed under a hard-separated read-only Postgres role with Row-Level Security. Schema-aware retrieval runs on ChromaDB, a Neo4j knowledge graph maps clinical relationships, and Redis handles semantic caching. CodeLlama-7B was fine-tuned with QLoRA (4-bit NF4) to reach ≥80% execution accuracy on the Spider benchmark, with full request tracing via OpenTelemetry, Prometheus, Grafana and Jaeger.",
    stat: "Self-correcting multi-agent SQL",
    stack: [
      "FastAPI",
      "LangGraph",
      "ChromaDB",
      "Neo4j",
      "PostgreSQL 16",
      "Redis",
      "React 18",
      "Docker",
      "CodeLlama-7B",
    ],
    architecture: {
      stages: [
        { label: "NL Query", sub: "Plain-English clinical question", domain: "ai" },
        { label: "Intent Router", sub: "Classifies & routes the question", domain: "ai" },
        { label: "RAG Retrieval", sub: "Schema context from ChromaDB", domain: "ai" },
        {
          label: "Multi-Agent SQL",
          sub: "LangGraph: Plan → Generate → Validate → Optimize",
          domain: "ai",
          loop: "self-corrects",
        },
        { label: "Safety Engine", sub: "sqlglot AST · table allow-list", domain: "security" },
        {
          label: "Read-only Execution",
          sub: "hc_readonly role · Row-Level Security · PostgreSQL",
          domain: "security",
        },
        { label: "Insights", sub: "Charts + narrative report → React UI", domain: "fullstack" },
      ],
      note: "The validator loops back to the optimizer until the query is provably safe — only then does it execute.",
    },
    github: site.github,
  },
  {
    id: "cybersocenv",
    title: "CyberSOCEnv",
    tag: "AI · Cybersecurity",
    domain: "security",
    accent: "ai",
    categories: ["AI", "Security"],
    description:
      "RL training environment simulating a 500-node enterprise network under attack.",
    longDescription:
      "A deterministic reinforcement-learning environment built on Meta's OpenEnv framework for benchmarking autonomous incident-response agents. It simulates a 500-node enterprise network across six subnets under live multi-stage attacks spanning 12 threat categories. Agents act through six structured Pydantic-typed actions (query, forensics, kill process, block IOC, isolate segment, submit plan) and receive dense reward shaping that rewards containment while penalising collateral downtime — modelling real business impact, not just CTF points. A 5-rubric grading engine (40% containment, 20% IOC, 15% forensics, 15% downtime, 10% plan quality) scores each episode 0–1. SHA-256-seeded procedural generation yields 1000+ unique, fully reproducible scenarios. Finalist at the Meta PyTorch OpenEnv Hackathon 2026.",
    stat: "1000+ unique scenarios · 5-rubric scoring",
    stack: ["Python", "Meta OpenEnv", "Pydantic", "Docker", "WebSocket", "REST API"],
    architecture: {
      stages: [
        { label: "Agent connects", sub: "LLM via WebSocket client", domain: "ai" },
        { label: "Reset", sub: "Build 500-node network + inject attack chain", domain: "security" },
        { label: "Observation", sub: "Alerts · topology · forensics", domain: "security" },
        {
          label: "Agent Action",
          domain: "ai",
          parallel: ["query", "forensics", "kill", "block IOC", "isolate"],
          loop: "step loop",
        },
        { label: "Reward + State", sub: "Dense reward · business-impact penalty", domain: "security" },
        { label: "Grade Episode", sub: "5-rubric weighted score · 0–1", domain: "fullstack" },
      ],
      note: "Observation → action repeats each step until the agent submits a containment plan.",
    },
    github: site.github,
  },
  {
    id: "phishguard",
    title: "PhishGuard",
    tag: "Security",
    domain: "security",
    categories: ["Security"],
    description:
      "Real-time phishing detection Chrome extension — tri-modal ML analysis.",
    longDescription:
      "A Manifest V3 Chrome extension that blocks phishing before the page ever loads. It intercepts every main-frame navigation via webNavigation.onBeforeNavigate and runs three parallel ML detectors: a LightGBM classifier over 22 engineered URL features (<2ms inference), a fine-tuned MiniLM transformer on visible page text, and DOM-template similarity matching against known brand fingerprints. A weighted risk score drives a pre-navigation block + warning page, and SHAP values explain exactly why every site was flagged. Privacy-first by design — analysis runs against a local backend, so no browsing data ever leaves the machine.",
    stat: "Tri-modal ML · Zero cloud telemetry",
    stack: ["Chrome Extension MV3", "LightGBM", "MiniLM", "SHAP", "Python", "Flask"],
    architecture: {
      stages: [
        { label: "Navigation", sub: "webNavigation.onBeforeNavigate intercepts", domain: "security" },
        { label: "Background Worker", sub: "Cache check · dispatch to local API", domain: "ai" },
        {
          label: "Tri-modal Analysis",
          sub: "Three detectors run in parallel",
          domain: "ai",
          parallel: ["LightGBM · URL", "MiniLM · text", "DOM template"],
        },
        { label: "Risk Score", sub: "Weighted 0–100 with SHAP explanations", domain: "security" },
        { label: "Verdict", sub: "Block warning page  ·  or allow + highlight", domain: "security" },
      ],
      note: "All inference runs against a local backend — no browsing data ever leaves the device.",
    },
    github: site.github,
  },
  {
    id: "log-analyser",
    title: "Log Analyser",
    tag: "AI · Hardware",
    domain: "systems",
    accent: "ai",
    categories: ["AI", "Hardware"],
    description:
      "AI debug triage for UVM/SVA hardware simulation logs — hours to seconds.",
    longDescription:
      "An AI debug-prioritisation pipeline for hardware verification. It ingests 10K–50K UVM/SVA simulation log lines, embeds them with MiniLM into a 391-dim hybrid space (semantics + severity + tag), then clusters similar failures with UMAP + HDBSCAN. A topological root-cause DAG built from temporal transitions separates true root causes from cascading symptoms, and a fully explainable (XAI) priority formula ranks every cluster with its complete mathematical derivation shown. Signature 'Failure DNA' fingerprints, cross-project fix memory, and Gemini-generated insight cards round it out. Built for the Sandisk / Western Digital Hackathon 2026.",
    stat: "10K log lines triaged in <30s",
    stack: [
      "Python",
      "Sentence Transformers",
      "HDBSCAN",
      "UMAP",
      "Gemini API",
      "Streamlit",
      "React",
    ],
    architecture: {
      stages: [
        { label: "Ingest · L1", sub: "Parse & denoise UVM/SVA log lines", domain: "systems" },
        { label: "Embed · L2", sub: "MiniLM → 391-dim hybrid vectors", domain: "ai" },
        { label: "Cluster · L3", sub: "UMAP projection + HDBSCAN", domain: "ai" },
        { label: "Root-cause DAG · L4", sub: "Temporal transitions find true causes", domain: "systems" },
        { label: "Priority + XAI · L5", sub: "Explainable score per cluster", domain: "ai" },
        { label: "Dashboard", sub: "Ranked tasks · Failure DNA · Gemini insights", domain: "fullstack" },
      ],
      note: "A cross-project memory layer (L0) matches new failures against past fixes before triage begins.",
    },
    github: site.github,
  },
  {
    id: "n2k-logistics",
    title: "N2K Logistics",
    tag: "Full-Stack",
    domain: "fullstack",
    categories: ["Full-Stack"],
    description:
      "Multi-role logistics platform with real-time tracking, fleet management & billing.",
    longDescription:
      "A full-stack logistics platform with four role-based portals — Admin, Driver, Agent and Customer. It handles hub-based delivery allocation, vehicle/driver scheduling and route optimisation, with real-time shipment tracking and proof-of-delivery. Automated Twilio SMS and EmailJS notifications keep customers informed at every status change, and a complete billing/invoicing module generates reports with XLSX and PDF export. Built on a React 18 + Vite frontend with Chart.js/Recharts analytics, backed by an Express API over MSSQL and MySQL with Firebase integration.",
    stat: "4 role portals · Twilio SMS + email",
    stack: [
      "React 18",
      "Node.js",
      "Express",
      "MSSQL",
      "MySQL",
      "Firebase",
      "Twilio",
      "Tailwind",
    ],
    architecture: {
      stages: [
        {
          label: "Role Portals",
          sub: "Four role-based React portals",
          domain: "fullstack",
          parallel: ["Admin", "Driver", "Agent", "Customer"],
        },
        { label: "Express API", sub: "Auth · validation · business logic", domain: "fullstack" },
        { label: "Hub Allocation", sub: "Delivery hub + route optimisation", domain: "fullstack" },
        { label: "Data Layer", sub: "MSSQL · MySQL · Firebase", domain: "ai" },
        { label: "Notifications", sub: "Twilio SMS · EmailJS", domain: "security" },
        { label: "Billing", sub: "Invoices + XLSX / PDF export", domain: "fullstack" },
      ],
      note: "Hub-based allocation routes every order to the optimal vehicle and driver.",
    },
    github: site.github,
  },
  {
    id: "seam",
    title: "SEAM — Face Authentication",
    tag: "AI · Security",
    domain: "ai",
    accent: "security",
    categories: ["AI", "Security"],
    description:
      "Browser-based face auth with CNN liveness detection, built for UIDAI / Aadhaar.",
    longDescription:
      "A browser-based, real-time face authentication system designed to spec for UIDAI / Aadhaar integration (Smart India Hackathon 2024). A CNN maps 68 facial landmarks into 128-D embeddings and matches them fully on-device against the registered Aadhaar face — biometrics never leave the browser. Blink and head-movement liveness checks defeat photo and video spoofing, while the ML model itself is hardened with AES-256-CBC encryption at rest, code obfuscation and Sub-Resource Integrity to block reverse engineering — the core of the problem statement. Models load from Azure and cache in the browser for fast, repeat authentication.",
    stat: "128-D embeddings · on-device matching",
    stack: ["React", "face-api.js", "TensorFlow.js", "Azure", "AES-256", "Firebase"],
    architecture: {
      stages: [
        { label: "User Input", sub: "Aadhaar number + live webcam feed", domain: "ai" },
        { label: "Aadhaar Validation", sub: "Checked against Azure SQL face DB", domain: "security" },
        { label: "Liveness Detection", sub: "Blink + head-movement anti-spoof", domain: "security" },
        { label: "Face-API.js", sub: "68 landmarks → 128-D descriptors", domain: "ai" },
        { label: "On-device Match", sub: "0.45 cosine threshold vs UIDAI face", domain: "ai" },
        { label: "Secured Model", sub: "AES-256-CBC · browser cache · SRI + obfuscation", domain: "security" },
        { label: "Authenticated", sub: "Redirect to profile page", domain: "fullstack" },
      ],
      note: "Models load from Azure, cache in the browser, and run fully on-device — biometrics never leave the client.",
    },
    github: site.github,
  },
];

export const projectFilters: ("All" | ProjectFilter)[] = [
  "All",
  "AI",
  "Security",
  "Full-Stack",
  "Hardware",
];
