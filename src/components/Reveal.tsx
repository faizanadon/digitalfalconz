"use client";
import { Reveal } from "./Motion";
import type { ReactNode } from "react";

/** Back-compat wrapper — now powered by Framer Motion (see Motion.tsx). */
export default function RevealCompat({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <Reveal className={className} delay={delay}>{children}</Reveal>;
}
