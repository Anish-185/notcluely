"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useScene } from "@/lib/gsap";
import { Mark } from "@/components/ui/primitives";
import AnimatedText from "@/components/ui/AnimatedText";

export default function Epilogue() {
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    const q = gsap.utils.selector(root);
    const st = { trigger: root.current, start: "top bottom", end: "center center", scrub: 0.8 };
    gsap.fromTo(q(".e-left"), { xPercent: -40 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    gsap.fromTo(q(".e-right"), { xPercent: 40 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    gsap.from(q(".e-mark"), { scale: 0, rotate: -90, ease: "back.out(1.6)", duration: 1.2, scrollTrigger: { trigger: q(".e-mark")[0], start: "top 75%", once: true } });
  });

  return (
    <section ref={root} id="download" data-room="cobalt" className="section relative overflow-hidden text-center">
      <div className="relative mx-auto flex max-w-[1500px] items-center justify-between" aria-hidden>
        <div className="e-left relative aspect-[360/280] w-[40vw] max-w-[620px]">
          <Image src="/assets/img/hands-dots-left.png" alt="" fill unoptimized className="[image-rendering:pixelated]" />
        </div>
        <div className="e-mark grid h-[min(9vw,96px)] w-[min(9vw,96px)] shrink-0 place-items-center rounded-full bg-white text-[#2340ff] shadow-[0_0_80px_20px_rgb(255_255_255/0.35)] -translate-y-[60%]">
          <Mark size={44} />
        </div>
        <div className="e-right relative mt-[6vw] aspect-[336/280] w-[37vw] max-w-[580px]">
          <Image src="/assets/img/hands-dots-right.png" alt="" fill unoptimized className="[image-rendering:pixelated]" />
        </div>
      </div>

      <div className="wrap relative -mt-[4vw]">
        <AnimatedText
          as="h2"
          text="The next question is already on its way."
          className="display mx-auto max-w-[16ch] text-white"
          style={{ fontSize: "var(--step-5)" }}
        />
        <p className="mx-auto mt-7 max-w-[44ch] text-[length:var(--step-1)] leading-relaxed text-white/85">
          Install Notcluely in under a minute and walk into your next call with someone quietly on your side.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#" className="btn !h-14 !bg-white !px-7 !text-[var(--ink)] hover:shadow-[0_14px_50px_-10px_rgb(255_255_255/0.7)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3Z" />
            </svg>
            Download for macOS
          </a>
          <a href="#" className="btn !h-14 border border-white/40 !px-7 text-white hover:bg-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 5.1 10.4 4v7.1H3V5.1Zm0 13.8 7.4 1.1v-7H3v5.9Zm8.3 1.2L21 21.5v-8.4h-9.7v7Zm0-16.2v7.2H21V2.5l-9.7 1.4Z" />
            </svg>
            Download for Windows
          </a>
        </div>
        <p className="mt-6 text-[13px] text-white/70">Version 3.2, 41 MB. macOS 13 or later, Windows 10 or later.</p>
      </div>
    </section>
  );
}
