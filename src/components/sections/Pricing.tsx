"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/primitives";

const TIERS = [
  {
    name: "Free",
    price: [0, 0],
    unit: "forever",
    pitch: "For trying it on your next few calls.",
    cta: "Download free",
    features: ["10 answers a day", "3 hours of transcription a month", "Basic notes after each call", "Hotkeys and overlay"],
  },
  {
    name: "Pro",
    price: [20, 16],
    unit: "per month",
    pitch: "For people whose job happens in conversations.",
    cta: "Start 14-day trial",
    features: ["Unlimited answers and transcription", "Screen understanding", "Memory with 10 GB of files", "Follow-up drafting", "52 languages and live translation"],
    featured: true,
  },
  {
    name: "Team",
    price: [35, 28],
    unit: "per seat, per month",
    pitch: "For sales, support and success teams.",
    cta: "Talk to us",
    features: ["Everything in Pro", "Shared memory and collections", "Salesforce and HubSpot sync", "SSO, SCIM and audit logs", "US or EU data residency"],
  },
];

const ROWS: [string, (string | boolean)[]][] = [
  ["Live transcription", ["3 h / month", "Unlimited", "Unlimited"]],
  ["Instant answers", ["10 / day", "Unlimited", "Unlimited"]],
  ["Screen understanding", [false, true, true]],
  ["Memory and file uploads", ["50 MB", "10 GB", "100 GB pooled"]],
  ["Notes and action items", ["Basic", "Full, with templates", "Full, shared"]],
  ["Follow-up drafting", [false, true, true]],
  ["Languages", ["English", "52 + live translation", "52 + live translation"]],
  ["Hidden from screen share", [true, true, true]],
  ["CRM and Notion sync", [false, "Notion, Slack", "All integrations"]],
  ["Admin, SSO and audit logs", [false, false, true]],
  ["Support", ["Community", "Email, 24 h", "Dedicated manager"]],
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" data-room="paper" className="section">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading title="Pay for the calls that matter." lede="Start free. Upgrade when it has earned it. Cancel in two clicks." measure="12ch" />
          <div role="radiogroup" aria-label="Billing period" className="flex shrink-0 rounded-full border border-line bg-white/60 p-1 text-[14px]">
            {[
              ["Monthly", false],
              ["Yearly, save 20%", true],
            ].map(([label, v]) => (
              <button
                key={label as string}
                role="radio"
                aria-checked={yearly === v}
                onClick={() => setYearly(v as boolean)}
                className="relative rounded-full px-4 py-2"
              >
                {yearly === v && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-[var(--ink)]" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                <span className={`relative transition-colors ${yearly === v ? "text-white" : "text-[rgb(7_16_51/0.72)]"}`}>{label as string}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={`relative flex flex-col overflow-hidden rounded-[28px] border p-7 sm:p-8 ${
                t.featured ? "border-transparent bg-[var(--cobalt)] text-white shadow-[0_40px_80px_-30px_rgb(35_64_255/0.7)]" : "border-line bg-white/55"
              }`}
            >
              {t.featured && <div className="dotfield pointer-events-none absolute inset-0 text-white/10 [mask-image:linear-gradient(200deg,#000,transparent_60%)]" aria-hidden />}
              <h3 className="display relative text-[length:var(--step-2)]">{t.name}</h3>
              <p className={`relative mt-1 text-[15px] ${t.featured ? "text-white/80" : "text-dim"}`}>{t.pitch}</p>
              <p className="relative mt-8 flex items-end gap-2">
                <span className="dots flex overflow-hidden text-[4.2rem] leading-none">
                  $
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={t.price[yearly ? 1 : 0]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {t.price[yearly ? 1 : 0]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className={`pb-2 text-[14px] ${t.featured ? "text-white/75" : "text-dim"}`}>
                  {t.unit}
                  {t.price[0] > 0 && <span className="block">{yearly ? "billed yearly" : "billed monthly"}</span>}
                </span>
              </p>
              <ul className={`relative mt-8 flex-1 space-y-3 border-t pt-6 text-[15px] ${t.featured ? "border-white/25" : "border-line"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className={`btn relative mt-8 justify-center ${t.featured ? "!bg-white !text-[var(--ink)]" : "btn-primary"}`}
              >
                {t.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-20 overflow-x-auto rounded-[22px] border border-line bg-white/45">
          <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
            <caption className="display px-6 pb-2 pt-6 text-left text-[length:var(--step-2)]">Compare every feature</caption>
            <thead>
              <tr className="border-b border-line text-[14px] text-dim">
                <th scope="col" className="px-6 py-4 font-normal">
                  Feature
                </th>
                {TIERS.map((t) => (
                  <th key={t.name} scope="col" className="px-6 py-4 font-medium text-[var(--ink)]">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([name, vals]) => (
                <tr key={name} className="border-b border-line last:border-0 hover:bg-white/50">
                  <th scope="row" className="px-6 py-3.5 font-normal">
                    {name}
                  </th>
                  {vals.map((v, i) => (
                    <td key={i} className="px-6 py-3.5 text-dim">
                      {v === true ? <Check label="Included" /> : v === false ? <span aria-label="Not included">–</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Check({ label }: { label?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0" role={label ? "img" : undefined} aria-label={label} aria-hidden={!label}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
