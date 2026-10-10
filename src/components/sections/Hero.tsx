"use client";
import { useRef } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { gsap, useScene } from "@/lib/gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import Overlay from "@/components/ui/Overlay";

const hand = (side: "left" | "right"): React.CSSProperties => ({
  maskImage: `url(/assets/img/hand-${side}.png)`,
  WebkitMaskImage: `url(/assets/img/hand-${side}.png)`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: side === "left" ? "left center" : "right center",
  WebkitMaskPosition: side === "left" ? "left center" : "right center",
  background: "currentColor",
});

export default function Hero() {
  preload("/assets/img/hand-left.png", { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });
  preload("/assets/img/hand-right.png", { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ isDesktop }) => {
    const q = gsap.utils.selector(root);
    // one orchestrated opening
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(q(".h-left"), { xPercent: -45, opacity: 0, duration: 2.2 }, 0.1)
      .from(q(".h-right"), { xPercent: 45, opacity: 0, duration: 2.2 }, 0.1);

    // scroll: the hands close the gap, the fresco recedes
    const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to(q(".h-left"), { xPercent: isDesktop ? 9 : 4, scrollTrigger: st });
    gsap.to(q(".h-right"), { xPercent: isDesktop ? -9 : -4, scrollTrigger: st });
    gsap.to(q(".h-fresco"), { yPercent: 18, opacity: 0, scrollTrigger: st });
  });

  return (
    <section ref={root} id="top" data-room="ink" className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      {/* ceiling fresco, faint, like a painted sky above the room */}
      <div
        className="h-fresco pointer-events-none absolute inset-x-0 top-0 hidden h-[85vh] sm:block opacity-[0.22] mix-blend-luminosity [mask-image:radial-gradient(70%_80%_at_50%_0%,#000_30%,transparent_80%)]"
        aria-hidden
      >
        <Image src="/assets/img/fresco.jpg" alt="" fill fetchPriority="high" loading="eager" sizes="(min-width: 640px) 100vw, 1px" quality={70} className="object-cover" />
      </div>
      <div className="bloom left-[10%] top-[35%] h-[40vw] w-[40vw] bg-[#2340ff]/35" aria-hidden />
      <div className="bloom right-[5%] top-[50%] h-[30vw] w-[30vw] bg-[#5b86e5]/30 [animation-delay:-7s]" aria-hidden />

      <div className="wrap relative z-10 text-center">
        <AnimatedText
          as="h1"
          text="Say the right thing while it still matters."
          className="display mx-auto max-w-[17ch]"
          style={{ fontSize: "clamp(2.9rem, 1.6rem + 5.2vw, 6.6rem)" }}
          mode="css"
          delay={0.2}
        />
        <p className="fade-up lede mx-auto mt-6 max-w-[46ch]" style={{ animationDelay: ".6s" }}>
          Notcluely listens to your calls, reads your screen and slips you the answer in a quiet overlay only you can
          see. No bot joins the meeting.
        </p>
        <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: ".7s" }}>
          <a href="#download" className="btn btn-primary">
            <AppleGlyph /> Download for macOS
          </a>
          <a href="#how" className="btn btn-ghost">
            See how it works
          </a>
        </div>
        <p className="fade-up mt-4 text-[13px] text-dim" style={{ animationDelay: ".8s" }}>Also on Windows. Free to start, no card needed.</p>
      </div>

      {/* the creation scene: human hand, machine hand, and the answer between them */}
      <div className="relative z-10 mt-12 sm:mt-14">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-[min(27vw,380px)] -translate-y-[55%]">
          <div className="h-left absolute left-0 top-0 h-full w-[46vw] max-w-[760px]" style={hand("left")} />
          <div className="h-right absolute right-0 top-0 h-full w-[46vw] max-w-[760px]" style={hand("right")} />
        </div>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[560px] max-w-full -translate-x-1/2 -translate-y-8 bg-[radial-gradient(closest-side,rgb(35_64_255/0.55),transparent)]" />
        <div className="fade-up relative mx-auto w-[min(440px,calc(100%-2rem))]" style={{ animationDelay: ".9s", animationDuration: "1.6s" }}>
          <Overlay />
        </div>
        <p className="fade-up wrap mt-8 text-center text-[13px] text-dim" style={{ animationDelay: "1.2s" }}>
          Fig. 1. A pricing question on a sales call, answered in 0.4 seconds.
        </p>
      </div>

      <a
        href="#problem"
        className="fade-up group mx-auto mt-14 flex w-fit flex-col items-center gap-3 text-[12px] text-dim hover:text-fg"
        aria-label="Scroll to the story"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2.2s_var(--ease-in-out)_infinite] bg-current" />
        </span>
      </a>
      <style>{`@keyframes cue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}

function AppleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3Z" />
    </svg>
  );
}
