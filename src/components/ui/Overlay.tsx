"use client";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./primitives";

const ANSWER = "$38,400 a year";
const POINTS = [
  "Team plan, 400 seats at $8 each, billed annually",
  "Volume pricing starts at 250 seats, so you can offer 15% off",
  "Dana asked about SSO on the Sep 12 call. It's included.",
];

/** The floating overlay itself: what you see during a call. Types its answer once on screen. */
export default function Overlay({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || timer) return;
        if (reduce) {
          setN(ANSWER.length);
          setShown(POINTS.length);
          return;
        }
        let i = 0;
        timer = setInterval(() => {
          i++;
          setN(Math.min(i, ANSWER.length));
          if (i > ANSWER.length) setShown(Math.min(Math.floor((i - ANSWER.length) / 8), POINTS.length));
          if (i > ANSWER.length + POINTS.length * 8) clearInterval(timer);
        }, 55);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  const done = n >= ANSWER.length;

  return (
    <div
      ref={ref}
      className={`glass w-full max-w-[440px] overflow-hidden text-left text-[#eef2fa] ${className}`}
      style={{ background: "rgb(9 20 64 / 0.8)", "--line": "rgb(255 255 255 / .16)" } as React.CSSProperties}
      role="img"
      aria-label="The Notcluely overlay answering a pricing question during a live call"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[12px]">
        <span className="flex items-center gap-2 text-white/90">
          <Mark size={14} /> Notcluely
        </span>
        <span className="flex items-center gap-2 text-white/60">
          <span className="live-dot" /> Listening 12:04
        </span>
      </div>

      <div className="space-y-2 px-4 pt-4 text-[13px] leading-relaxed">
        <p className="text-white/55">
          <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">Dana, Acme</span>
          What would it cost us to roll this out to 400 seats?
        </p>
      </div>

      <div className="px-4 pb-4 pt-3">
        <p className={`dots text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] leading-none text-white ${done ? "" : "caret"}`}>
          {ANSWER.slice(0, n) || " "}
        </p>
        <ul className="mt-4 space-y-2 text-[13px] leading-snug text-white/80">
          {POINTS.map((p, i) => (
            <li
              key={p}
              className="flex gap-2.5 transition-all duration-500"
              style={{ opacity: i < shown ? 1 : 0, transform: `translateY(${i < shown ? 0 : 6}px)` }}
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#8fb3ff]" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-[12px] text-white/65">
        <span className="rounded-full border border-white/15 px-2.5 py-1">Draft follow-up</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1">Add to notes</span>
        <span className="ml-auto flex items-center gap-1">
          <kbd className="rounded border border-white/20 px-1.5">⌘</kbd>
          <kbd className="rounded border border-white/20 px-1.5">↵</kbd>
        </span>
      </div>
    </div>
  );
}
