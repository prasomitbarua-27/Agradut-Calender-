import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/ui/EmptyState";
import { formatDateLong } from "@/lib/format";
import type { EventWithVihara } from "@/types";

interface SelectedDatePanelProps {
  selectedDate: string | null;
  events: EventWithVihara[];
  filtersActive: boolean;
  onOpenEvent: (eventId: string) => void;
}

export default function SelectedDatePanel({ selectedDate, events, filtersActive, onOpenEvent }: SelectedDatePanelProps) {
  return (
    <aside
      aria-labelledby="selected-date-heading"
      className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-5 lg:sticky lg:top-24 lg:self-start print:hidden"
    >
      <h3 id="selected-date-heading" className="text-xl font-bold text-brand">
        নির্বাচিত তারিখ
      </h3>

      <div aria-live="polite">
        {selectedDate === null ? (
          <p className="mt-3 text-muted">ক্যালেন্ডার থেকে একটি তারিখ বেছে নিন। সেই দিনের অনুষ্ঠান এখানে দেখা যাবে।</p>
        ) : (
          <>
            <p className="mt-1 text-lg font-medium text-ink">{formatDateLong(selectedDate)}</p>
            {events.length === 0 ? (
              <div className="mt-4">
                <EmptyState
                  title="এই তারিখে কোনো অনুষ্ঠান নেই"
                  description={
                    filtersActive
                      ? "ফিল্টারের সাথে মেলে এমন কোনো অনুষ্ঠান এই দিনে পাওয়া যায়নি। অন্য একটি তারিখ বেছে নিন।"
                      : "রঙিন দাগ দেওয়া অন্য একটি তারিখ বেছে নিন।"
                  }
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {events.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} onOpen={onOpenEvent} compact />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
