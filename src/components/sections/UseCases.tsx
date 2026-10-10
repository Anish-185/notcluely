"use client";
import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";
import { Art, SectionHeading } from "@/components/ui/primitives";

const CASES = [
  {
    title: "Sales calls",
    line: "Close the gap between the question and the quote.",
    say: "They pay per minute. We don’t.",
    points: ["Objection handling while they’re still talking", "Pricing and discount math on the spot", "CRM notes written for you"],
    img: "field-run.jpg",
    alt: "A small figure running across a green field under a towering cloud",
  },
  {
    title: "Interviews",
    line: "Remember every story you meant to tell.",
    say: "Use the Q3 migration story: deploys 40% faster.",
    points: ["Your résumé and projects as context", "Hints for coding and system design rounds", "Practice mode with a mock interviewer"],
    img: "bunny-punch.jpg",
    alt: "A rabbit drawn in dots leaping across a blurred blue crowd",
  },
  {
    title: "Lectures",
    line: "Follow the lecture instead of the note-taking.",
    say: "Eigenvector: defined at 14:32, see slide 9.",
    points: ["Live notes with slides attached", "Ask what a term means without interrupting", "A study guide waiting after class"],
    img: "fresco.jpg",
    alt: "A cyanotype fresco of figures resting among clouds",
  },
  {
    title: "Customer support",
    line: "The whole knowledge base, in the moment it’s needed.",
    say: "Refunds over $500 need approval. Offer credit first.",
    points: ["Policy lookups mid-call", "A cue when the customer’s tone shifts", "Ticket summary on hang-up"],
    img: "town-cyanotype.jpg",
    alt: "A cyanotype print of a lakeside town under steep mountains",
  },
  {
    title: "Team meetings",
    line: "Everyone leaves with the same notes.",
    say: "Decision: ship Thursday. Owner: Priya.",
    points: ["Decisions and owners captured", "Notes posted to Slack or Notion", "Catch up on any call you missed"],
    img: "horses.jpg",
    alt: "Pixel-art horses galloping together in rows",
  },
];

export default function UseCases() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ isDesktop }) => {
    if (!isDesktop) return;
    root.current!.dataset.motion = "on";
    const q = gsap.utils.selector(root);
    const track = q(".track")[0] as HTMLElement;
    const dist = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: q(".stage")[0],
        start: "top top",
        end: () => `+=${dist()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    return () => delete root.current?.dataset.motion;
  });

  return (
    <section ref={root} id="use-cases" data-room="cobalt" className="relative">
      <div className="stage flex min-h-svh flex-col justify-center overflow-hidden py-24">
        <div className="wrap">
          <SectionHeading
            title="Made for the conversations that count."
            lede="Five rooms where people use Notcluely every day. Scroll on to walk through them."
            size="var(--step-4)"
            measure="16ch"
          />
        </div>
        <ul
          className="track mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:[[data-motion=on]_&]:snap-none lg:[[data-motion=on]_&]:overflow-visible"
          aria-label="Use cases"
        >
          {CASES.map((c) => (
            <li key={c.title} className="w-[84vw] shrink-0 snap-center sm:w-[60vw] lg:w-[34vw] lg:max-w-[520px]">
              <article className="group grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.07] backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.12]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Art src={c.img} alt={c.alt} sizes="(min-width: 900px) 34vw, 84vw" className="transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-105" />
                  <p className="dots absolute bottom-3 left-3 right-3 rounded-xl bg-[#071033]/80 px-3 py-2 text-[15px] leading-snug text-white backdrop-blur-md">
                    {c.say}
                  </p>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="display text-[length:var(--step-2)]">{c.title}</h3>
                  <p className="mt-2 text-white/80">{c.line}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/15 pt-4 text-[14px] text-white/75">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
          <li className="hidden w-[8vw] shrink-0 lg:block" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
