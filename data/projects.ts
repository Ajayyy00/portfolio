import type { Domain } from "@/lib/domains";

export type ProjectFilter = "AI" | "Security" | "Full-Stack" | "Hardware" | "VR";

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
      "Ask a clinical question in plain English, get back safe SQL and a chart — no analyst required.",
    longDescription:
      "I wanted to let clinicians ask questions like \"which wards had the highest readmission rate last quarter\" and get a real answer, without anyone hand-writing SQL or risking a query that touches the wrong table. So I built a pipeline of agents — one plans the query, one writes it, one validates it, one optimizes it — wired together with LangGraph so a failing query loops back and gets fixed automatically instead of just erroring out. The part I cared about most was safety: every generated query gets parsed into an AST and run through a rule engine that blocks anything that isn't a plain read — no writes, no stacked statements, nothing clever — and then it executes under a Postgres role that's locked to read-only with row-level security as a second layer. For retrieval I lean on ChromaDB for schema context and a Neo4j graph for how clinical concepts relate to each other, with Redis caching repeat questions. I also fine-tuned CodeLlama-7B with QLoRA so it could hit 80%+ accuracy on the Spider benchmark, and wired up OpenTelemetry/Prometheus/Grafana so I could actually see what the system was doing in production, not just trust it.",
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
    github: "https://github.com/Ajayyy00/RAG-DataAnalyst",
  },
  {
    id: "cybersocenv",
    title: "CyberSOCEnv",
    tag: "AI · Cybersecurity",
    domain: "security",
    accent: "ai",
    categories: ["AI", "Security"],
    description:
      "A 500-node enterprise network under attack, built so AI agents can practice being a SOC analyst.",
    longDescription:
      "I built this for the Meta PyTorch OpenEnv Hackathon as a way to actually benchmark how good an AI agent is at incident response, instead of just at CTF puzzles. It's a deterministic simulation of a 500-node network spread across six subnets, getting hit with live multi-stage attacks across 12 different threat categories. An agent gets six real moves — query logs, run forensics, kill a process, block an indicator of compromise, isolate a segment, or submit a containment plan — and I shaped the reward so it actually reflects business impact: containing a breach is good, but taking down half the network to do it isn't free, so that costs you too. Every episode gets graded across five things — containment, IOC accuracy, forensics quality, downtime caused, and plan quality — and I seed scenario generation off SHA-256 hashes so I can reproduce any of the 1000+ scenarios exactly if something looks off.",
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
    github: "https://github.com/Ajayyy00/CyberSOC-environment",
  },
  {
    id: "phishguard",
    title: "PhishGuard",
    tag: "Security",
    domain: "security",
    categories: ["Security"],
    description:
      "A Chrome extension that catches phishing sites before the page even loads.",
    longDescription:
      "Most phishing blockers warn you after the page has already loaded, which felt too late, so I built this to intercept the navigation before the browser even renders anything. It runs three detectors in parallel: a LightGBM model over 22 URL features that scores a link in under 2ms, a fine-tuned MiniLM model reading the actual page text, and a DOM-similarity check against known brand layouts (for the sites that clone a real login page pixel-for-pixel). Whichever combination trips the risk score, the user gets a warning page before the real one ever loads, plus a SHAP breakdown of why it got flagged — I wanted people to be able to actually check my work, not just trust a black box. Everything runs against a local backend, so no browsing data leaves the machine, which mattered to me as much as the detection accuracy did.",
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
    github: "https://github.com/Ajayyy00/PhishGaurd-extension",
  },
  {
    id: "log-analyser",
    title: "Log Analyser",
    tag: "AI · Hardware",
    domain: "systems",
    accent: "ai",
    categories: ["AI", "Hardware"],
    description:
      "Turns a 50,000-line hardware verification log into a ranked, explained list of what to debug first.",
    longDescription:
      "I built this at the Sandisk / Western Digital hackathon after hearing how much time hardware verification engineers lose just reading through UVM/SVA simulation logs to figure out which failure is the real root cause and which ones are just downstream noise. The pipeline embeds every log line into a vector space that captures meaning, severity, and tag together, clusters the similar failures, and then builds a kind of failure timeline to work out which cluster actually caused the others — instead of just listing every failure as equally urgent. Every ranking comes with the full math behind it shown on screen, because I didn't want engineers to have to take the score on faith. It also fingerprints failures so it can recognize \"oh, we've seen this exact bug shape before\" across projects, and uses Gemini to write a plain-English summary of each cluster so you don't have to read the raw logs just to know where to start.",
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
    github: "https://github.com/Ajayyy00/Log-analyser",
  },
  {
    id: "n2k-logistics",
    title: "N2K Logistics",
    tag: "Full-Stack",
    domain: "fullstack",
    categories: ["Full-Stack"],
    description:
      "A logistics platform with separate portals for admins, drivers, agents and customers — tracking, billing, the whole pipeline.",
    longDescription:
      "This one came out of trying to model how a real delivery company actually operates day to day, not just a toy CRUD app. There are four separate portals — admin, driver, delivery agent, and customer — because each of those people needs to see something completely different: the admin needs hub-level allocation and route planning, the driver just needs their next stop and a way to confirm delivery, and the customer just wants to know where their package is. Under the hood it routes orders through hub-based allocation, tracks shipments in real time, and fires off Twilio SMS and email updates automatically so nobody has to manually tell a customer their order shipped. I also built out a full billing module with invoice generation and XLSX/PDF export, since a logistics platform without proper billing isn't really finished. It's a React 18 + Vite frontend talking to an Express API across MSSQL, MySQL and Firebase.",
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
    github: "https://github.com/harish040120/n2k_logistics",
  },
  {
    id: "seam",
    title: "SEAM — Face Authentication",
    tag: "AI · Security",
    domain: "ai",
    accent: "security",
    categories: ["AI", "Security"],
    description:
      "Face authentication that runs entirely in the browser, built to UIDAI/Aadhaar spec for Smart India Hackathon.",
    longDescription:
      "The brief for Smart India Hackathon was to build face authentication against Aadhaar that a government system could actually trust, and the hard part turned out not to be the face matching — it was proving the model itself couldn't be tampered with. The matching side maps 68 facial landmarks into a 128-dimension embedding and compares it on-device against the registered Aadhaar face, so the biometric data never has to leave the browser. To stop someone just holding up a photo, it checks for blinking and head movement before it'll even attempt a match. But the part the judges actually cared about was hardening the model itself — I encrypted it at rest with AES-256, obfuscated the code, and added Sub-Resource Integrity checks so the model can't be silently swapped or reverse-engineered, since that was the core security requirement of the problem statement, not an afterthought.",
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
    github: "https://github.com/Shyam94000/SecureDigitalWallet",
  },
  {
    id: "vr-flatlock",
    title: "VR Flatlock Machine Simulation",
    tag: "VR · Industrial Training",
    domain: "systems",
    accent: "fullstack",
    categories: ["VR", "Hardware"],
    description:
      "A VR simulation of an industrial sewing machine, so trainees can practice before touching the real one.",
    longDescription:
      "PSG's Software Development Cell wanted a way for trainees to learn a real 5-thread flatlock sewing machine — the kind used on industrial garment lines — without the risk of an early mistake wasting fabric or damaging an expensive machine. I rebuilt the whole thing in Unity: the foot pedal, the thread tensioners, the fabric feed, and the looping motion of the 5-thread stitch itself, all rigged so someone can actually practice the real operating sequence in VR first. The tricky part was that it had to run standalone on a Meta Quest 2 with no PC tether, so I spent a lot of time trimming poly-count, draw calls and shader complexity down to fit the headset's GPU budget without it feeling sluggish or unlike the real machine. All the interaction logic and machine-state simulation is C#, built against Unity's XR input pipeline.",
    stat: "5-thread machine · standalone on Meta Quest 2",
    stack: ["Unity 3D", "C#", "Meta Quest 2"],
  },
  {
    id: "pothole-detection",
    title: "Pothole Detection & Safe Navigation",
    tag: "AI · Edge Navigation",
    domain: "ai",
    accent: "fullstack",
    categories: ["AI", "Full-Stack", "Hardware"],
    description:
      "A dashcam runs YOLOv8 on the edge to map potholes to GPS, then a dashboard routes you around the roughest roads — scoring 'safest' over 'fastest'.",
    longDescription:
      "The idea started from a simple annoyance: navigation apps optimise for the fastest route, so they'll happily send you down the most broken road in the city. This flips that to optimise for road quality instead. A camera mounted on the dashboard runs YOLOv8 in real time to detect potholes and speed breakers, grading each one's severity from the size of its bounding box relative to the frame — a surface crack scores differently from a deep hazard. GPS runs on its own thread so polling never stalls the detection loop, and rather than writing to the database on every frame, detections are batched and only committed once the vehicle has moved 50 metres — which stops it from spamming Firestore with a hundred logs of the same pothole while you're sat at a light. Each hazard lands in the cloud tagged with its coordinates, severity and confidence. The routing lives in the web dashboard: it pulls the hazard map, asks the Google Maps Directions API for alternative routes, and scores each one by how many potholes fall within 50 metres of its path, weighted so a single high-severity hazard outweighs a stretch of minor cracks, plus a small penalty for extra distance — so the 'safest' route can genuinely beat the 'fastest' one. On top of that it fires voice alerts when you come within 100 metres of a known hazard and renders a live heatmap of the worst areas. The clear next step is pushing the spatial matching off the browser into a backend with proper geo-indexing so it scales past a local dataset.",
    stat: "Real-time YOLOv8 · safest-route scoring",
    stack: [
      "YOLOv8",
      "OpenCV",
      "Python",
      "Firebase Firestore",
      "Google Maps API",
      "Bootstrap",
    ],
    architecture: {
      stages: [
        { label: "Camera Feed", sub: "Dashcam / webcam mounted in the vehicle", domain: "systems" },
        {
          label: "YOLOv8 Detection",
          sub: "Real-time pothole & speed-breaker spotting on the edge",
          domain: "ai",
        },
        {
          label: "GPS + Batcher",
          sub: "Parallel GPS thread · detections batched every 50m",
          domain: "systems",
        },
        {
          label: "Firestore Sync",
          sub: "Hazards + coordinates pushed to the cloud",
          domain: "fullstack",
        },
        {
          label: "Safest-Route Scoring",
          sub: "Google Maps routes ranked by pothole density × severity",
          domain: "ai",
        },
        {
          label: "Navigation UI",
          sub: "Live heatmap · voice alerts within 100m of a hazard",
          domain: "fullstack",
        },
      ],
      note: "Each candidate route is scored by nearby potholes weighted by severity — so the 'safest' path can win over the fastest one.",
    },
    github: "https://github.com/Ajayyy00/Pothole-detection",
  },
];

export const projectFilters: ("All" | ProjectFilter)[] = [
  "All",
  "AI",
  "Security",
  "Full-Stack",
  "Hardware",
  "VR",
];
