import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import MapPlaceholder from "@/components/viharas/MapPlaceholder";
import ViharaCard from "@/components/viharas/ViharaCard";
import { toBn } from "@/lib/format";
import type { EventWithVihara, Vihara } from "@/types";

interface ViharaDirectoryProps {
  viharas: Vihara[];
  eventsByVihara: Map<string, EventWithVihara[]>;
  filtersActive: boolean;
  onOpenEvent: (eventId: string) => void;
  onClearFilters: () => void;
}

export default function ViharaDirectory({ viharas, eventsByVihara, filtersActive, onOpenEvent, onClearFilters }: ViharaDirectoryProps) {
  return (
    <section id="viharas" aria-labelledby="viharas-heading" className="bg-sand py-14 print:hidden">
      <Container>
        <SectionHeading
          id="viharas-heading"
          eyebrow="বিহারের তালিকা"
          title="বিহার ও তাদের অনুষ্ঠান"
          description="উপরের অনুসন্ধানে নাম বা জেলা বেছে নিলে এই তালিকাও সেই অনুযায়ী বদলাবে। জেলা প্রাথমিক অনুমান; অনুমান করা জেলার পাশে (সম্ভাব্য) লেখা আছে।"
        />

        <div className="mt-6">
          <MapPlaceholder />
        </div>

        <p role="status" aria-live="polite" className="mt-6 font-medium text-ink">
          {toBn(viharas.length)} টি বিহার দেখানো হচ্ছে
        </p>

        <div className="mt-3">
          {viharas.length === 0 ? (
            <EmptyState
              title="কোনো বিহার পাওয়া যায়নি"
              description="অন্য নাম লিখে বা জেলা বদলে আবার চেষ্টা করুন।"
              action={
                filtersActive ? (
                  <Button variant="secondary" onClick={onClearFilters}>
                    ফিল্টার মুছুন
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {viharas.map((vihara) => (
                <li key={vihara.id}>
                  <ViharaCard vihara={vihara} events={eventsByVihara.get(vihara.id) ?? []} onOpenEvent={onOpenEvent} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
