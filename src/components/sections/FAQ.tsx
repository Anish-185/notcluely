"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/primitives";

const FAQS = [
  ["Can the other people on the call see Notcluely?", "No. The overlay lives on your screen only and is excluded from screen shares and recordings in Zoom, Meet, Teams and other apps. Nothing joins the meeting, so there is no bot in the participant list."],
  ["How does it hear the call without joining it?", "It listens to your microphone and your computer's audio output, the same sound you hear. That is why it works with any meeting app, a browser call or even a phone on speaker."],
  ["Is my audio recorded or stored?", "Audio is processed on your device where possible and discarded once transcribed. Transcripts and notes are stored encrypted and you can delete any of them, or everything, at any time."],
  ["Do you train AI models on my conversations?", "Never. Your calls, files and notes are used only to answer your questions. This is the default on every plan and can't be switched on by us."],
  ["Which languages does it support?", "52 languages for transcription and answers, and 30 for live translation. It detects the spoken language automatically, including calls that switch languages midway."],
  ["Can I use it in interviews or exams?", "Notcluely works in any call, including interview prep and practice. Some interviews, exams and workplaces don't allow outside help, so check the rules of the room you're in. You're responsible for using it where it's permitted."],
  ["What do I need to run it?", "macOS 13 or later on Apple silicon or Intel, or Windows 10 and 11. About 400 MB of disk space. Microphone and screen permissions are requested the first time you open it."],
  ["Can I cancel anytime?", "Yes. Cancel from settings in two clicks and keep access until the end of your billing period. Yearly plans are refundable within 30 days."],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-room="paper" className="section pt-0">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading title="Questions people ask before their first call." size="var(--step-3)" measure="14ch" />
          <p className="prose-dim mt-6">
            Something else on your mind? Write to{" "}
            <a href="mailto:hello@notcluely.app" className="underline decoration-1 underline-offset-4 hover:text-[var(--cobalt)]">
              hello@notcluely.app
            </a>{" "}
            and a person will answer.
          </p>
        </div>
        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="border-b border-line">
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[length:var(--step-1)] leading-snug"
                  >
                    <span className="transition-colors group-hover:text-[var(--cobalt)]">{q}</span>
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-[var(--cobalt)]" aria-hidden>
                      <span className="absolute h-px w-3.5 bg-current" />
                      <motion.span className="absolute h-3.5 w-px bg-current" animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="prose-dim pb-7 pr-14 leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
