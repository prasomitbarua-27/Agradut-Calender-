import Button from "@/components/ui/Button";
import { IconChevronLeft, IconChevronRight, IconGrid, IconList, IconRotate } from "@/components/ui/icons";
import { SelectField } from "@/components/ui/fields";
import { YEARS } from "@/lib/config";
import { MONTH_NAMES, formatMonthYear, toBn } from "@/lib/format";

export type CalendarView = "grid" | "list";

interface CalendarToolbarProps {
  year: number;
  month: number;
  view: CalendarView;
  canGoToToday: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  onChangeView: (view: CalendarView) => void;
}

const ARROW_BUTTON =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line bg-white text-brand hover:bg-brand-tint";

export default function CalendarToolbar({
  year,
  month,
  view,
  canGoToToday,
  onPrev,
  onNext,
  onToday,
  onChangeMonth,
  onChangeYear,
  onChangeView,
}: CalendarToolbarProps) {
  const monthOptions = MONTH_NAMES.map((name, index) => ({ value: String(index), label: name }));
  const yearValues = YEARS.includes(year) ? [...YEARS] : [...YEARS, year].sort((a, b) => a - b);
  const yearOptions = yearValues.map((y) => ({ value: String(y), label: toBn(y) }));

  const toggleClass = (active: boolean) =>
    `inline-flex min-h-10 items-center gap-2 rounded-sm px-3 text-base font-semibold ${
      active ? "bg-brand text-ivory" : "text-brand hover:bg-brand-tint"
    }`;

  return (
    <div className="rounded-card border border-line bg-white p-3 shadow-soft sm:p-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-brand" aria-live="polite">
          {formatMonthYear(year, month)}
        </h3>
        <div role="group" aria-label="প্রদর্শনের ধরন" className="inline-flex rounded-card border border-line p-0.5">
          <button type="button" aria-pressed={view === "grid"} className={toggleClass(view === "grid")} onClick={() => onChangeView("grid")}>
            <IconGrid size={18} />
            ক্যালেন্ডার
          </button>
          <button type="button" aria-pressed={view === "list"} className={toggleClass(view === "list")} onClick={() => onChangeView("list")}>
            <IconList size={18} />
            তালিকা
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {/* phones only: starts a new line so month and year get the full width */}
        <div aria-hidden="true" className="order-3 -my-1 h-0 basis-full sm:hidden" />
        <button type="button" className={`${ARROW_BUTTON} order-4 sm:order-none`} onClick={onPrev} aria-label="আগের মাস">
          <IconChevronLeft />
        </button>
        <SelectField
          id="calendar-month"
          label="মাস নির্বাচন করুন"
          hideLabel
          value={String(month)}
          onChange={(value) => onChangeMonth(Number(value))}
          options={monthOptions}
          className="order-1 min-w-0 flex-1 sm:order-none sm:w-44 sm:flex-none"
        />
        <SelectField
          id="calendar-year"
          label="বছর নির্বাচন করুন"
          hideLabel
          value={String(year)}
          onChange={(value) => onChangeYear(Number(value))}
          options={yearOptions}
          className="order-2 w-28 shrink-0 sm:order-none"
        />
        <button type="button" className={`${ARROW_BUTTON} order-5 sm:order-none`} onClick={onNext} aria-label="পরের মাস">
          <IconChevronRight />
        </button>
        <Button variant="secondary" onClick={onToday} disabled={!canGoToToday} className="order-6 min-w-0 flex-1 sm:order-none sm:ml-auto sm:w-auto sm:flex-none">
          <IconRotate size={18} />
          আজকের মাস
        </Button>
      </div>
    </div>
  );
}
