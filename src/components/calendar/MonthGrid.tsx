"use client";

import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { addDays, buildMonthGrid, daysInMonth, monthPrefix, parseDateKey, shiftMonth, toDateKey } from "@/lib/calendar";
import { WEEK_STARTS_ON } from "@/lib/config";
import { formatDateLong, formatMonthYear, toBn, weekdayHeaders } from "@/lib/format";
import type { EventWithVihara } from "@/types";

interface MonthGridProps {
  year: number;
  month: number;
  today: string | null;
  selectedDate: string | null;
  byDate: Map<string, EventWithVihara[]>;
  onSelectDate: (key: string) => void;
}

export default function MonthGrid({ year, month, today, selectedDate, byDate, onSelectDate }: MonthGridProps) {
  const weeks = useMemo(() => buildMonthGrid(year, month, WEEK_STARTS_ON), [year, month]);
  const headers = weekdayHeaders(WEEK_STARTS_ON);
  const tableRef = useRef<HTMLTableElement>(null);
  const focusAfterSelect = useRef(false);

  const prefix = monthPrefix(year, month);
  const inThisMonth = (key: string | null) => key !== null && key.startsWith(prefix);

  // Only one date is reachable with the Tab key; arrow keys move between dates.
  const tabbableKey = inThisMonth(selectedDate)
    ? (selectedDate as string)
    : inThisMonth(today)
      ? (today as string)
      : toDateKey(year, month, 1);

  // After an arrow-key move, put keyboard focus on the newly selected date.
  useEffect(() => {
    if (!focusAfterSelect.current) return;
    focusAfterSelect.current = false;
    tableRef.current?.querySelector<HTMLButtonElement>(`button[data-key="${selectedDate}"]`)?.focus();
  }, [selectedDate, year, month]);

  function handleKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-key]");
    if (!button) return;
    const key = button.dataset.key as string;
    let next: string | null = null;

    switch (event.key) {
      case "ArrowLeft":
        next = addDays(key, -1);
        break;
      case "ArrowRight":
        next = addDays(key, 1);
        break;
      case "ArrowUp":
        next = addDays(key, -7);
        break;
      case "ArrowDown":
        next = addDays(key, 7);
        break;
      case "PageUp":
      case "PageDown": {
        const parsed = parseDateKey(key);
        if (parsed) {
          const target = shiftMonth(parsed.year, parsed.month, event.key === "PageUp" ? -1 : 1);
          const day = Math.min(parsed.day, daysInMonth(target.year, target.month));
          next = toDateKey(target.year, target.month, day);
        }
        break;
      }
    }

    if (next) {
      event.preventDefault();
      focusAfterSelect.current = true;
      onSelectDate(next);
    }
  }

  return (
    <div className="rounded-card border border-line bg-white p-2 shadow-soft sm:p-4">
      <table ref={tableRef} onKeyDown={handleKeyDown} className="w-full table-fixed border-collapse">
        <caption className="sr-only">
          {formatMonthYear(year, month)} মাসের ক্যালেন্ডার। তারিখ বদলাতে তীর চিহ্নের কী ব্যবহার করুন।
        </caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.long} scope="col" aria-label={header.long} className="py-2 text-center text-sm font-semibold text-muted sm:text-base">
                {header.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].key}>
              {week.map((cell) => {
                if (!cell.inMonth) {
                  return (
                    <td key={cell.key} className="p-0.5 text-center">
                      <span aria-hidden="true" className="flex h-12 items-center justify-center text-base text-muted/40 sm:h-14">
                        {toBn(cell.day)}
                      </span>
                    </td>
                  );
                }

                const count = byDate.get(cell.key)?.length ?? 0;
                const isSelected = cell.key === selectedDate;
                const isToday = cell.key === today;

                const look = isSelected
                  ? "bg-brand text-ivory"
                  : count > 0
                    ? "bg-brand-tint text-brand hover:bg-[#ecd5d9]"
                    : "text-ink hover:bg-sand";

                const label = [
                  formatDateLong(cell.key),
                  isToday ? "আজ" : null,
                  count > 0 ? `${toBn(count)} টি অনুষ্ঠান` : null,
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <td key={cell.key} className="p-0.5 text-center">
                    <button
                      type="button"
                      data-key={cell.key}
                      tabIndex={cell.key === tabbableKey ? 0 : -1}
                      aria-label={label}
                      aria-pressed={isSelected}
                      aria-current={isToday ? "date" : undefined}
                      onClick={() => onSelectDate(cell.key)}
                      className={`flex h-12 w-full flex-col items-center justify-center rounded-card text-base font-medium transition-colors sm:h-14 sm:text-lg ${look} ${
                        isToday ? "ring-2 ring-gold-deep" : ""
                      }`}
                    >
                      <span aria-hidden="true">{toBn(cell.day)}</span>
                      <span aria-hidden="true" className="mt-0.5 flex h-1.5 gap-0.5">
                        {Array.from({ length: Math.min(count, 3) }, (_, i) => (
                          <span key={i} className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-ivory" : "bg-brand"}`} />
                        ))}
                      </span>
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-sm text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-4 w-4 rounded-sm ring-2 ring-gold-deep" />
          আজ
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="flex h-4 w-4 items-end justify-center rounded-sm bg-brand-tint pb-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          অনুষ্ঠান আছে
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-4 w-4 rounded-sm bg-brand" />
          নির্বাচিত তারিখ
        </li>
      </ul>
    </div>
  );
}
