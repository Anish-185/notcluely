"use client";
import { useRef, type ElementType } from "react";
import { gsap, useScene } from "@/lib/gsap";

/**
 * Splits text into words. mode "rise": words lift out of a mask when scrolled into view.
 * mode "css": the same rise as a CSS animation, for above-the-fold text that must paint before JS.
 * mode "none": markup only, so a parent timeline can drive the `.w` spans (e.g. a scrubbed reveal).
 */
export default function AnimatedText({
  text,
  as: Tag = "p",
  className = "",
  style,
  mode = "rise",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  mode?: "rise" | "css" | "none";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, () => {
    if (mode !== "rise") return;
    gsap.from(ref.current!.querySelectorAll(".w"), {
      yPercent: 110,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.035,
      delay,
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <span className={`inline-block pb-[0.08em] align-top ${mode === "css" ? "" : "overflow-hidden"}`}>
            <span
              className={`w inline-block ${mode === "css" ? "rise-word" : "will-change-transform"}`}
              style={mode === "css" ? { animationDelay: `${delay + i * 0.035}s` } : undefined}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
