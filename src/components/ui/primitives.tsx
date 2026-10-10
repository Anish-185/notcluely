"use client";
import Image from "next/image";
import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";

export function GlassCard({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Headline in the human (serif) voice, with an optional kicker paragraph. */
export function SectionHeading({
  title,
  lede,
  as: Tag = "h2",
  className = "",
  size = "var(--step-4)",
  measure,
}: {
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: string;
  /** max line length, measured in the heading's own ch */
  measure?: string;
}) {
  return (
    <div className={className}>
      <Tag className="display" style={{ fontSize: size, maxWidth: measure }}>
        {title}
      </Tag>
      {lede && <p className="lede mt-6">{lede}</p>}
    </div>
  );
}

/** Muted looping video that only plays while on screen, and never under reduced motion. */
export function LoopVideo({ name, label, className = "" }: { name: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      rootMargin: "200px",
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={`/assets/video/${name}.jpg`}
      aria-label={label}
    >
      <source src={`/assets/video/${name}.webm`} type="video/webm" />
      <source src={`/assets/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

export function Art({
  src,
  alt,
  className = "",
  sizes = "(min-width: 900px) 50vw, 100vw",
  preload,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={`/assets/img/${src}`}
      alt={alt}
      fill
      sizes={sizes}
      quality={85}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}

/** Museum wall label: what the piece is, what it's made of, how it performs. */
export function WallLabel({ plate, title, lines }: { plate: string; title: string; lines: string[] }) {
  return (
    <dl className="mt-8 grid max-w-sm grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-t border-line pt-4 text-[13px] leading-snug text-dim">
      <dt className="dots text-fg">{plate}</dt>
      <dd className="font-medium text-fg">{title}</dd>
      {lines.map((l, i) => (
        <dd key={i} className="col-start-2">
          {l}
        </dd>
      ))}
    </dl>
  );
}

/** The mark: a 3×3 dot-matrix with one live dot. */
export function Mark({ size = 22 }: { size?: number }) {
  const d = [0, 1, 2];
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden>
      {d.flatMap((r) =>
        d.map((c) => (
          <circle
            key={`${r}${c}`}
            cx={5 + c * 10}
            cy={5 + r * 10}
            r={r === 2 && c === 2 ? 4.2 : 3.4}
            fill={r === 2 && c === 2 ? "var(--signal)" : "currentColor"}
            opacity={r === 0 && c === 0 ? 0.35 : 1}
          />
        )),
      )}
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark />
      <span className="display text-[1.35rem] tracking-[-0.03em]">Notcluely</span>
    </span>
  );
}
