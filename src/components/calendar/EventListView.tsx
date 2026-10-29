import EventCard from "@/components/events/EventCard";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { IconPrinter } from "@/components/ui/icons";
import { formatMonthYear, toBn } from "@/lib/format";
import type { EventWithVihara } from "@/types";

interface EventListViewProps {
  year: number;
  month: number;
  events: EventWithVihara[];
  filtersActive: boolean;
  onOpenEvent: (eventId: string) => void;
  onClearFilters: () => void;
}

/** The "list" alternative to the grid: all matching events of the month on screen, in date order. */
export default function EventListView({ year, month, events, filtersActive, onOpenEvent, onClearFilters }: EventListViewProps) {
  return (
    <div className="mt-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-brand">
          {formatMonthYear(year, month)} মাসের অনুষ্ঠান
          <span className="ml-2 text-base font-medium text-muted">({toBn(events.length)} টি)</span>
        </h3>
        <Button variant="secondary" onClick={() => window.print()} className="print:hidden">
          <IconPrinter size={18} />
          প্রিন্ট করুন
        </Button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="এই মাসে কোনো অনুষ্ঠান নেই"
          description={filtersActive ? "ফিল্টার চালু আছে। ফিল্টার মুছে বা অন্য মাস বেছে দেখুন।" : "অন্য একটি মাস বেছে নিন।"}
          action={
            filtersActive ? (
              <Button variant="secondary" onClick={onClearFilters}>
                ফিল্টার মুছুন
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} onOpen={onOpenEvent} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
