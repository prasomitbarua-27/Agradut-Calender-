import EventCard from "@/components/events/EventCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { toBn } from "@/lib/format";
import type { EventWithVihara } from "@/types";

const LIMIT = 6;

interface UpcomingEventsProps {
  /** null = still working out today's date (first moment after the page loads) */
  events: EventWithVihara[] | null;
  filtersActive: boolean;
  onOpenEvent: (eventId: string) => void;
  onGoToCalendar: () => void;
  onClearFilters: () => void;
}

export default function UpcomingEvents({ events, filtersActive, onOpenEvent, onGoToCalendar, onClearFilters }: UpcomingEventsProps) {
  return (
    <section id="upcoming" aria-labelledby="upcoming-heading" className="border-y border-line bg-white py-14 print:hidden">
      <Container>
        <SectionHeading
          id="upcoming-heading"
          eyebrow="আসন্ন অনুষ্ঠান"
          title="সামনের অনুষ্ঠানসমূহ"
          description="আজ থেকে শুরু করে পরবর্তী অনুষ্ঠানগুলো তারিখ অনুযায়ী সাজানো আছে।"
        />

        <div className="mt-6">
          {events === null ? (
            <p role="status" className="text-muted">
              লোড হচ্ছে…
            </p>
          ) : events.length === 0 ? (
            <EmptyState
              title="কোনো আসন্ন অনুষ্ঠান নেই"
              description={filtersActive ? "ফিল্টারের সাথে মেলে এমন কোনো আসন্ন অনুষ্ঠান পাওয়া যায়নি।" : "নতুন অনুষ্ঠানের তথ্য যুক্ত হলে এখানে দেখা যাবে।"}
              action={
                filtersActive ? (
                  <Button variant="secondary" onClick={onClearFilters}>
                    ফিল্টার মুছুন
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <>
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {events.slice(0, LIMIT).map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} onOpen={onOpenEvent} />
                  </li>
                ))}
              </ul>
              {events.length > LIMIT && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <p className="text-muted">আরও {toBn(events.length - LIMIT)} টি অনুষ্ঠান আছে।</p>
                  <Button variant="secondary" onClick={onGoToCalendar}>
                    ক্যালেন্ডারে আরও দেখুন
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
