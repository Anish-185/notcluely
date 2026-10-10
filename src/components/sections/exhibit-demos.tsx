"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mark } from "@/components/ui/primitives";

const glassDark = { background: "rgb(7 16 51 / .9)", "--line": "rgb(255 255 255 / .16)" } as React.CSSProperties;

/** Ticks `every` ms while the element is on screen; holds still under reduced motion. */
function useTicker(ref: RefObject<HTMLElement | null>, every: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setT((x) => x + 1), every);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [ref, every]);
  return t;
}

/* I. Live transcription */
const stamp = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const SCRIPT = [
  ["Dana", "Acme", "So where did the pilot land with the support team?"],
  ["You", "", "Resolution time dropped from nine hours to just under four."],
  ["Raj", "Acme", "Does that hold for the overnight queue too?"],
  ["You", "", "It does. Overnight was actually the biggest gain."],
  ["Dana", "Acme", "Then I want to talk about rolling it out in January."],
  ["Raj", "Acme", "I'll need the security review before that."],
];
export function TranscriptDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTicker(ref, 1900);
  const lines = Array.from({ length: 4 }, (_, i) => SCRIPT[(t + i) % SCRIPT.length]);
  return (
    <div ref={ref} className="glass absolute inset-x-4 bottom-4 p-4 text-[13px] text-white sm:inset-x-6 sm:bottom-6" style={glassDark} aria-hidden>
      <p className="mb-3 flex items-center gap-2 text-[11px] text-white/60">
        <span className="live-dot" /> Transcribing, 3 speakers
      </p>
      <ul className="space-y-2">
        {lines.map(([who, org, text], i) => (
          <motion.li key={`${t}-${i}`} layout initial={i === 3 ? { opacity: 0, y: 8 } : false} animate={{ opacity: i === 0 ? 0.45 : 1, y: 0 }} className="flex gap-3">
            <span className="dots w-14 shrink-0 text-right text-[12px] text-white/60">{stamp(2472 + (t + i) * 7)}</span>
            <span>
              <span className={`mr-2 font-medium ${who === "You" ? "text-[#8fb3ff]" : "text-white"}`}>
                {who}
                {org && <span className="text-white/45">, {org}</span>}
              </span>
              <span className="text-white/80">{text}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* II. Instant answers */
export function AnswerDemo() {
  return (
    <div className="glass absolute bottom-4 right-4 w-[min(360px,calc(100%-2rem))] p-4 text-white sm:bottom-6 sm:right-6" style={glassDark} aria-hidden>
      <p className="text-[12px] text-white/55">“Why should we pick you over the vendor we already have?”</p>
      <p className="dots mt-3 text-[1.6rem] leading-tight">Live in a week, not a quarter</p>
      <ul className="mt-3 space-y-1.5 text-[13px] text-white/80">
        <li>Their current rollout took 11 weeks (Raj, Sep 12 call)</li>
        <li>Offer the 14-day pilot with their own tickets</li>
      </ul>
      <p className="mt-3 border-t border-white/10 pt-2 text-[11px] text-white/45">Sources: Q3 win report, call notes Sep 12</p>
    </div>
  );
}

/* III. Screen understanding */
const SPOTS = [
  { box: "left-[12%] top-[16%] h-[24%] w-[30%]", what: "Slide 4: Net revenue retention 118%" },
  { box: "left-[52%] top-[38%] h-[22%] w-[34%]", what: "Chart: churn up 2.1 pts in EMEA" },
  { box: "left-[22%] top-[58%] h-[20%] w-[40%]", what: "Footnote: excludes two enterprise accounts" },
];
export function ScreenDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTicker(ref, 2600) % SPOTS.length;
  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {SPOTS.map((s, i) => (
        <div
          key={s.what}
          className={`absolute border-2 border-[var(--signal)] transition-opacity duration-500 ${s.box}`}
          style={{ opacity: i === t ? 1 : 0, boxShadow: "0 0 0 9999px rgb(7 16 51 / .25)" }}
        />
      ))}
      <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 text-[13px] text-white sm:left-auto sm:w-[340px]" style={glassDark}>
        <span className="h-2.5 w-2.5 shrink-0 bg-[var(--signal)]" />
        <AnimatePresence mode="wait">
          <motion.span key={t} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            {SPOTS[t].what}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* IV. Memory graph */
const NODES: [number, number, string, boolean?][] = [
  [50, 48, "You", true],
  [24, 22, "Acme renewal"],
  [76, 20, "Dana Ruiz, CFO"],
  [16, 58, "Pricing sheet v3.pdf"],
  [82, 54, "Call, Sep 12"],
  [32, 82, "Résumé.pdf"],
  [68, 84, "SOC 2 report"],
  [52, 14, "Q3 board deck"],
];
const EDGES = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [1, 7], [2, 4], [3, 1], [4, 6], [5, 3], [7, 2]];
export function MemoryDemo() {
  return (
    <div className="absolute inset-0 bg-[#071033]/55" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="white"
            strokeOpacity=".45"
            strokeWidth=".25"
            strokeDasharray="1.2 1.2"
            vectorEffect="non-scaling-stroke"
            style={{ animation: `flow ${3 + (i % 4)}s linear infinite` }}
          />
        ))}
      </svg>
      {NODES.map(([x, y, label, me]) => (
        <span
          key={label}
          className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[12px] backdrop-blur-md ${
            me ? "dots border-white bg-white text-[15px] text-[#071033]" : "border-white/25 bg-[#071033]/70 text-white"
          }`}
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          {label}
        </span>
      ))}
      <style>{`@keyframes flow{to{stroke-dashoffset:-24}}`}</style>
    </div>
  );
}

/* V. Notes and action items */
export function NotesDemo() {
  const [done, setDone] = useState([true, false, false]);
  const items = [
    ["Send SOC 2 report to Raj", "You", "Today"],
    ["Draft January rollout plan", "You", "Oct 17"],
    ["Confirm seat count with finance", "Dana", "Oct 21"],
  ];
  return (
    <div className="glass absolute inset-3 overflow-auto p-5 text-[13px] text-white sm:inset-auto sm:bottom-6 sm:right-6 sm:top-6 sm:w-[min(380px,60%)]" style={glassDark}>
      <p className="text-[11px] text-white/50">Acme renewal sync, Oct 10, 32 min</p>
      <h4 className="display mt-2 text-[1.5rem] leading-tight">Summary</h4>
      <p className="mt-2 leading-relaxed text-white/80">
        Pilot cut support resolution time from 9h to 3.8h. Acme wants a January rollout, pending a security review.
      </p>
      <h4 className="display mt-4 text-[1.2rem]">Decisions</h4>
      <p className="mt-1 text-white/80">Annual billing, 400 seats, SSO included.</p>
      <h4 className="display mt-4 text-[1.2rem]">Action items</h4>
      <ul className="mt-2 space-y-2">
        {items.map(([task, who, due], i) => (
          <li key={task}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--signal)]"
              />
              <span className={done[i] ? "text-white/45 line-through" : ""}>
                {task}
                <span className="block text-[11px] text-white/50">
                  {who}, due {due}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* VI. Follow-up email */
const TONES = {
  Balanced:
    "Hi Dana,\n\nThanks for the time today. Quick recap: the pilot brought resolution time from 9 hours to 3.8, and we agreed to plan a January rollout for 400 seats on annual billing.\n\nI'm sending the SOC 2 report to Raj today, and I'll share a rollout plan by Oct 17.",
  Shorter: "Hi Dana,\n\nGreat call. Pilot: 9h → 3.8h resolution. Next: SOC 2 report to Raj today, rollout plan by Oct 17, January go-live for 400 seats.",
  Warmer:
    "Hi Dana,\n\nReally enjoyed today, and congratulations to your support team, those overnight numbers are theirs. As promised, the SOC 2 report goes to Raj today and you'll have a January rollout plan from me by Oct 17.",
};
export function EmailDemo() {
  const [tone, setTone] = useState<keyof typeof TONES>("Balanced");
  return (
    <div className="glass absolute inset-3 flex flex-col p-5 text-[13px] text-white sm:inset-auto sm:bottom-6 sm:left-6 sm:top-6 sm:w-[min(400px,64%)]" style={glassDark}>
      <div className="space-y-1.5 border-b border-white/10 pb-3 text-white/70">
        <p>
          <span className="text-white/45">To</span> dana.ruiz@acme.example
        </p>
        <p>
          <span className="text-white/45">Subject</span> Recap and next steps: Acme renewal
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={tone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 flex-1 whitespace-pre-line leading-relaxed text-white/85"
        >
          {TONES[tone]}
        </motion.p>
      </AnimatePresence>
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Rewrite the draft">
        {(Object.keys(TONES) as (keyof typeof TONES)[]).map((k) => (
          <button
            key={k}
            onClick={() => setTone(k)}
            aria-pressed={tone === k}
            className={`rounded-full border px-3 py-1 text-[12px] transition-colors ${
              tone === k ? "border-white bg-white text-[#071033]" : "border-white/25 hover:bg-white/10"
            }`}
          >
            {k}
          </button>
        ))}
        <span className="ml-auto rounded-full bg-[var(--cobalt)] px-3.5 py-1.5 text-[12px]">Review and send</span>
      </div>
    </div>
  );
}

/* VII. Languages */
const PHRASES = [
  ["Japanese", "来週までに見積もりをいただけますか？", "Could you send a quote by next week?"],
  ["Spanish", "¿Cuánto tarda la implementación?", "How long does implementation take?"],
  ["German", "Wir brauchen das vor Quartalsende.", "We need this before the end of the quarter."],
  ["Hindi", "क्या यह हमारे CRM के साथ काम करेगा?", "Will this work with our CRM?"],
  ["French", "Pouvez-vous partager l’enregistrement ?", "Can you share the recording?"],
];
export function LanguageDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTicker(ref, 2800) % PHRASES.length;
  const [lang, heard, said] = PHRASES[t];
  return (
    <div ref={ref} className="glass absolute inset-x-4 bottom-4 p-5 text-white sm:inset-x-auto sm:left-6 sm:w-[380px]" style={glassDark} aria-live="off">
      <AnimatePresence mode="wait">
        <motion.div key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <p className="text-[11px] text-white/50">Heard in {lang}</p>
          <p className="mt-1 text-[15px] text-white/75" lang={["ja", "es", "de", "hi", "fr"][t]}>
            {heard}
          </p>
          <p className="dots mt-3 text-[1.35rem] leading-tight">{said}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* VIII. Hotkeys: the keycaps respond to your real keyboard */
const KEYMAP: Record<string, string> = { Meta: "⌘", Control: "⌘", Enter: "↵", Shift: "⇧", "\\": "\\", ArrowUp: "↑", ArrowDown: "↓", s: "S", S: "S", c: "C", C: "C" };
export const SHORTCUTS: [string[], string][] = [
  [["⌘", "↵"], "Ask about this moment"],
  [["⌘", "\\"], "Show or hide the overlay"],
  [["⌘", "⇧", "S"], "Summarize the call so far"],
  [["⌘", "↑"], "Previous answer"],
  [["⌘", "⇧", "C"], "Copy the answer"],
];
export function HotkeysDemo() {
  const [down, setDown] = useState<Set<string>>(new Set());
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const k = KEYMAP[e.key];
      if (k) setDown((d) => new Set(d).add(k));
    };
    const off = (e: KeyboardEvent) => {
      const k = KEYMAP[e.key];
      if (k)
        setDown((d) => {
          const n = new Set(d);
          n.delete(k);
          return n;
        });
    };
    const clear = () => setDown(new Set());
    window.addEventListener("keydown", on);
    window.addEventListener("keyup", off);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", on);
      window.removeEventListener("keyup", off);
      window.removeEventListener("blur", clear);
    };
  }, []);
  const match = SHORTCUTS.find(([keys]) => keys.every((k) => down.has(k)) && keys.length === down.size);
  return (
    <div className="glass absolute inset-3 p-5 text-white sm:inset-auto sm:right-6 sm:top-6 sm:w-[340px]" style={glassDark}>
      <ul className="space-y-3 text-[13px]">
        {SHORTCUTS.map(([keys, what]) => (
          <li key={what} className="flex items-center justify-between gap-4">
            <span className={match?.[1] === what ? "text-white" : "text-white/70"}>{what}</span>
            <span className="flex gap-1.5">
              {keys.map((k) => (
                <kbd key={k} className="kbd !h-9 !min-w-9 text-white" data-down={down.has(k)}>
                  {k}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className="dots mt-5 border-t border-white/10 pt-3 text-[15px]" aria-live="polite">
        {match ? `${match[1]}…` : "Try it: hold ⌘ or Ctrl"}
      </p>
    </div>
  );
}

/* IX. Integrations (placeholder marks) */
const APPS = ["Zoom", "Google Meet", "Teams", "Webex", "Slack", "Discord", "Notion", "Salesforce", "HubSpot", "Linear", "Gmail", "Outlook"];
export function IntegrationsDemo() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#071033]/35 p-4 sm:p-8">
      <ul className="grid w-full max-w-[560px] grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {APPS.map((a) => (
          <li
            key={a}
            className="glass group flex aspect-square flex-col items-center justify-center gap-2 !rounded-2xl text-white transition-transform duration-500 hover:-translate-y-1"
            style={glassDark}
          >
            <span className="display grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xl transition-colors group-hover:bg-[var(--cobalt)]">
              {a[0]}
            </span>
            <span className="text-center text-[11px] text-white/75 sm:text-[12px]">{a}</span>
          </li>
        ))}
      </ul>
      <p className="absolute bottom-3 right-4 text-[10px] text-white/45">Placeholder marks, not official logos</p>
    </div>
  );
}

/* X. Privacy: your screen vs. what they see */
function Screen({ mine }: { mine: boolean }) {
  return (
    <figure className="flex-1">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/20 bg-[#0d1a4a]">
        <div className="flex h-5 items-center gap-1 border-b border-white/10 px-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded bg-gradient-to-br from-[#2a6cf0]/50 to-[#071033]" />
          ))}
        </div>
        {mine ? (
          <div className="absolute bottom-2 right-2 w-[46%] rounded-md border border-white/30 bg-[#071033]/90 p-1.5 text-[8px] text-white sm:text-[9px]">
            <span className="flex items-center gap-1">
              <Mark size={8} /> Notcluely
            </span>
            <span className="dots mt-1 block text-[11px]">$38,400</span>
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 grid h-[38%] w-[46%] place-items-center rounded-md border border-dashed border-white/40 text-center text-[9px] text-white/60">
            Not captured
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-[12px] text-white/70">{mine ? "Your screen" : "What they see"}</figcaption>
    </figure>
  );
}

export function PrivacyDemo() {
  return (
    <div className="absolute inset-0 flex items-center p-5 sm:p-10" aria-hidden>
      <div className="flex w-full gap-4 sm:gap-8">
        <Screen mine />
        <Screen mine={false} />
      </div>
    </div>
  );
}

const SWITCHES = [
  ["Process audio on this device", true],
  ["Delete recordings after 30 days", true],
  ["Never train models on my data", true],
] as const;
export function PrivacySwitches() {
  const [on, setOn] = useState<boolean[]>(SWITCHES.map((s) => s[1]));
  return (
    <ul className="mt-6 space-y-3 text-[15px]">
      {SWITCHES.map(([label], i) => (
        <li key={label} className="flex items-center justify-between gap-4">
          <span id={`sw-${i}`}>{label}</span>
          <button
            role="switch"
            aria-checked={on[i]}
            aria-labelledby={`sw-${i}`}
            onClick={() => setOn(on.map((v, j) => (j === i ? !v : v)))}
            className={`relative h-7 w-12 shrink-0 rounded-full border border-line transition-colors ${on[i] ? "bg-[var(--signal)]" : "bg-[var(--glass)]"}`}
          >
            <span className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-[left] duration-300 ${on[i] ? "left-[calc(100%-1.4rem)]" : "left-1"}`} />
          </button>
        </li>
      ))}
    </ul>
  );
}
