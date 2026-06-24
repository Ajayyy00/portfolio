export interface Contribution {
  title: string;
  description: string;
  stack: string[];
  /** Live URL, or null for internal tools. */
  link: string | null;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  meta?: string;
  bullets: string[];
  /** Optional expandable contributions grid (SDC). */
  contributions?: Contribution[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "datamyth",
    company: "Datamyth",
    role: "Data Analysis Intern",
    period: "Jul 2025 – Mar 2026",
    bullets: [
      "Built Flask + MongoDB integrations across the Google, Meta and LinkedIn Ads APIs, unifying daily campaign metrics (impressions, clicks, ROAS, CPC) into one cross-platform analytics backend.",
      "Built an XGBoost ad-fatigue detector with lag/rolling features that flags creatives before CTR decays, paired with an LLM that generates 3-line executive insight summaries.",
      "Shipped spend-anomaly detection using Holt-Winters seasonal forecasting with automated, throttled email alerting on spikes, drops and zero-spend campaigns.",
    ],
  },
  {
    id: "sdc",
    company: "Software Development Cell (SDC)",
    role: "Developer",
    period: "May 2024 – Present",
    meta: "PSG Institute of Technology and Applied Research",
    bullets: [
      "Spent two years building the internal apps PSG's campus actually runs on — replacing paper forms with PHP/MySQL tools students and faculty use every day.",
    ],
    contributions: [
      {
        title: "College Transport App",
        description:
          "Student and faculty transport registration, seat allocation, and evening bus booking system used across PSG campus.",
        stack: ["PHP", "MySQL"],
        link: "https://sdc2.psgitech.ac.in/transport/",
      },
      {
        title: "Voucher Management System",
        description:
          "Digitized payment voucher workflow for ~10 PSG institutions, replacing paper-based approvals with a tracked digital pipeline.",
        stack: ["PHP", "MySQL"],
        link: "https://sdc.psgitech.ac.in/voucher25/",
      },
      {
        title: "Rep Allocation System",
        description:
          "Voting and allocation platform for class representatives with an admin dashboard for in-depth analytics and live results.",
        stack: ["PHP", "MySQL"],
        link: "https://sdc.psgitech.ac.in/rep/",
      },
      {
        title: "Student Induction Programme App",
        description:
          "Freshers' guide app for PSG induction — personalized navigation, live timetable updates, and upcoming event notifications.",
        stack: ["PHP", "MySQL"],
        link: "https://sdc2.psgitech.ac.in/sip/",
      },
      {
        title: "VR Flatlock Machine Simulation",
        description:
          "Virtual reality simulation of a 5-thread flatlock machine built in Unity 3D, tested and optimized for Meta Quest 2 for immersive industrial training.",
        stack: ["Unity 3D", "C#", "Meta Quest 2"],
        link: null,
      },
    ],
  },
];
