/**
 * Pure calendar helpers (Gregorian). No React in this file, so it is easy to test.
 * A "date key" is a "YYYY-MM-DD" string. Months are 0-based (0 = January) like JavaScript.
 */

export type DateKey = string;

export interface ParsedDate {
  year: number;
  month: number;
  day: number;
}

export interface GridCell {
  key: DateKey;
  day: number;
  inMonth: boolean;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

export function toDateKey(year: number, month: number, day: number): DateKey {
  return `${String(year).padStart(4, "0")}-${pad2(month + 1)}-${pad2(day)}`;
}

/** Returns null for anything that is not a real calendar date (e.g. 2026-02-30). */
export function parseDateKey(key: string): ParsedDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const check = new Date(year, month, day);
  if (check.getFullYear() !== year || check.getMonth() !== month || check.getDate() !== day) {
    return null;
  }
  return { year, month, day };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Move forward/back by whole months. Handles the December/January boundary. */
export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const index = year * 12 + month + delta;
  return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 };
}

export function addDays(key: DateKey, delta: number): DateKey {
  const parsed = parseDateKey(key);
  if (!parsed) return key;
  const d = new Date(parsed.year, parsed.month, parsed.day + delta);
  return toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

/** 0 = Sunday ... 6 = Saturday, or null for an invalid key. */
export function weekdayOf(key: DateKey): number | null {
  const parsed = parseDateKey(key);
  if (!parsed) return null;
  return new Date(parsed.year, parsed.month, parsed.day).getDay();
}

/** Today's date key in the visitor's own time zone. */
export function todayKey(): DateKey {
  const d = new Date();
  return toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Key prefix of a month, e.g. "2026-11-" (handy for "is this event in this month?"). */
export function monthPrefix(year: number, month: number): string {
  return `${String(year).padStart(4, "0")}-${pad2(month + 1)}-`;
}

/**
 * Builds the month as rows of 7 cells. Days from the previous/next month fill the
 * empty cells (inMonth = false) so every row is complete and weekdays line up.
 */
export function buildMonthGrid(year: number, month: number, weekStartsOn: 0 | 1 | 6 = 0): GridCell[][] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const lead = (firstWeekday - weekStartsOn + 7) % 7;
  const total = daysInMonth(year, month);
  const weekCount = Math.ceil((lead + total) / 7);

  const weeks: GridCell[][] = [];
  for (let w = 0; w < weekCount; w++) {
    const row: GridCell[] = [];
    for (let i = 0; i < 7; i++) {
      const dayNumber = w * 7 + i - lead + 1; // 1..total are in this month
      const d = new Date(year, month, dayNumber);
      row.push({
        key: toDateKey(d.getFullYear(), d.getMonth(), d.getDate()),
        day: d.getDate(),
        inMonth: dayNumber >= 1 && dayNumber <= total,
      });
    }
    weeks.push(row);
  }
  return weeks;
}
