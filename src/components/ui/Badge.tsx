import type { ReactNode } from "react";

type Tone = "sample" | "neutral" | "good" | "warn";

const TONES: Record<Tone, string> = {
  sample: "bg-gold-tint text-gold-deep border-gold/40",
  neutral: "bg-sand text-muted border-line",
  good: "bg-leaf-tint text-leaf border-leaf/30",
  warn: "bg-brand-tint text-brand border-brand/30",
};

export default function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-sm font-medium leading-snug ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
