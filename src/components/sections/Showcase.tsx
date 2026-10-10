"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, useScene } from "@/lib/gsap";
import { Mark, SectionHeading } from "@/components/ui/primitives";

const TABS = ["Live", "Notes", "Settings"] as const;
type Tab = (typeof TABS)[number];

const TRANSCRIPT = [
  ["31:02", "Dana", "Before we talk numbers, how does this hold up with our overnight team?"],
  ["31:09", "You", "That was the surprise. Overnight resolution improved more than daytime."],
  ["31:20", "Raj", "What did you need from IT to get the pilot running?"],
  ["31:26", "You", "A single sign-on app and read access to the help center. About an hour."],
  ["31:41", "Dana", "And if we roll this out to all 400 seats in January?", true],
] as const;

export default function Showcase() {
  const [tab, setTab] = useState<Tab>("Live");
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    const q = gsap.utils.selector(root);
    gsap.from(q(".window"), {
      y: 80,
      rotateX: 12,
      transformPerspective: 1600,
      transformOrigin: "50% 0%",
      opacity: 0,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: q(".window")[0], start: "top 85%", once: true },
    });
  });

  return (
    <section ref={root} id="showcase" data-room="ink" className="section overflow-hidden">
      <div className="bloom left-1/2 top-1/3 h-[50vw] w-[60vw] -translate-x-1/2 bg-[#2340ff]/30" aria-hidden />
      <div className="wrap relative">
        <SectionHeading
          title="Afterwards, everything waits in one quiet place."
          lede="During the call you see the overlay. The desktop app holds the rest: transcripts, answers, notes and the memory that connects them."
          measure="18ch"
          className="text-center [&_.lede]:mx-auto [&>*]:mx-auto"
          size="var(--step-4)"
        />

        <div
          className="window glass mx-auto mt-16 max-w-[1180px] overflow-hidden !rounded-[22px] text-[13px] text-[#eef2fa]"
          style={{ background: "rgb(9 18 58 / .82)", "--line": "rgb(255 255 255 / .12)" } as React.CSSProperties}
          role="region"
          aria-label="Notcluely desktop app, interactive preview"
        >
          {/* title bar */}
          <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="hidden items-center gap-2 text-white/80 sm:flex">
              <Mark size={14} /> Acme renewal sync
            </span>
            <span className="flex items-center gap-2 text-white/60">
              <span className="live-dot" /> 31:41
            </span>
            <div role="tablist" aria-label="App views" className="ml-auto flex rounded-full bg-white/[0.06] p-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className="relative rounded-full px-3.5 py-1.5 text-[12px] transition-colors"
                >
                  {tab === t && (
                    <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                  <span className={`relative ${tab === t ? "text-[#071033]" : "text-white/70"}`}>{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid min-h-[560px] md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]">
            {/* memory sidebar */}
            <aside className="hidden border-r border-white/10 p-4 md:block" aria-label="Memory">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-white/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                Search memory
              </div>
              <SideGroup title="Today" items={["Acme renewal sync", "Design crit", "1:1 with Mei"]} active="Acme renewal sync" />
              <SideGroup title="Collections" items={["Acme account", "Interview prep", "CS 229 lectures"]} />
              <SideGroup title="Files" items={["Pricing sheet v3.pdf", "SOC 2 report.pdf", "Résumé, 2026.pdf"]} />
              <SideGroup title="People" items={["Dana Ruiz, CFO", "Raj Patel, IT lead"]} />
            </aside>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                aria-label={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={tab === "Live" ? "grid lg:grid-cols-[1fr_330px]" : ""}
              >
                {tab === "Live" && <LiveView />}
                {tab === "Notes" && <NotesView />}
                {tab === "Settings" && <SettingsView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-6 text-center text-[13px] text-dim">Interactive preview. Switch between Live, Notes and Settings.</p>
      </div>
    </section>
  );
}

function SideGroup({ title, items, active }: { title: string; items: string[]; active?: string }) {
  return (
    <div className="mt-5">
      <p className="mb-1.5 px-2 text-[11px] text-white/40">{title}</p>
      <ul>
        {items.map((i) => (
          <li key={i} className={`truncate rounded-md px-2 py-1.5 ${i === active ? "bg-white/10 text-white" : "text-white/65"}`}>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiveView() {
  return (
    <>
      <div className="flex flex-col border-white/10 p-5 lg:border-r">
        <p className="mb-4 text-[11px] text-white/45">Transcript</p>
        <ul className="flex-1 space-y-4">
          {TRANSCRIPT.map(([at, who, text, hot]) => (
            <li key={at} className={`grid grid-cols-[44px_1fr] gap-3 ${hot ? "-mx-3 rounded-xl bg-[var(--cobalt)]/25 px-3 py-2 ring-1 ring-[var(--cobalt)]" : ""}`}>
              <span className="dots pt-0.5 text-white/45">{at}</span>
              <p>
                <span className={`mr-2 font-medium ${who === "You" ? "text-[#8fb3ff]" : ""}`}>{who}</span>
                <span className="text-white/80">{text}</span>
              </p>
            </li>
          ))}
        </ul>
        {/* timeline with flagged moments */}
        <div className="mt-6" aria-hidden>
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-white/40" />
            {[18, 41, 63, 72].map((x) => (
              <span key={x} className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#09123a] bg-[var(--signal)]" style={{ left: `${x}%` }} />
            ))}
          </div>
          <p className="mt-2 flex justify-between text-[11px] text-white/40">
            <span>0:00</span>
            <span>4 moments flagged</span>
            <span>45:00</span>
          </p>
        </div>
      </div>
      <div className="hidden space-y-3 p-5 lg:block">
        <p className="text-[11px] text-white/45">Answers</p>
        <AnswerCard q="400 seats in January?" a="$38,400 a year" note="Team plan, annual. Volume tier from 250 seats allows 15% off." fresh />
        <AnswerCard q="Overnight queue results" a="9h → 3.8h" note="Pilot data, Sep 1 to Sep 30. Overnight improved 61%." />
        <AnswerCard q="IT requirements" a="SSO + read access" note="Setup took 52 minutes in the pilot (Raj, Sep 12)." />
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white/45">
          Ask anything about this call
          <span className="ml-auto flex gap-1">
            <kbd className="rounded border border-white/20 px-1.5 text-[11px]">⌘</kbd>
            <kbd className="rounded border border-white/20 px-1.5 text-[11px]">↵</kbd>
          </span>
        </div>
      </div>
    </>
  );
}

function AnswerCard({ q, a, note, fresh }: { q: string; a: string; note: string; fresh?: boolean }) {
  return (
    <article className={`rounded-2xl border p-4 ${fresh ? "border-white/30 bg-white/[0.09]" : "border-white/10 bg-white/[0.03]"}`}>
      <p className="flex items-center justify-between text-[11px] text-white/50">
        {q}
        {fresh && <span className="rounded-full bg-[var(--signal)] px-2 py-0.5 text-[10px] text-white">Now</span>}
      </p>
      <p className="dots mt-2 text-[1.45rem] leading-none">{a}</p>
      <p className="mt-2 text-[12px] leading-snug text-white/65">{note}</p>
    </article>
  );
}

function NotesView() {
  return (
    <div className="p-6 lg:p-8">
      <p className="text-[11px] text-white/45">Generated 2 seconds after the call</p>
      <h3 className="display mt-2 text-[2rem]">Acme renewal sync</h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="font-medium">Summary</h4>
          <p className="mt-2 leading-relaxed text-white/75">
            The pilot reduced support resolution time from 9 hours to 3.8, with the largest gain overnight. Acme is ready to
            plan a January rollout for 400 seats once IT completes a security review.
          </p>
          <h4 className="mt-6 font-medium">Decisions</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/75">
            <li>Annual billing on the Team plan</li>
            <li>SSO included at no extra cost</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Action items</h4>
          <ul className="mt-2 divide-y divide-white/10 rounded-xl border border-white/10">
            {[
              ["Send SOC 2 report", "You", "Today"],
              ["Draft rollout plan", "You", "Oct 17"],
              ["Confirm seat count", "Dana", "Oct 21"],
              ["Schedule security review", "Raj", "Oct 24"],
            ].map(([t, w, d]) => (
              <li key={t} className="flex items-center justify-between px-4 py-3">
                <span>{t}</span>
                <span className="text-white/50">
                  {w}, {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const [prefs, setPrefs] = useState({ stealth: true, local: true, autoNotes: true, translate: false });
  const rows: [keyof typeof prefs, string, string][] = [
    ["stealth", "Hide from screen share", "The overlay is excluded from shares and recordings"],
    ["local", "On-device audio processing", "Audio never leaves this computer where possible"],
    ["autoNotes", "Write notes when calls end", "Summary, decisions and action items"],
    ["translate", "Live translation", "Translate into English as people speak"],
  ];
  return (
    <div className="p-6 lg:p-8">
      <h3 className="display text-[2rem]">Settings</h3>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_260px]">
        <ul className="divide-y divide-white/10 rounded-xl border border-white/10">
          {rows.map(([k, title, sub]) => (
            <li key={k} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <span>
                <span id={`set-${k}`} className="block">
                  {title}
                </span>
                <span className="text-[12px] text-white/50">{sub}</span>
              </span>
              <button
                role="switch"
                aria-checked={prefs[k]}
                aria-labelledby={`set-${k}`}
                onClick={() => setPrefs({ ...prefs, [k]: !prefs[k] })}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${prefs[k] ? "bg-[var(--cobalt)]" : "bg-white/15"}`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-[left] duration-300 ${prefs[k] ? "left-6" : "left-1"}`} />
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <label className="block">
            <span className="text-[12px] text-white/50">Answer style</span>
            <select className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0d1a4a] px-3 py-2">
              <option>Short and direct</option>
              <option>Detailed with sources</option>
              <option>Bullet points only</option>
            </select>
          </label>
          <label className="block">
            <span className="text-[12px] text-white/50">Transcript language</span>
            <select className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0d1a4a] px-3 py-2">
              <option>Detect automatically</option>
              <option>English</option>
              <option>Español</option>
              <option>日本語</option>
            </select>
          </label>
          <div>
            <span className="text-[12px] text-white/50">Overlay hotkey</span>
            <p className="mt-1.5 flex gap-1.5">
              <kbd className="kbd text-white">⌘</kbd>
              <kbd className="kbd text-white">\</kbd>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
