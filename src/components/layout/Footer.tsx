import BrandMark from "@/components/layout/BrandMark";
import Container from "@/components/ui/Container";
import { NAV_LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/config";
import { toBn } from "@/lib/format";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory print:hidden">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark />
            <p className="text-lg font-bold">{SITE_NAME}</p>
          </div>
          <p className="mt-4 max-w-md text-ivory/80">{SITE_DESCRIPTION}</p>
        </div>

        <nav aria-label="ফুটার মেনু">
          <p className="font-semibold text-gold-light">দ্রুত লিঙ্ক</p>
          <ul className="mt-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center text-ivory/90 underline-offset-4 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-gold-light">যোগাযোগ</p>
          <p className="mt-3 text-ivory/80">যোগাযোগের তথ্য শীঘ্রই যুক্ত করা হবে।</p>
        </div>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="py-5 text-sm text-ivory/70">
          <p>
            © {toBn(new Date().getFullYear())} {SITE_NAME}। জেলার তথ্য প্রাথমিক অনুমান, যাচাই করা হয়নি। এই সাইট কোনো সংগঠনের অফিসিয়াল সাইট নয়।
          </p>
        </Container>
      </div>
    </footer>
  );
}
