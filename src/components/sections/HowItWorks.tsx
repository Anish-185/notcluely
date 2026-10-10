"use client";
import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";
import { Art, SectionHeading } from "@/components/ui/primitives";

const STEPS = [
  {
    n: "1",
    title: "Listen",
    body: "Notcluely captures your microphone and your computer's audio, so it hears both sides of any call without joining it. Speech becomes text as it is spoken.",
    img: "halftone-blobs.jpg",
    alt: "Halftone blobs of light, like sound rendered as dots",
    detail: <Listen />,
  },
  {
    n: "2",
    title: "Understand",
    body: "It reads what is on your screen, the slide, the code, the contract, and connects it to the last thing someone said.",
    img: "cloud-grid.jpg",
    alt: "A grid laid over a blue sky with one square highlighted in red",
    detail: <Understand />,
  },
  {
    n: "3",
    title: "Answer",
    body: "A short, glanceable answer appears in the overlay, written to be read mid-sentence. Ask a follow-up with one keystroke.",
    img: "halftone-figure.jpg",
    alt: "A figure built from halftone dots emerging from a blue grid",
    detail: <Answer />,
  },
  {
    n: "4",
    title: "Remember",
    body: "After the call, the transcript, notes and decisions are filed into your private memory. Next time, it already knows the context.",
    img: "flower-dither.jpg",
    alt: "A dithered white flower pressed against a blue grid, like a cyanotype herbarium print",
    detail: <Remember />,
  },
];

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ isDesktop }) => {
    if (!isDesktop) return;
    const el = root.current!;
    el.dataset.motion = "on";
    const q = gsap.utils.selector(el);
    const steps = q(".step");
    const ticks = q(".tick");
    gsap.set(steps.slice(1), { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q(".stage")[0], start: "top top", end: "+=300%", pin: true, scrub: 0.6 },
    });
    tl.to(q(".bar"), { scaleY: 1, duration: steps.length }, 0);
    steps.forEach((s, i) => {
      if (i === 0) return;
      const at = i - 0.3;
      tl.to(steps[i - 1], { autoAlpha: 0, duration: 0.25 }, at)
        .fromTo(s.querySelector(".plate"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.35 }, at)
        .fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, at + 0.05)
        .to(ticks[i], { opacity: 1, duration: 0.1 }, at)
        .to(ticks[i - 1], { opacity: 0.6, duration: 0.1 }, at);
    });
    return () => delete el.dataset.motion;
  });

  return (
    <section ref={root} id="how" data-room="ink" className="relative">
      <div className="wrap pt-[var(--section)]">
        <SectionHeading
          title="Four things happen in the half second after someone stops talking."
          lede="No setup per meeting, no bot to admit, no tab to switch to. Open your call and Notcluely is already working."
          measure="22ch"
          size="var(--step-3)"
        />
      </div>

      <div className="stage relative flex min-h-svh items-center py-16">
        <div className="wrap grid gap-10 lg:[[data-motion=on]_&]:grid-cols-[180px_1fr]">
          {/* sequence index, only meaningful while pinned */}
          <div className="hidden self-center lg:[[data-motion=on]_&]:block" aria-hidden>
            <div className="relative pl-6">
              <span className="absolute left-0 top-0 h-full w-px bg-line" />
              <span className="bar absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[var(--signal)]" />
              {STEPS.map((s, i) => (
                <p key={s.n} className="tick py-3 text-[15px] transition-opacity" style={{ opacity: i === 0 ? 1 : 0.6 }}>
                  <span className="dots mr-3">{s.n}</span>
                  {s.title}
                </p>
              ))}
            </div>
          </div>

          <div className="steps grid gap-24 [[data-motion=on]_&]:gap-0">
            {STEPS.map((s) => (
              <article key={s.n} className="step grid items-center gap-10 md:grid-cols-2 [[data-motion=on]_&]:[grid-area:1/1]">
                <div>
                  <p className="dots text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-[var(--wash)]">{s.n}</p>
                  <h3 className="display mt-4" style={{ fontSize: "var(--step-3)" }}>
                    {s.title}
                  </h3>
                  <p className="prose-dim mt-5 max-w-[42ch] text-[length:var(--step-1)] leading-relaxed">{s.body}</p>
                </div>
                <div className="plate aspect-[4/3.4]">
                  <Art src={s.img} alt={s.alt} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071033]/70 via-transparent to-transparent" />
                  {s.detail}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* small live details pinned onto each plate */
function Listen() {
  return (
    <div className="absolute inset-x-5 bottom-5 flex items-end gap-[3px]" aria-hidden>
      {Array.from({ length: 48 }, (_, i) => (
        <span
          key={i}
          className="w-full rounded-full bg-white/85"
          style={{
            height: `${10 + Math.abs(Math.sin(i * 0.7) * 40 + Math.cos(i * 0.31) * 18)}px`,
            animation: `eq 1.${(i % 7) + 2}s ${i * 0.03}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`@keyframes eq{to{transform:scaleY(.35)}}`}</style>
    </div>
  );
}
function Understand() {
  return (
    <div className="absolute left-[42%] top-[30%] h-[26%] w-[24%] border-2 border-[var(--signal)]" aria-hidden>
      <span className="absolute -top-7 left-0 whitespace-nowrap rounded bg-[#c42a20] px-2 py-0.5 text-[11px] text-white">
        Reading: pricing deck, slide 4
      </span>
    </div>
  );
}
function Answer() {
  return (
    <div className="glass absolute inset-x-5 bottom-5 p-4 text-[13px] text-white" style={{ background: "rgb(9 20 64 / .75)" }} aria-hidden>
      <p className="dots text-xl">Yes, SOC 2 Type II</p>
      <p className="mt-1 text-white/75">Report dated March 2026. Offer to send it after the call.</p>
    </div>
  );
}
function Remember() {
  return (
    <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 text-[12px] text-white" aria-hidden>
      {["Saved to Acme renewal", "3 action items", "Dana prefers annual billing", "Next call Oct 21"].map((t) => (
        <span key={t} className="rounded-full border border-white/25 bg-[#071033]/60 px-3 py-1 backdrop-blur-md">
          {t}
        </span>
      ))}
    </div>
  );
}
