export interface Certification {
  name: string;
  issuer: string;
  date: string;
  /** Short tag for the logo placeholder. */
  badge: string;
  /** Brand-ish accent for the issuer logo placeholder. */
  color: string;
  /** Credential verification URL, if available. */
  verify?: string;
}

/** Populated from the attached resume. No public credential URLs were
 *  available, so verify buttons are omitted. */
export const certifications: Certification[] = [
  {
    name: "Foundation Level Certification in Data Science",
    issuer: "IIT Madras",
    date: "2025",
    badge: "IITM",
    color: "#10B981",
  },
  {
    name: "Data Structures & Algorithms using Java",
    issuer: "NPTEL · Top 5% Rank",
    date: "2025",
    badge: "NPTEL",
    color: "#3B82F6",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    badge: "OCI",
    color: "#F59E0B",
  },
];
