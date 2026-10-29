import { parseDateKey, weekdayOf } from "@/lib/calendar";
import type { EventStatus } from "@/types";

/** Text helpers for showing numbers and dates in Bengali. */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export const MONTH_NAMES = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
] as const;

const WEEKDAYS_SHORT = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"] as const;
const WEEKDAYS_LONG = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
] as const;

/** Weekday column headings, starting from the chosen first day of the week. */
export function weekdayHeaders(weekStartsOn: number): { short: string; long: string }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const index = (weekStartsOn + i) % 7;
    return { short: WEEKDAYS_SHORT[index], long: WEEKDAYS_LONG[index] };
  });
}

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${toBn(year)}`;
}

/** e.g. "শনিবার, ১৪ নভেম্বর ২০২৬" */
export function formatDateLong(key: string): string {
  const parsed = parseDateKey(key);
  const weekday = weekdayOf(key);
  if (!parsed || weekday === null) return key;
  return `${WEEKDAYS_LONG[weekday]}, ${toBn(parsed.day)} ${MONTH_NAMES[parsed.month]} ${toBn(parsed.year)}`;
}

export const STATUS_LABELS: Record<EventStatus, string> = {
  scheduled: "নির্ধারিত",
  tentative: "সম্ভাব্য",
  completed: "সম্পন্ন",
  cancelled: "বাতিল",
};
