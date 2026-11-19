"use client";
import { useInView, type TargetAndTransition } from "framer-motion";
import { useRef } from "react";

/**
 * Performance: endless decorative loops (floating chips, pulsing dots,
 * rotating rings) only run while their graphic is on screen (with a 200px
 * buffer). Off screen — or with reduced motion — they rest on their first
 * keyframe, so the browser isn't animating dozens of hidden elements every
 * frame. Looks identical to visitors; the loop simply resumes on scroll-in.
 */
export function useLoopGate<T extends Element = HTMLDivElement>(reduce: boolean | null) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });
  return [ref, !reduce && inView] as const;
}

type Target = Record<string, unknown>;
/** Loop target when `on`; otherwise the first keyframe, applied instantly. */
export function gate(on: boolean, target: TargetAndTransition): TargetAndTransition {
  if (on) return target;
  const rest: Target = { transition: { duration: 0 } };
  const src = target as Target;
  for (const k in src) {
    const v = src[k];
    rest[k] = Array.isArray(v) ? v[0] : v;
  }
  return rest as TargetAndTransition;
}
