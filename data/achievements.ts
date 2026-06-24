import type { Domain } from "@/lib/domains";

export interface Achievement {
  event: string;
  year: string;
  result: string;
  icon: string;
  scope: string;
  domain: Domain;
}

export const achievements: Achievement[] = [
  {
    event: "Smart India Hackathon",
    year: "2024",
    result: "Finalist",
    icon: "🏅",
    scope: "National",
    domain: "ai",
  },
  {
    event: "Meta PyTorch OpenEnv",
    year: "2026",
    result: "Finalist",
    icon: "🏅",
    scope: "National",
    domain: "security",
  },
  {
    event: "Sandisk Hackathon",
    year: "2026",
    result: "Finalist",
    icon: "🏅",
    scope: "Industry",
    domain: "systems",
  },
  {
    event: "Shaastra AI/ML Challenge",
    year: "2024",
    result: "Finalist",
    icon: "🏅",
    scope: "IIT Madras",
    domain: "fullstack",
  },
];
