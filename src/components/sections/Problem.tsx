"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useScene } from "@/lib/gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import { LoopVideo } from "@/components/ui/primitives";

const BEATS = [
  { at: "00:41:12", text: "Forty minutes in, they ask the one question you didn't prepare for." },
  { at: "00:43:55", text: "Someone quotes a number from last quarter. You were sure you'd remember it." },
  { at: "00:44:30", text: "By the time the answer surfaces, the conversation has moved on without you." },
];

export default function Problem() {
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    const el = root.current!;
    el.dataset.motion = "on";
    const q = gsap.utils.selector(el);
    const beats = q(".beat");
    const backs = q(".back");
    gsap.set(beats.slice(1), { autoAlpha: 0 });
    gsap.set(backs.slice(1), { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: "+=320%", pin: q(".stage")[0], scrub: 0.6 },
    });
    beats.forEach((b, i) => {
      const words = b.querySelectorAll(".w");
      gsap.set(words, { opacity: 0.12 });
      if (i > 0) {
        tl.to(beats[i - 1], { autoAlpha: 0, y: -30, duration: 0.5 });
        tl.to(backs[i], { autoAlpha: 1, duration: 0.8 }, "<");
        tl.fromTo(b, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.2");
      }
      tl.to(words, { opacity: 1, stagger: 0.12, duration: 0.3 });
      tl.to({}, { duration: 0.6 }); // hold
    });
    // the backdrop slowly pushes in the whole time
    tl.fromTo(backs, { scale: 1.12 }, { scale: 1, duration: tl.duration() }, 0);
    return () => delete el.dataset.motion;
  });

  return (
    <section ref={root} id="problem" data-room="storm" className="relative">
      <div className="stage relative flex min-h-svh items-center overflow-hidden py-28">
        <div className="absolute inset-0" aria-hidden>
          <div className="back absolute inset-0">
            <Image src="/assets/img/storm-sea.jpg" alt="" fill sizes="100vw" quality={70} className="object-cover" />
          </div>
          <div className="back absolute inset-0">
            <LoopVideo name="wave" label="" className="h-full w-full object-cover" />
          </div>
          <div className="back absolute inset-0">
            <Image src="/assets/img/storm-clouds.jpg" alt="" fill sizes="100vw" quality={70} className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#111a2c_0%,rgb(17_26_44/0.55)_30%,rgb(17_26_44/0.6)_70%,#111a2c_100%)]" />
        </div>

        <div className="wrap relative">
          <div className="beats grid gap-24 [[data-motion=on]_&]:gap-0">
            {BEATS.map((b) => (
              <div key={b.at} className="beat [[data-motion=on]_&]:[grid-area:1/1]">
                <p className="dots mb-6 flex items-center gap-3 text-[15px] text-white/70">
                  <span className="live-dot" /> {b.at}
                </p>
                <AnimatedText
                  as="p"
                  mode="none"
                  text={b.text}
                  className="display max-w-[20ch] text-white"
                  style={{ fontSize: "var(--step-4)" }}
                />
              </div>
            ))}
          </div>
          <p className="mt-16 max-w-sm text-[15px] text-white/60">
            Every meeting has a moment like this. Most tools help you after the call, when it no longer counts.
          </p>
        </div>
      </div>
    </section>
  );
}
