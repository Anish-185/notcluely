"use client";
import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";
import { LoopVideo } from "@/components/ui/primitives";
import Overlay from "@/components/ui/Overlay";

export default function Reveal() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ isDesktop }) => {
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", pin: q(".stage")[0], scrub: 0.7 },
    });
    // the sky opens from a small window to the whole room
    tl.fromTo(
      q(".sky"),
      { clipPath: isDesktop ? "inset(32% 38% 32% 38% round 28px)" : "inset(30% 18% 30% 18% round 24px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
    )
      .from(q(".sky video"), { scale: 1.5, duration: 1 }, 0)
      .from(q(".r-copy > *"), { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.5 }, 0.7)
      // the overlay condenses out of a field of dots
      .from(q(".r-overlay"), { autoAlpha: 0, scale: 0.9, y: 40, duration: 0.6 }, 0.9)
      .fromTo(q(".r-dots"), { autoAlpha: 1, scale: 1.25 }, { autoAlpha: 0, scale: 1, duration: 0.7 }, 0.9)
      .to({}, { duration: 0.4 });
  });

  return (
    <section ref={root} id="reveal" data-room="sky" className="relative">
      <div className="stage relative flex min-h-svh items-center overflow-hidden py-24">
        <div className="sky absolute inset-0" aria-hidden>
          <LoopVideo name="clouds" label="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_87_208/0.85)_0%,rgb(11_87_208/0.35)_55%,rgb(11_87_208/0.1)_100%)]" />
        </div>

        <div className="wrap relative grid items-center gap-14 md:grid-cols-[1.05fr_1fr]">
          <div className="r-copy">
            <h2 className="display text-white" style={{ fontSize: "var(--step-4)" }}>
              Then a small window appears. It was listening the whole time.
            </h2>
            <p className="mt-7 max-w-[44ch] text-[length:var(--step-1)] leading-relaxed text-white/85">
              Notcluely floats above any app, hears both sides of the conversation and has an answer ready before
              you&rsquo;ve finished the thought. It stays out of screen shares and recordings, so the only person who
              sees it is you.
            </p>
            <ul className="mt-9 flex flex-wrap gap-2 text-[13px] text-white/90">
              {["No bot in the meeting", "Hidden from screen share", "Under half a second"].map((t) => (
                <li key={t} className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="r-dots dotfield pointer-events-none absolute opacity-0 -inset-10 rounded-[40px] text-white/70 [mask-image:radial-gradient(closest-side,#000,transparent)]" aria-hidden />
            <div className="r-overlay">
              <Overlay />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
