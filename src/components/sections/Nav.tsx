"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/ui/primitives";

const LINKS = [
  ["How it works", "#how"],
  ["Features", "#features"],
  ["Use cases", "#use-cases"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const light = useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    () => document.documentElement.dataset.theme === "light",
    () => false,
  );

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toggleTheme = () => {
    const next = light ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1180px] items-center gap-4 rounded-full px-4 py-2 text-[#eef2fa] transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border border-white/12 bg-[rgb(7_16_51/0.62)] shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border border-white/8 bg-[rgb(7_16_51/0.35)] backdrop-blur-md"
        }`}
      >
        <a href="#top" aria-label="Notcluely home" className="shrink-0">
          <Wordmark />
        </a>
        <ul className="ml-6 hidden items-center gap-1 text-[14px] text-white/70 lg:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="rounded-full px-3 py-2 transition-colors hover:bg-white/8 hover:text-white">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
            className="grid h-10 w-10 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              {light ? (
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              )}
            </svg>
          </button>
          <a href="#download" className="btn btn-primary hidden h-10 !bg-white !text-[#071033] sm:inline-flex">
            Download free
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-[1180px] rounded-3xl border border-white/12 bg-[rgb(7_16_51/0.85)] p-3 text-[#eef2fa] backdrop-blur-2xl lg:hidden"
          >
            <ul className="grid">
              {LINKS.map(([l, h]) => (
                <li key={h}>
                  <a href={h} onClick={() => setOpen(false)} className="display block rounded-2xl px-4 py-3 text-2xl hover:bg-white/8">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#download" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full justify-center !bg-white !text-[#071033]">
              Download free
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
