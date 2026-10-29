import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { parseDateKey } from "@/lib/calendar";
import { districtText } from "@/lib/district";
import { MONTH_NAMES, STATUS_LABELS, formatDateLong, toBn } from "@/lib/format";
import type { EventWithVihara } from "@/types";

interface EventCardProps {
  event: EventWithVihara;
  onOpen: (eventId: string) => void;
  /** compact = no big date block (used where the date is already shown nearby) */
  compact?: boolean;
}

export default function EventCard({ event, onOpen, compact = false }: EventCardProps) {
  const parsed = parseDateKey(event.date);
  const viharaName = event.vihara?.name ?? "বিহারের তথ্য পাওয়া যায়নি";
  const district = event.vihara ? districtText(event.vihara) : undefined;
  const address = event.vihara?.address;
  const location = [district, address].filter(Boolean).join(" · ");

  return (
    <article className="flex gap-4 rounded-card border border-line bg-white p-4 shadow-soft">
      {!compact && parsed && (
        <div
          aria-hidden="true"
          className="flex w-16 shrink-0 flex-col items-center justify-center self-start rounded-sm bg-brand-tint py-2 text-brand"
        >
          <span className="text-2xl font-bold leading-none">{toBn(parsed.day)}</span>
          <span className="mt-1 text-sm font-medium leading-tight">{MONTH_NAMES[parsed.month]}</span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        {(event.isSample || event.status) && (
          <div className="mb-1 flex flex-wrap gap-2">
            {event.isSample && <Badge tone="sample">নমুনা তথ্য</Badge>}
            {event.status && (
              <Badge tone={event.status === "cancelled" ? "warn" : event.status === "scheduled" ? "good" : "neutral"}>
                {STATUS_LABELS[event.status]}
              </Badge>
            )}
          </div>
        )}

        <h3 className="text-lg font-semibold leading-snug text-ink">{event.title}</h3>
        <p className={compact ? "text-base text-muted" : "sr-only"}>{formatDateLong(event.date)}</p>
        <p className="mt-0.5 font-medium text-brand">{viharaName}</p>
        {location && <p className="text-base text-muted">{location}</p>}

        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => onOpen(event.id)}
          aria-label={`বিস্তারিত দেখুন: ${event.title}, ${viharaName}, ${formatDateLong(event.date)}`}
        >
          বিস্তারিত দেখুন
        </Button>
      </div>
    </article>
  );
}
