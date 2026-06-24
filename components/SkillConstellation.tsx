"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { DOMAINS, type Domain } from "@/lib/domains";

interface OrbitItem {
  label: string;
  domain: Domain;
}

interface RingDef {
  /** radius as a percentage of the container half-extent */
  radius: number;
  /** rotation speed in deg/sec; sign sets direction */
  speed: number;
  /** starting angle offset in degrees */
  phase: number;
  items: OrbitItem[];
}

const RINGS: RingDef[] = [
  {
    radius: 19,
    speed: 13,
    phase: 0,
    items: [
      { label: "FastAPI", domain: "fullstack" },
      { label: "ChromaDB", domain: "ai" },
      { label: "Gemini", domain: "ai" },
      { label: "React", domain: "fullstack" },
    ],
  },
  {
    radius: 29,
    speed: -9,
    phase: 25,
    items: [
      { label: "LangGraph", domain: "ai" },
      { label: "Claude Code", domain: "ai" },
      { label: "Docker", domain: "ai" },
      { label: "Unsloth", domain: "ai" },
      { label: "MySQL", domain: "ai" },
    ],
  },
  {
    radius: 38,
    speed: 6.5,
    phase: 12,
    items: [
      { label: "Firebase Studio", domain: "fullstack" },
      { label: "Antigravity", domain: "systems" },
      { label: "Node.js", domain: "fullstack" },
      { label: "Tailwind", domain: "fullstack" },
      { label: "AgentBeats", domain: "ai" },
    ],
  },
  {
    radius: 46,
    speed: -4.5,
    phase: 6,
    items: [
      { label: "Python", domain: "systems" },
      { label: "LightGBM", domain: "ai" },
      { label: "AES-256", domain: "security" },
      { label: "Redis", domain: "ai" },
      { label: "Neo4j", domain: "ai" },
      { label: "Vercel", domain: "fullstack" },
    ],
  },
];

const ALL = RINGS.flatMap((r) => r.items);
const TOTAL = ALL.length;

function Chip({
  item,
  counter,
  left,
  top,
  onActivate,
  onDeactivate,
}: {
  item: OrbitItem;
  counter: MotionValue<number>;
  left: number;
  top: number;
  onActivate: (item: OrbitItem) => void;
  onDeactivate: () => void;
}) {
  const accent = DOMAINS[item.domain];
  const chipVars: Record<string, string> = {
    "--accent": accent.hex,
    "--accent-faint": `rgba(${accent.rgb}, 0.35)`,
  };

  return (
    <motion.div
      className="absolute"
      style={{ left: `${left}%`, top: `${top}%`, x: "-50%", y: "-50%", rotate: counter }}
    >
      <button
        type="button"
        data-cursor="hover"
        onMouseEnter={() => onActivate(item)}
        onMouseLeave={onDeactivate}
        onFocus={() => onActivate(item)}
        onBlur={onDeactivate}
        className="orbit-chip mono whitespace-nowrap rounded-full border bg-surface/80 px-2 py-0.5 text-[10px] backdrop-blur-sm"
        style={chipVars as React.CSSProperties}
      >
        {item.label}
      </button>
    </motion.div>
  );
}

const Ring = memo(function Ring({
  def,
  pausedRef,
  onActivate,
  onDeactivate,
}: {
  def: RingDef;
  pausedRef: React.MutableRefObject<boolean>;
  onActivate: (item: OrbitItem) => void;
  onDeactivate: () => void;
}) {
  const rot = useMotionValue(def.phase);
  const counter = useTransform(rot, (v) => -v);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced.current || pausedRef.current) return;
    rot.set(rot.get() + def.speed * (delta / 1000));
  });

  return (
    <motion.div className="absolute inset-0" style={{ rotate: rot }}>
      {def.items.map((item, i) => {
        const a =
          (Math.PI * 2 * i) / def.items.length + (def.phase * Math.PI) / 180;
        const left = 50 + Math.cos(a) * def.radius;
        const top = 50 + Math.sin(a) * def.radius;
        return (
          <Chip
            key={item.label}
            item={item}
            counter={counter}
            left={left}
            top={top}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          />
        );
      })}
    </motion.div>
  );
});

export default function SkillConstellation() {
  const pausedRef = useRef(false);
  const [active, setActive] = useState<OrbitItem | null>(null);
  const [cycle, setCycle] = useState(0);

  const onActivate = useCallback((item: OrbitItem) => setActive(item), []);
  const onDeactivate = useCallback(() => setActive(null), []);

  // Gently cycle the core through the stack when the user isn't hovering.
  useEffect(() => {
    const id = setInterval(() => setCycle((i) => (i + 1) % TOTAL), 2200);
    return () => clearInterval(id);
  }, []);

  const shown = active ?? ALL[cycle];
  const coreColor = DOMAINS[shown.domain].hex;

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[440px]"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* ambient glow (follows the active colour) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[18%] rounded-full blur-3xl"
        animate={{ backgroundColor: `${coreColor}26` }}
        transition={{ duration: 0.6 }}
      />

      {/* orbit guide rings */}
      {RINGS.map((r) => (
        <div
          key={r.radius}
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70"
          style={{ width: `${r.radius * 2}%`, height: `${r.radius * 2}%` }}
        />
      ))}

      {/* radar pulses from the core */}
      {[0, 1.4].map((d) => (
        <motion.div
          key={d}
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: coreColor }}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: d }}
        />
      ))}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 grid h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border border-border bg-surface/80 text-center backdrop-blur-sm">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: `inset 0 0 30px -8px ${coreColor}, 0 0 26px -10px ${coreColor}`,
          }}
          transition={{ duration: 0.6 }}
        />
        <div className="relative px-1.5">
          <p className="mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
            {TOTAL} tools
          </p>
          <motion.p
            key={shown.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-1 text-xs font-semibold leading-tight sm:text-sm"
            style={{ color: coreColor }}
          >
            {shown.label}
          </motion.p>
        </div>
      </div>

      {/* rings */}
      {RINGS.map((def, i) => (
        <Ring
          key={i}
          def={def}
          pausedRef={pausedRef}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  );
}
