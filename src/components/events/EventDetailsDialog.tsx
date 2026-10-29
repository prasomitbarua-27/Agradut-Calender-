"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { IconClose } from "@/components/ui/icons";
import { districtNote, districtText } from "@/lib/district";
import { STATUS_LABELS, formatDateLong } from "@/lib/format";
import type { EventWithVihara } from "@/types";

interface EventDetailsDialogProps {
  event: EventWithVihara | null;
  onClose: () => void;
  onShowOnCalendar: (event: EventWithVihara) => void;
  onShowVihara: (viharaId: string) => void;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="font-semibold text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-ink">{children}</dd>
    </div>
  );
}

/**
 * Uses the browser's built-in <dialog>. It already traps keyboard focus,
 * closes with the Escape key and gives focus back to the button that opened it.
 */
export default function EventDetailsDialog({ event, onClose, onShowOnCalendar, onShowVihara }: EventDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (event && !dialog.open) dialog.showModal();
    else if (!event && dialog.open) dialog.close();
  }, [event]);

  const vihara = event?.vihara;
  const contact = vihara?.contact;
  const hasContact = Boolean(contact && (contact.person || contact.phone || contact.email || contact.note));
  const hasMap = typeof vihara?.latitude === "number" && typeof vihara?.longitude === "number";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="event-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        // A click on the dark backdrop lands on the <dialog> element itself.
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-[90vh] w-[min(92vw,36rem)] overflow-y-auto rounded-card border border-line bg-ivory p-0 text-ink shadow-xl backdrop:bg-ink/60"
    >
      {event && (
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {event.isSample && <Badge tone="sample">নমুনা তথ্য</Badge>}
                {event.status && <Badge>{STATUS_LABELS[event.status]}</Badge>}
              </div>
              <h2 id="event-dialog-title" className="mt-2 text-2xl font-bold leading-snug text-brand">
                {event.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line bg-white text-brand hover:bg-brand-tint"
            >
              <IconClose />
            </button>
          </div>

          <dl className="mt-5 divide-y divide-line border-y border-line">
            <Row label="তারিখ">{formatDateLong(event.date)}</Row>
            <Row label="বিহার">{vihara?.name ?? "বিহারের তথ্য পাওয়া যায়নি"}</Row>
            {vihara?.district && <Row label="জেলা">{districtText(vihara)}</Row>}
            {vihara?.address && <Row label="ঠিকানা">{vihara.address}</Row>}
            {event.description && <Row label="নোট">{event.description}</Row>}
            {hasContact && contact && (
              <Row label="যোগাযোগ">
                <div className="space-y-1">
                  {contact.person && <p>{contact.person}</p>}
                  {contact.phone && (
                    <p>
                      <a className="text-brand underline underline-offset-2" href={`tel:${contact.phone}`}>
                        {contact.phone}
                      </a>
                    </p>
                  )}
                  {contact.email && (
                    <p>
                      <a className="text-brand underline underline-offset-2" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </p>
                  )}
                  {contact.note && <p className="text-muted">{contact.note}</p>}
                </div>
              </Row>
            )}
            {hasMap && vihara && (
              <Row label="মানচিত্র">
                <a
                  className="text-brand underline underline-offset-2"
                  href={`https://www.google.com/maps?q=${vihara.latitude},${vihara.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  মানচিত্রে দেখুন (নতুন ট্যাবে খুলবে)
                </a>
              </Row>
            )}
          </dl>

          {vihara && districtNote(vihara) && (
            <p className="mt-4 rounded-sm bg-gold-tint px-3 py-2 text-base text-gold-deep">{districtNote(vihara)}</p>
          )}

          {event.isSample && (
            <p className="mt-4 rounded-sm bg-gold-tint px-3 py-2 text-base text-gold-deep">
              এটি নমুনা তথ্য। যাচাইকৃত প্রকৃত অনুষ্ঠান নয়।
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => onShowOnCalendar(event)}>ক্যালেন্ডারে দেখুন</Button>
            {vihara && (
              <Button variant="secondary" onClick={() => onShowVihara(vihara.id)}>
                বিহারের তথ্য দেখুন
              </Button>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
