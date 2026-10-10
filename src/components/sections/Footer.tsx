"use client";
import { useState } from "react";
import { Art, Wordmark } from "@/components/ui/primitives";

const COLS: [string, string[]][] = [
  ["Product", ["Features", "Pricing", "Changelog", "Download", "System status"]],
  ["Use cases", ["Sales", "Interviews", "Lectures", "Support", "Teams"]],
  ["Company", ["About", "Careers", "Press kit", "Contact"]],
  ["Resources", ["Help center", "Security", "Privacy policy", "Terms of service"]],
];

const SOCIALS = [
  ["X", "M4 4l16 16M20 4 4 20"],
  ["LinkedIn", "M6 9v9M6 6v.01M10 18v-5a3 3 0 0 1 6 0v5M10 9v9"],
  ["YouTube", "M3 8.5C3 6.5 4.5 5 6.5 5h11C19.5 5 21 6.5 21 8.5v7c0 2-1.5 3.5-3.5 3.5h-11C4.5 19 3 17.5 3 15.5v-7ZM10 9.5v5l4.5-2.5L10 9.5Z"],
  ["GitHub", "M9 19c-4 1.5-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // ponytail: no backend yet; wire to the mailing-list API when it exists
    setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
  };

  return (
    <footer data-room="ink" className="relative overflow-hidden">
      {/* the call is over: someone at a desk in an open field */}
      <div className="relative h-[52vh] min-h-[320px] [mask-image:linear-gradient(180deg,transparent,#000_35%,#000_60%,transparent)]">
        <Art src="desk-sunset.jpg" alt="A person working at a desk alone in a wide field at sunset" sizes="100vw" />
        <p className="display absolute inset-x-0 bottom-10 px-6 text-center text-[length:var(--step-2)] text-white drop-shadow-[0_2px_20px_rgb(0_0_0/0.4)]">
          Fewer notes. More attention.
        </p>
      </div>

      <div className="wrap pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="prose-dim mt-4 max-w-[34ch] text-[15px]">
              The quiet copilot for every call. Live transcripts, instant answers and notes that write themselves.
            </p>
            <form onSubmit={submit} noValidate className="mt-8 max-w-sm">
              <label htmlFor="nl" className="text-[14px]">
                Field notes, once a month
              </label>
              <div className="mt-2 flex gap-2 rounded-full border border-line bg-[var(--glass)] p-1 focus-within:border-[var(--wash)]">
                <input
                  id="nl"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  aria-invalid={state === "error"}
                  aria-describedby="nl-msg"
                  className="min-w-0 flex-1 bg-transparent px-4 text-[15px] outline-none placeholder:text-dim"
                />
                <button className="btn btn-primary !h-10 !px-5 text-[14px]">Subscribe</button>
              </div>
              <p id="nl-msg" aria-live="polite" className={`mt-2 min-h-5 text-[13px] ${state === "error" ? "text-[var(--signal)]" : "text-dim"}`}>
                {state === "error" && "Enter an email address like name@company.com."}
                {state === "done" && "Subscribed. Check your inbox to confirm."}
              </p>
            </form>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {COLS.map(([title, links]) => (
              <div key={title}>
                <h2 className="text-[14px] font-medium">{title}</h2>
                <ul className="mt-4 space-y-2.5 text-[14px] text-dim">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-fg">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-[13px] text-dim md:flex-row md:items-center md:justify-between">
          <p>© 2026 Notcluely, Inc. Made for people who would rather listen.</p>
          <ul className="flex gap-1">
            {SOCIALS.map(([name, d]) => (
              <li key={name}>
                <a href="#" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[var(--glass-strong)] hover:text-fg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-[90ch] text-[12px] leading-relaxed text-dim opacity-80">
          Art credits: hero hands after Michelangelo&rsquo;s <i>Creation of Adam</i>, dot rendering by @samdape. Other plates are drawn from the
          Notcluely mood board and remain the work of their original artists. Customer names, quotes and figures on this page are placeholders.
        </p>
      </div>
    </footer>
  );
}
