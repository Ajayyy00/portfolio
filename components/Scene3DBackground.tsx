"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import { DOMAINS } from "@/lib/domains";
import { useActiveSection } from "@/lib/useActiveSection";

function WireframeIcosahedron({ targetColor }: { targetColor: THREE.Color }) {
  const ref = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => scrollYProgress.on("change", (v) => (scrollRef.current = v)), [scrollYProgress]);

  const geometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.7, 1)),
    [],
  );

  useFrame((state) => {
    const node = ref.current;
    const mat = materialRef.current;
    if (!node || !mat) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    node.rotation.y = t * 0.12 + scroll * Math.PI * 3;
    node.rotation.x = Math.sin(t * 0.08) * 0.25 + scroll * Math.PI * 1.4;
    node.rotation.z = t * 0.05;
    mat.color.lerp(targetColor, 0.02);
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        transparent
        opacity={0.22}
        color="#3B82F6"
      />
    </lineSegments>
  );
}

export default function Scene3DBackground() {
  const [enabled, setEnabled] = useState(false);
  const { domain } = useActiveSection();
  const targetColor = useMemo(() => new THREE.Color(DOMAINS.ai.hex), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  useEffect(() => {
    targetColor.set(DOMAINS[domain].hex);
  }, [domain, targetColor]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <WireframeIcosahedron targetColor={targetColor} />
      </Canvas>
    </div>
  );
}
