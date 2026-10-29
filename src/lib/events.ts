import { DISTRICT_ABROAD, DISTRICT_UNVERIFIED, isRealDistrict } from "@/lib/district";
import type { EventWithVihara, KathinEvent, Vihara } from "@/types";

/** Helpers that join and group data. Components call these instead of re-doing the work. */

export function compareEvents(a: KathinEvent, b: KathinEvent): number {
  // "YYYY-MM-DD" strings sort correctly as plain text.
  return a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
}

/** Adds the matching Vihara to every event (undefined if the id is unknown) and sorts by date. */
export function attachViharas(events: KathinEvent[], viharas: Vihara[]): EventWithVihara[] {
  const byId = new Map(viharas.map((v) => [v.id, v] as const));
  return events.map((e) => ({ ...e, vihara: byId.get(e.viharaId) })).sort(compareEvents);
}

export function groupByDate(events: EventWithVihara[]): Map<string, EventWithVihara[]> {
  const map = new Map<string, EventWithVihara[]>();
  for (const event of events) {
    const list = map.get(event.date);
    if (list) list.push(event);
    else map.set(event.date, [event]);
  }
  return map;
}

export function groupByVihara(events: EventWithVihara[]): Map<string, EventWithVihara[]> {
  const map = new Map<string, EventWithVihara[]>();
  for (const event of events) {
    const list = map.get(event.viharaId);
    if (list) list.push(event);
    else map.set(event.viharaId, [event]);
  }
  return map;
}

/** Real districts in Bengali order, then "unverified" and "abroad" at the end (if present). */
export function uniqueDistricts(viharas: Vihara[]): string[] {
  const all = new Set(viharas.map((v) => v.district).filter(Boolean));
  const real = Array.from(all)
    .filter(isRealDistrict)
    .sort((a, b) => a.localeCompare(b, "bn"));
  const special = [DISTRICT_UNVERIFIED, DISTRICT_ABROAD].filter((d) => all.has(d));
  return [...real, ...special];
}
