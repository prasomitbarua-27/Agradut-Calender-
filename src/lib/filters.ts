import { parseDateKey } from "@/lib/calendar";
import { YEARS } from "@/lib/config";
import type { EventWithVihara, Vihara } from "@/types";

/**
 * One filter object is shared by the calendar, the event list, the upcoming cards
 * and the Vihara directory, so they always agree with each other.
 * An empty string means "no filter".
 */
export interface Filters {
  query: string; // Vihara name (or event title)
  district: string;
  month: string; // "1".."12"
  year: string; // e.g. "2026"
  date: string; // "YYYY-MM-DD"
}

export const EMPTY_FILTERS: Filters = { query: "", district: "", month: "", year: "", date: "" };

export function hasActiveFilters(filters: Filters): boolean {
  return Object.values(filters).some((value) => value.trim() !== "");
}

/** Bengali message when the date filter cannot be used, otherwise null. */
export function getDateError(date: string): string | null {
  if (date === "") return null;
  const parsed = parseDateKey(date);
  if (!parsed) return "তারিখটি সঠিক নয়। অনুগ্রহ করে একটি বৈধ তারিখ দিন।";
  const first = YEARS[0];
  const last = YEARS[YEARS.length - 1];
  if (parsed.year < first || parsed.year > last) {
    return "এই বছরের তথ্য পাওয়া যাবে না। অনুগ্রহ করে অন্য একটি তারিখ দিন।";
  }
  return null;
}

/** Same letters can be typed in more than one way in Unicode; NFC makes them compare equal. */
function normalizeText(text: string): string {
  return text.normalize("NFC").trim().toLowerCase();
}

/** Case-insensitive "contains" match. Empty search text matches everything. */
export function matchesQuery(query: string, ...fields: (string | undefined)[]): boolean {
  const needle = normalizeText(query);
  if (!needle) return true;
  return fields.some((field) => field !== undefined && normalizeText(field).includes(needle));
}

export function filterEvents(events: EventWithVihara[], filters: Filters): EventWithVihara[] {
  const dateIsUsable = filters.date !== "" && getDateError(filters.date) === null;
  return events.filter((event) => {
    if (!matchesQuery(filters.query, event.vihara?.name, event.title)) return false;
    if (filters.district && event.vihara?.district !== filters.district) return false;

    if (filters.month || filters.year) {
      const parsed = parseDateKey(event.date);
      if (!parsed) return false;
      if (filters.month && parsed.month + 1 !== Number(filters.month)) return false;
      if (filters.year && parsed.year !== Number(filters.year)) return false;
    }

    if (dateIsUsable && event.date !== filters.date) return false;
    return true;
  });
}

/** Only the name and district filters make sense for the Vihara directory. */
export function filterViharas(viharas: Vihara[], filters: Filters): Vihara[] {
  return viharas.filter((vihara) => {
    if (!matchesQuery(filters.query, vihara.name, vihara.address)) return false;
    if (filters.district && vihara.district !== filters.district) return false;
    return true;
  });
}
