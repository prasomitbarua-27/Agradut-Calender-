import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/** No contact details are invented here. Add real ones when the project owner provides them. */
export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-14 print:hidden">
      <Container className="grid gap-8 lg:grid-cols-2">
        <SectionHeading id="contact-heading" eyebrow="যোগাযোগ" title="তথ্য পাঠাতে বা জানতে চান?" />
        <div className="rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
          <p className="text-lg font-semibold text-ink">যোগাযোগের মাধ্যম এখনও নির্ধারণ করা হয়নি।</p>
          <p className="mt-2 text-muted">
            বিহারের সঠিক তথ্য, অনুষ্ঠানের তারিখ বা সংশোধনী জানানোর জন্য ইমেইল ও ফোন নম্বর নির্ধারণ হলে সেগুলো এই জায়গায় দেখানো হবে।
          </p>
        </div>
      </Container>
    </section>
  );
}
