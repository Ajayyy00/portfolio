"use client";

import dynamic from "next/dynamic";

/**
 * three.js + @react-three/fiber are heavy — load them in a separate chunk,
 * client-side only, so they never block the initial page's first-load JS.
 */
const Scene3DBackground = dynamic(() => import("./Scene3DBackground"), {
  ssr: false,
});

export default Scene3DBackground;
