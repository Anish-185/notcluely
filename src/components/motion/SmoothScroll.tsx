"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lenis + GSAP sync, gallery room colours, and the cursor-reactive glow. */
export default function SmoothScroll() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // in-page anchors go through Lenis so they glide too
      document.addEventListener("click", onAnchor);
    }
    function onAnchor(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || a.getAttribute("href") === "#") return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (el) {
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -20 });
      }
    }

    // Rooms: whichever section crosses a line at 55% of the viewport sets the atmosphere.
    // IntersectionObserver reads live layout, so pin spacers can't leave it stale.
    const rooms = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (root.dataset.activeRoom = (e.target as HTMLElement).dataset.room)),
      { rootMargin: "-55% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-room]").forEach((el) => rooms.observe(el));

    // Cursor glow, fine pointers only.
    let move: ((e: PointerEvent) => void) | null = null;
    if (!reduce && matchMedia("(pointer: fine)").matches && glow.current) {
      const x = gsap.quickTo(glow.current, "x", { duration: 0.8, ease: "power3" });
      const y = gsap.quickTo(glow.current, "y", { duration: 0.8, ease: "power3" });
      move = (e) => {
        x(e.clientX);
        y(e.clientY);
      };
      window.addEventListener("pointermove", move);
      gsap.to(glow.current, { opacity: 1, duration: 1.2 });
    }

    // ScrollTrigger re-measures on load by itself; fonts can land later.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      rooms.disconnect();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      document.removeEventListener("click", onAnchor);
      if (move) window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[520px] w-[520px] rounded-full opacity-0 mix-blend-soft-light"
      style={{ background: "radial-gradient(closest-side, rgb(143 179 255 / 0.55), transparent)", marginLeft: -260, marginTop: -260 }}
    />
  );
}
