"use client";

import { motion } from "framer-motion";
import { DOMAINS, type Domain } from "@/lib/domains";

/** Three layers, mirroring the SEAM SIH process-flow legend
 *  (Backend / Frontend / Output), mapped onto the site palette. */
type Layer = "frontend" | "backend" | "output";

const LAYER: Record<Layer, { domain: Domain; name: string }> = {
  frontend: { domain: "ai", name: "Frontend" },
  backend: { domain: "security", name: "Backend" },
  output: { domain: "fullstack", name: "Output" },
};

const col = (l: Layer) => DOMAINS[LAYER[l].domain];

function Node({
  label,
  sub,
  layer,
  compact,
  delay = 0,
}: {
  label: string;
  sub?: string;
  layer: Layer;
  compact?: boolean;
  delay?: number;
}) {
  const c = col(layer);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-lg border bg-surface/60"
      style={{ borderColor: `rgba(${c.rgb}, 0.3)` }}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: c.hex }}
      />
      <div className={compact ? "py-2 pl-3 pr-2.5" : "py-2.5 pl-4 pr-3"}>
        <h5
          className={`font-semibold leading-snug text-text ${compact ? "text-[12px]" : "text-sm"}`}
        >
          {label}
        </h5>
        {sub && (
          <p className="mt-0.5 text-[11px] leading-snug text-text-muted">{sub}</p>
        )}
      </div>
    </motion.div>
  );
}

/** Vertical connector with downward-flowing dots. */
function Arrow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex justify-center py-1.5">
      <div className="flex flex-col items-center gap-[3px]">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1 w-1 rounded-full bg-text-muted"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: delay + d * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Y-shaped connector: split (one → two) or merge (two → one). */
function Fork({ mode }: { mode: "split" | "merge" }) {
  const d =
    mode === "split" ? "M50 1 L26 19 M50 1 L74 19" : "M26 1 L50 19 M74 1 L50 19";
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className="my-0.5 h-4 w-full"
      fill="none"
      aria-hidden
    >
      <path
        d={d}
        stroke="#2c2c44"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function SeamArchitecture() {
  return (
    <div>
      {/* layer legend */}
      <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1.5">
        {(["frontend", "backend", "output"] as Layer[]).map((l) => (
          <span
            key={l}
            className="mono inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-muted"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: col(l).hex }}
            />
            {LAYER[l].name}
          </span>
        ))}
      </div>

      <Node
        layer="frontend"
        label="Frontend · React + Material-UI"
        sub="Pages hosted on Firebase & Azure Cloud"
        delay={0}
      />
      <Arrow />
      <Node
        layer="backend"
        label="Security Layer"
        sub="OWASP ZAP scan · HTTPS · CORS · Azure DDoS"
        delay={0.06}
      />
      <Arrow />

      <p className="mono mb-1 text-center text-[10px] uppercase tracking-[0.18em] text-text-muted">
        User Inputs
      </p>
      <Fork mode="split" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Node compact layer="frontend" label="Aadhaar Number" delay={0.12} />
          <Arrow delay={0.3} />
          <Node
            compact
            layer="backend"
            label="Validate · Azure SQL"
            sub="AES-256-CBC dataset"
            delay={0.18}
          />
        </div>
        <div>
          <Node compact layer="frontend" label="Live Webcam Feed" delay={0.15} />
          <Arrow delay={0.5} />
          <Node
            compact
            layer="backend"
            label="Liveliness Detection"
            sub="Blink + head movement"
            delay={0.21}
          />
        </div>
      </div>

      <Fork mode="merge" />

      <Node
        layer="frontend"
        label="Face Authentication · Face-API.js"
        sub="Models AES-256-encrypted, browser-cached, run on-device"
        delay={0.27}
      />
      <Arrow />
      <Node
        layer="frontend"
        label="68 Landmarks → 128-D Descriptors"
        sub="Compared vs UIDAI face · 0.45 match threshold"
        delay={0.33}
      />
      <Arrow />
      <Node
        layer="output"
        label="✓ Authenticated → Profile page"
        sub="Redirect on successful match"
        delay={0.39}
      />

      <p className="mono mt-4 border-l-2 border-border pl-3 text-[11px] leading-relaxed text-text-muted">
        Mirrors the SIH 2024 process flow — a Firebase/Azure frontend, a
        ZAP-hardened AES-256 backend, and on-device Face-API.js authentication
        that converges the Aadhaar and liveness checks before granting access.
      </p>
    </div>
  );
}
