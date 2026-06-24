import type { Domain } from "@/lib/domains";

export interface SkillGroup {
  title: string;
  domain: Domain;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML",
    domain: "ai",
    skills: [
      "LangGraph",
      "LangChain",
      "ChromaDB",
      "Neo4j",
      "LightGBM",
      "XGBoost",
      "SHAP",
      "HDBSCAN",
      "UMAP",
      "Gemini API",
    ],
  },
  {
    title: "AI Tools & Platforms",
    domain: "ai",
    skills: [
      "Claude Code",
      "Antigravity",
      "Unsloth",
      "AgentBeats",
      "Firebase Studio",
      "Vercel",
    ],
  },
  {
    title: "Full-Stack",
    domain: "fullstack",
    skills: [
      "React 18",
      "FastAPI",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Chart.js",
    ],
  },
  {
    title: "Databases & Infra",
    domain: "ai",
    skills: [
      "MySQL",
      "Firebase",
      "Redis",
      "Docker",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    title: "Systems & Security",
    domain: "security",
    skills: ["Chrome Extension MV3", "Unity 3D", "AES-256", "JWT", "Jaeger"],
  },
  {
    title: "Languages",
    domain: "systems",
    skills: ["Python", "JavaScript", "Java", "C++", "C", "PHP"],
  },
  {
    title: "Core CSE",
    domain: "fullstack",
    skills: [
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
      "System Design",
      "Data Structures & Algorithms",
      "Object Oriented Programming",
    ],
  },
];
