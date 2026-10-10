"use client";
import FeatureExhibit, { type Exhibit } from "@/components/ui/FeatureExhibit";
import { Art, LoopVideo } from "@/components/ui/primitives";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  AnswerDemo,
  EmailDemo,
  HotkeysDemo,
  IntegrationsDemo,
  LanguageDemo,
  MemoryDemo,
  NotesDemo,
  PrivacyDemo,
  PrivacySwitches,
  ScreenDemo,
  TranscriptDemo,
} from "./exhibit-demos";

const EXHIBITS: Exhibit[] = [
  {
    id: "transcription",
    plate: "I",
    name: "Live transcription",
    title: "Every word, with a name beside it.",
    body: "Notcluely transcribes both sides of the call as it happens and labels who said what. Search it mid-call, or scroll back to the exact sentence you half heard.",
    details: ["Speaker labels that learn voices over time", "Timestamps you can jump back to", "Custom vocabulary for names, products and jargon"],
    label: ["Speech to text, speaker labels, timestamps", "About 300 ms behind the speaker"],
    room: "cobalt",
    visual: (
      <div className="h-full w-full bg-[#1326c4]">
        <LoopVideo name="horse" label="A pixel horse in motion, frame by frame" className="h-full w-full object-cover invert mix-blend-screen" />
      </div>
    ),
    demo: <TranscriptDemo />,
    pins: [{ x: 6, y: 8, text: "Captured frame by frame" }],
  },
  {
    id: "answers",
    plate: "II",
    name: "Instant answers",
    title: "Cool and collected, slightly ahead of the question.",
    body: "When a question lands, the answer is already forming. Notcluely draws on the conversation, your screen and your files, then keeps it short enough to read while you keep talking.",
    details: ["Cites where every fact came from", "Ask a follow-up without leaving the call", "Tone presets for sales, interviews and support"],
    label: ["Context from audio, screen and memory", "Median 0.4 s to the first word"],
    room: "ink",
    visual: <Art src="polar-bear.jpg" alt="A pixel-art polar bear in headphones and sunglasses, sitting perfectly calm" />,
    demo: <AnswerDemo />,
    pins: [{ x: 8, y: 10, text: "Unbothered, as intended" }],
  },
  {
    id: "screen",
    plate: "III",
    name: "Screen understanding",
    title: "It sees what you’re looking at.",
    body: "Share a deck, open a spreadsheet, work through a coding problem. Notcluely reads the screen, so “what’s our churn on that slide?” gets a real number instead of a guess.",
    details: ["Slides, documents, dashboards and code", "Reads only the windows you allow", "Works in full-screen and presenter mode"],
    label: ["Optical and structural screen reading", "Nothing is stored unless you save it"],
    room: "cobalt",
    visual: <Art src="cloud-grid.jpg" alt="Clouds behind a fine grid, with a single square marked out" />,
    demo: <ScreenDemo />,
  },
  {
    id: "memory",
    plate: "IV",
    name: "Memory",
    title: "It remembers, so you don’t have to.",
    body: "Every call, document and note becomes part of a private knowledge graph. Add your résumé, your pricing sheet or last quarter’s board deck, and answers come back grounded in your own material.",
    details: ["Upload PDFs, docs, slides and links", "People, companies and topics linked automatically", "Ask across every past conversation"],
    label: ["Calls, files, notes, people", "Encrypted, and deletable at any time"],
    room: "ink",
    visual: <Art src="globe-b.jpg" alt="A globe drawn in white dots on cobalt" />,
    demo: <MemoryDemo />,
  },
  {
    id: "notes",
    plate: "V",
    name: "Notes and action items",
    title: "The meeting writes its own minutes.",
    body: "The moment you hang up, there is a summary, the decisions that were made and a list of who owes what by when. Tick things off right in the notes.",
    details: ["Summaries tuned to the type of call", "Owners and due dates pulled from what was said", "Templates for 1:1s, standups and discovery calls"],
    label: ["Summary, decisions, owners, due dates", "Ready before your next meeting starts"],
    room: "cobalt",
    visual: <Art src="annotated.jpg" alt="A photograph annotated with numbered labels, above a blue map of connected points" />,
    demo: <NotesDemo />,
    aspect: "aspect-[4/3.6]",
  },
  {
    id: "follow-up",
    plate: "VI",
    name: "Follow-up drafting",
    title: "The follow-up is written before the goodbye.",
    body: "Notcluely drafts the recap email from what was actually said, in your tone, with action items and links attached. Read it, nudge it, send it.",
    details: ["Rewrite shorter, warmer or more formal", "Opens straight in Gmail or Outlook", "Remembers how you sign off"],
    label: ["Email, Slack message or CRM note", "Written in your voice, never sent without you"],
    room: "ink",
    visual: (
      <div className="h-full w-full bg-[#0d1a4a]">
        <LoopVideo name="birds" label="A flock of birds flying in formation" className="h-full w-full object-cover invert mix-blend-screen" />
      </div>
    ),
    demo: <EmailDemo />,
    aspect: "aspect-[4/3.6]",
  },
  {
    id: "languages",
    plate: "VII",
    name: "Languages",
    title: "Fluent in whatever room you’re in.",
    body: "Transcribe and answer in 52 languages, or translate as you listen: hear Japanese, read English, reply in either. Notcluely detects the language on its own.",
    details: ["52 languages for transcription", "30 for live translation", "Mixed-language calls handled line by line"],
    label: ["Detects language automatically", "Answers in the language you choose"],
    room: "cobalt",
    visual: <LoopVideo name="worldmap" label="A dotted world map with cities lighting up" className="h-full w-full object-cover" />,
    demo: <LanguageDemo />,
  },
  {
    id: "hotkeys",
    plate: "VIII",
    name: "Hotkeys",
    title: "One keystroke from any answer.",
    body: "Everything runs from the keyboard. Summon, ask, hide and copy without reaching for the mouse or breaking eye contact. Go ahead and try the keys.",
    details: ["Every shortcut can be remapped", "Works over full-screen apps", "Same keys on macOS and Windows"],
    label: ["Global shortcuts, fully remappable", "Ctrl replaces ⌘ on Windows"],
    room: "ink",
    visual: (
      <div className="relative h-full w-full bg-[#0d1a4a]">
        <Art src="bunnies.jpg" alt="Three dotted rabbits mid-hop" className="invert mix-blend-screen" />
      </div>
    ),
    demo: <HotkeysDemo />,
  },
  {
    id: "integrations",
    plate: "IX",
    name: "Integrations",
    title: "Works wherever you already meet.",
    body: "Zoom, Google Meet, Teams, Webex, Slack huddles, even a phone call on speaker. When the call ends, notes flow to Notion, Slack, Salesforce or HubSpot.",
    details: ["No bot joins, so nobody has to admit it", "Any app that plays audio on your computer", "Two-way CRM sync on the Team plan"],
    label: ["14 meeting apps, 9 destinations", "Native apps for macOS and Windows"],
    room: "cobalt",
    visual: <Art src="globe-a.jpg" alt="A dotted globe on a cobalt field" />,
    demo: <IntegrationsDemo />,
  },
  {
    id: "privacy",
    plate: "X",
    name: "Privacy and security",
    title: "Only you can see it. Only you keep it.",
    body: "Audio is processed on your device where possible and encrypted everywhere else. The overlay is left out of screen shares and recordings, nothing is used to train models, and one click deletes everything.",
    details: ["AES-256 at rest, TLS 1.3 in transit", "SOC 2 Type II, GDPR and HIPAA options", "Admin controls and audit logs on Team"],
    label: ["On-device processing where possible", "Your data never trains a model"],
    room: "ink",
    visual: <div className="dotfield h-full w-full bg-[#0d1a4a] text-white/15" />,
    demo: <PrivacyDemo />,
    extra: <PrivacySwitches />,
  },
];

export default function Exhibits() {
  return (
    <div id="features">
      <section data-room="cobalt" className="section pb-0" aria-label="Feature collection">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <AnimatedText
            as="h2"
            text="Ten rooms, one idea: help that arrives while the moment is still happening."
            className="display lg:col-span-8"
            style={{ fontSize: "var(--step-4)" }}
          />
          {/* the gallery map */}
          <nav aria-label="Features" className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <ol className="grid grid-cols-2 gap-x-6 border-t border-line pt-4 text-[14px]">
              {EXHIBITS.map((e) => (
                <li key={e.id}>
                  <a href={`#${e.id}`} className="flex gap-3 py-1.5 text-dim transition-colors hover:text-fg">
                    <span className="dots w-8 text-fg">{e.plate}</span>
                    {e.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      {EXHIBITS.map((e, i) => (
        <FeatureExhibit key={e.id} ex={e} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
