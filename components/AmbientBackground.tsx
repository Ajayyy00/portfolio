/**
 * Warm ambient backdrop — static, pre-composed radial gradients plus the
 * dotted grid, covering the entire site so every section shares the same
 * atmosphere. No blur filters, no animation loops: renders once, costs
 * nothing per frame.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* warm glows */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(58vw 52vh at 12% 6%, rgba(226, 157, 113, 0.055), transparent 62%)",
            "radial-gradient(52vw 55vh at 90% 92%, rgba(188, 167, 218, 0.05), transparent 62%)",
            "radial-gradient(46vw 44vh at 55% 45%, rgba(228, 197, 126, 0.03), transparent 66%)",
          ].join(", "),
        }}
      />
      {/* dotted grid — same texture as the hero, everywhere */}
      <div className="grid-backdrop absolute inset-0" />
    </div>
  );
}
