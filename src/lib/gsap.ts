"use client";
import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Ctx = { isDesktop: boolean };

/**
 * Runs a GSAP scene scoped to `ref`, only when the visitor allows motion.
 * Content is fully visible by default, so reduced-motion gets the static page.
 */
export function useScene(ref: RefObject<HTMLElement | null>, scene: (ctx: Ctx) => void | (() => void), deps: unknown[] = []) {
  useIso(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia(ref.current);
    mm.add(
      { ok: "(prefers-reduced-motion: no-preference)", isDesktop: "(min-width: 900px)" },
      (c) => {
        const { ok, isDesktop } = c.conditions as { ok: boolean; isDesktop: boolean };
        if (ok) return scene({ isDesktop });
      },
    );
    return () => mm.revert();
  }, deps);
}
