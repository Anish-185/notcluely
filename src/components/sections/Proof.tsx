"use client";
import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// Placeholder figures and customers until real data is available.
const STATS = [
  { v: 0.4, d: 1, suffix: "s", label: "median time from question to first word of an answer" },
  { v: 52, d: 0, suffix: "", label: "languages transcribed, 30 translated live" },
  { v: 2.1, d: 1, suffix: "M", label: "meetings handled last month" },
  { v: 4.9, d: 1, suffix: "", label: "average rating across 18,000 reviews" },
];
const LOGOS = ["Northwind", "Halcyon", "Parcel & Post", "Orbital", "Fieldwork", "Lumen Labs", "Meridian", "Copperleaf"];
const QUOTES = [
  {
    q: "I stopped dreading the pricing question. The number is on screen before the customer finishes asking it.",
    who: "Account executive, Northwind",
  },
  {
    q: "It caught a commitment I made on a Tuesday call and reminded me Thursday morning. That alone saved the account.",
    who: "Customer success lead, Halcyon",
  },
  {
    q: "I take lectures in my second language. Reading the translation live means I finally ask questions in class.",
    who: "Graduate student, Meridian University",
  },
];

export default function Proof() {
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const end = +el.dataset.count!;
      const d = +el.dataset.d!;
      const o = { v: 0 };
      el.textContent = (0).toFixed(d);
      gsap.to(o, {
        v: end,
        duration: 2.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => (el.textContent = o.v.toFixed(d)),
      });
    });
  });

  return (
    <section ref={root} id="proof" data-room="cobalt" className="section overflow-hidden">
      <div className="wrap">
        <p className="text-center text-[14px] text-white/70">Trusted in conversations at teams like these (placeholder names)</p>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="Customer logos, placeholders">
        <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-16 hover:[animation-play-state:paused]">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <li key={i} aria-hidden={i >= LOGOS.length} className={`whitespace-nowrap text-[1.7rem] text-white/80 ${i % 3 === 0 ? "dots" : i % 3 === 1 ? "display italic" : "font-semibold tracking-tight"}`}>
              {l}
            </li>
          ))}
        </ul>
        <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
      </div>

      <div className="wrap mt-[calc(var(--section)*0.6)]">
        <dl className="grid gap-x-8 gap-y-12 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="dots block text-[clamp(3.5rem,2.5rem+4vw,6.5rem)] leading-none">
                  <span data-count={s.v} data-d={s.d}>
                    {s.v.toFixed(s.d)}
                  </span>
                  {s.suffix}
                </span>
                <span className="mt-4 block max-w-[24ch] text-[15px] text-white/75" aria-hidden>
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-[calc(var(--section)*0.6)] grid gap-6 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <blockquote className="display text-[length:var(--step-3)] leading-[1.08]">“{QUOTES[0].q}”</blockquote>
            <figcaption className="mt-6 text-[15px] text-white/70">{QUOTES[0].who} (placeholder)</figcaption>
          </figure>
          <div className="grid gap-4 lg:col-span-4 lg:col-start-9">
            {QUOTES.slice(1).map((t) => (
              <figure key={t.who} className="glass p-6" style={{ "--line": "rgb(255 255 255 / .22)", "--glass": "rgb(255 255 255 / .08)" } as React.CSSProperties}>
                <blockquote className="leading-relaxed">“{t.q}”</blockquote>
                <figcaption className="mt-4 text-[13px] text-white/65">{t.who} (placeholder)</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
