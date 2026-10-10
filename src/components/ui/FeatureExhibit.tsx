"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useScene } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { WallLabel } from "./primitives";

export type Pin = { x: number; y: number; text: string };

export type Exhibit = {
  id: string;
  plate: string;
  name: string;
  title: string;
  body: string;
  details: string[];
  label: string[];
  room: "ink" | "cobalt";
  visual: ReactNode;
  demo?: ReactNode;
  extra?: ReactNode;
  pins?: Pin[];
  aspect?: string;
};

/** One gallery room: a framed plate, pinned annotations, and a wall label. */
export default function FeatureExhibit({ ex, flip }: { ex: Exhibit; flip?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    const q = gsap.utils.selector(root);
    gsap.fromTo(
      q(".ex-media"),
      { yPercent: -6, scale: 1.12 },
      { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
    );
    gsap.from(q(".ex-frame"), {
      clipPath: "inset(12% 12% 12% 12%)",
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: q(".ex-frame")[0], start: "top 80%", once: true },
    });
    if (ex.pins) gsap.from(q(".ex-pin"), {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(2)",
      scrollTrigger: { trigger: q(".ex-frame")[0], start: "top 55%", once: true },
    });
    gsap.from(q(".ex-copy > *:not(h3)"), {
      y: 24,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: q(".ex-copy")[0], start: "top 80%", once: true },
    });
  });

  return (
    <section ref={root} id={ex.id} data-room={ex.room} aria-label={ex.name} className="relative py-[calc(var(--section)*0.75)]">
      <div className="wrap grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
        <figure className={`relative lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
          <div className={`ex-frame plate ${ex.aspect ?? "aspect-[4/3.2]"}`}>
            <div className="ex-media absolute inset-0">{ex.visual}</div>
            {ex.demo}
          </div>
          {ex.pins?.map((p) => (
            <span
              key={p.text}
              className="ex-pin absolute hidden items-center gap-2 md:flex"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-hidden
            >
              <span className="relative grid h-4 w-4 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />
                <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_0_3px_rgb(35_64_255/0.6)]" />
              </span>
              <span className="whitespace-nowrap rounded-full border border-white/25 bg-[#071033]/70 px-3 py-1 text-[12px] text-white backdrop-blur-md">
                {p.text}
              </span>
            </span>
          ))}
        </figure>

        <div className={`ex-copy lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
          <AnimatedText as="h3" text={ex.title} className="display" style={{ fontSize: "var(--step-3)" }} />
          <p className="prose-dim mt-6 leading-relaxed">{ex.body}</p>
          <ul className="mt-6 space-y-2.5 text-[15px]">
            {ex.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                {d}
              </li>
            ))}
          </ul>
          {ex.extra}
          <WallLabel plate={ex.plate} title={ex.name} lines={ex.label} />
        </div>
      </div>
    </section>
  );
}
