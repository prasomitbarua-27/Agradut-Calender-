"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/layout/BrandMark";
import Container from "@/components/ui/Container";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { NAV_LINKS, SITE_NAME } from "@/lib/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Let keyboard users close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur print:hidden">
      <Container className="flex h-16 items-center justify-between gap-3">
        <a href="#home" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="text-base font-bold leading-tight text-brand sm:text-lg">{SITE_NAME}</span>
        </a>

        <nav aria-label="প্রধান মেনু" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-card px-3 font-medium text-ink hover:bg-brand-tint hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line text-brand hover:bg-brand-tint lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </Container>

      <nav id="mobile-menu" aria-label="মোবাইল মেনু" hidden={!open} className="border-t border-line bg-ivory lg:hidden">
        <Container>
          <ul className="py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line/60 px-1 text-lg font-medium text-ink last:border-b-0 hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
