"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/animations";
import Magnetic from "./Magnetic";

const ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0112 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
};

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — fall through silently
    }
  };

  return (
    <button
      onClick={copy}
      className="group relative mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-ai/40 bg-ai/[0.06] px-5 py-4 transition-colors duration-300 hover:border-ai/70 hover:bg-ai/10 active:scale-[0.97] sm:px-7"
      aria-live="polite"
    >
      <span className="mono break-all text-sm text-text sm:text-lg">{site.email}</span>
      <span className="relative grid h-6 w-14 place-items-center overflow-hidden rounded-full bg-ai/15 text-[10px] font-semibold uppercase tracking-wider text-ai">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              ✓ done
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              copy
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

export default function Contact() {
  const links = [
    { key: "email", label: "Email", href: `mailto:${site.email}` },
    { key: "github", label: "GitHub", href: site.github },
    { key: "linkedin", label: "LinkedIn", href: site.linkedin },
  ];

  return (
    <section id="contact" data-domain="ai" className="scroll-mt-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.12)}
        className="mx-auto flex max-w-5xl flex-col items-center px-5 py-28 text-center sm:py-40"
      >
        <motion.h2
          variants={fadeUp}
          className="display mt-4 text-[clamp(2.6rem,7.5vw,6.5rem)] font-semibold leading-[1.02] tracking-tight text-text"
        >
          Let&rsquo;s build{" "}
          <em className="text-ai">something</em>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-base text-text-muted"
        >
          I&rsquo;m looking for software development internships and roles.
          Email&rsquo;s the fastest way to reach me — copy it below, or just
          say hi.
        </motion.p>

        <motion.div variants={fadeUp}>
          <CopyEmail />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {links.map((l) => (
            <Magnetic key={l.key} strength={0.3}>
              <a
                href={l.href}
                target={l.key === "email" ? undefined : "_blank"}
                rel={l.key === "email" ? undefined : "noopener noreferrer"}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-5 py-3 text-sm text-text shadow-card transition-[color,border-color,transform] duration-300 hover:border-ai/50 hover:text-ai active:scale-95"
              >
                <span className="text-text-muted transition-colors group-hover:text-ai">
                  {ICONS[l.key]}
                </span>
                {l.label}
              </a>
            </Magnetic>
          ))}
        </motion.div>

        <motion.footer
          variants={fadeUp}
          className="mono mt-20 text-xs text-text-muted"
        >
          © {new Date().getFullYear()} Ajay C · Built with Next.js, Tailwind &
          Framer Motion
        </motion.footer>
      </motion.div>
    </section>
  );
}
