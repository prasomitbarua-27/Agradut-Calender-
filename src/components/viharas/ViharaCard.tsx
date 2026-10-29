import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { IconMapPin } from "@/components/ui/icons";
import { parseDateKey } from "@/lib/calendar";
import { districtNote, districtText } from "@/lib/district";
import { MONTH_NAMES, formatDateLong, toBn } from "@/lib/format";
import type { EventWithVihara, Vihara } from "@/types";

interface ViharaCardProps {
  vihara: Vihara;
  events: EventWithVihara[];
  onOpenEvent: (eventId: string) => void;
}

export default function ViharaCard({ vihara, events, onOpenEvent }: ViharaCardProps) {
  const contact = vihara.contact;
  const hasContact = Boolean(contact && (contact.person || contact.phone || contact.email || contact.note));
  const hasMap = typeof vihara.latitude === "number" && typeof vihara.longitude === "number";

  return (
    <article
      id={`vihara-${vihara.id}`}
      tabIndex={-1}
      className="flex h-full flex-col rounded-card border border-line bg-white p-4 shadow-soft sm:p-5"
    >
      {vihara.isSample && (
        <div className="mb-2">
          <Badge tone="sample">নমুনা তথ্য</Badge>
        </div>
      )}
      <h3 className="text-xl font-bold leading-snug text-brand">{vihara.name}</h3>

      <p className="mt-2 flex items-start gap-2 text-ink">
        <IconMapPin size={18} className="mt-1.5 shrink-0 text-gold-deep" />
        <span>
          <span className="font-medium">{districtText(vihara)}</span>
          {districtNote(vihara) && <span className="block text-base text-muted">{districtNote(vihara)}</span>}
          {vihara.address && <span className="block text-base text-muted">{vihara.address}</span>}
        </span>
      </p>

      {hasContact && contact && (
        <div className="mt-3 space-y-0.5 text-base">
          <p className="font-semibold text-muted">যোগাযোগ</p>
          {contact.person && <p>{contact.person}</p>}
          {contact.phone && (
            <p>
              <a className="text-brand underline underline-offset-2" href={`tel:${contact.phone}`}>
                {contact.phone}
              </a>
            </p>
          )}
          {contact.email && (
            <p className="break-words">
              <a className="text-brand underline underline-offset-2" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          )}
          {contact.note && <p className="text-muted">{contact.note}</p>}
        </div>
      )}

      {hasMap && (
        <p className="mt-3 text-base">
          <a
            className="text-brand underline underline-offset-2"
            href={`https://www.google.com/maps?q=${vihara.latitude},${vihara.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            মানচিত্রে দেখুন (নতুন ট্যাবে খুলবে)
          </a>
        </p>
      )}

      <div className="mt-4 border-t border-line pt-3">
        <p className="text-base font-semibold text-muted">অনুষ্ঠানের তারিখ</p>
        {events.length === 0 ? (
          <p className="mt-1 text-base text-muted">কোনো অনুষ্ঠানের তথ্য নেই।</p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {events.map((event) => {
              const parsed = parseDateKey(event.date);
              const label = parsed ? `${toBn(parsed.day)} ${MONTH_NAMES[parsed.month]} ${toBn(parsed.year)}` : event.date;
              return (
                <li key={event.id}>
                  <Button
                    variant="secondary"
                    onClick={() => onOpenEvent(event.id)}
                    aria-label={`বিস্তারিত দেখুন: ${formatDateLong(event.date)}`}
                  >
                    {label}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
