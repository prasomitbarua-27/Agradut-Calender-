import { buttonClasses } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT_LINKS } from "@/lib/config";

/** Contact links come from CONTACT_LINKS in src/lib/config.ts. */
export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-14 print:hidden">
      <Container className="grid gap-8 lg:grid-cols-2">
        <SectionHeading id="contact-heading" eyebrow="যোগাযোগ" title="তথ্য পাঠাতে বা জানতে চান?" />
        <div className="rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
          <p className="text-lg font-semibold text-ink">বিহারের তথ্য, অনুষ্ঠানের তারিখ বা সংশোধনী জানাতে যোগাযোগ করুন।</p>
          <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {CONTACT_LINKS.map((link) => (
              <li key={link.href} className="min-w-0">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "md", "w-full flex-wrap sm:w-auto")}
                >
                  {link.label}
                  <span className="text-sm font-normal text-muted">({link.display})</span>
                  <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
