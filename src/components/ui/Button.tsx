import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outlineOnDark";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-card font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-4 text-base",
  lg: "min-h-12 px-6 text-lg",
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-ivory hover:bg-brand-deep",
  secondary: "border border-brand text-brand hover:bg-brand-tint",
  ghost: "text-brand hover:bg-brand-tint",
  onDark: "bg-gold-light text-brand-deep hover:bg-white",
  outlineOnDark: "border border-ivory/70 text-ivory hover:bg-white/10",
};

/** Use this on <a> links too, so links and buttons look the same. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  return [BASE, SIZES[size], VARIANTS[variant], extra].filter(Boolean).join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}
