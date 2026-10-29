import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { SelectField, TextField } from "@/components/ui/fields";
import { districtOptionLabel, isRealDistrict } from "@/lib/district";
import { YEARS } from "@/lib/config";
import { MONTH_NAMES, toBn } from "@/lib/format";
import type { Filters } from "@/lib/filters";

interface FilterBarProps {
  filters: Filters;
  districts: string[];
  active: boolean;
  dateError: string | null;
  eventCount: number;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
}

export default function FilterBar({ filters, districts, active, dateError, eventCount, onChange, onClear }: FilterBarProps) {
  const districtOptions = districts.map((d) => ({ value: d, label: districtOptionLabel(d) }));
  const monthOptions = MONTH_NAMES.map((name, index) => ({ value: String(index + 1), label: name }));
  const yearOptions = YEARS.map((y) => ({ value: String(y), label: toBn(y) }));

  return (
    <div>
      <h2 id="search-heading" className="text-2xl font-bold text-brand sm:text-3xl">
        বিহার ও অনুষ্ঠান খুঁজুন
      </h2>
      <p className="mt-1 text-muted">লেখার সাথে সাথেই ফলাফল বদলে যাবে।</p>

      <form
        role="search"
        aria-labelledby="search-heading"
        onSubmit={(event) => event.preventDefault()}
        className="mt-5 rounded-card border border-line bg-white p-4 shadow-soft sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <TextField
            id="filter-query"
            label="বিহারের নাম"
            value={filters.query}
            onChange={(query) => onChange({ query })}
            placeholder="বিহারের নাম লিখুন"
            withSearchIcon
            className="sm:col-span-2 lg:col-span-2"
          />
          <SelectField
            id="filter-district"
            label="জেলা"
            value={filters.district}
            onChange={(district) => onChange({ district })}
            options={districtOptions}
            placeholder="সব জেলা"
          />
          <SelectField
            id="filter-month"
            label="মাস"
            value={filters.month}
            onChange={(month) => onChange({ month })}
            options={monthOptions}
            placeholder="সব মাস"
          />
          <SelectField
            id="filter-year"
            label="বছর"
            value={filters.year}
            onChange={(year) => onChange({ year })}
            options={yearOptions}
            placeholder="সব বছর"
          />
          <TextField
            id="filter-date"
            label="নির্দিষ্ট তারিখ"
            type="date"
            value={filters.date}
            onChange={(date) => onChange({ date })}
            min={`${YEARS[0]}-01-01`}
            max={`${YEARS[YEARS.length - 1]}-12-31`}
            error={dateError}
          />
        </div>

        {isRealDistrict(filters.district) && (
          <p className="mt-4 rounded-sm bg-gold-tint px-3 py-2 text-base text-gold-deep">
            জেলার তথ্য প্রাথমিক অনুমান। এই ফলাফলে এমন বিহারও আছে যাদের জেলা শুধু নাম দেখে অনুমান করা হয়েছে, আর কিছু বিহারের জেলা এখনও জানা যায়নি বলে এখানে আসেনি।
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p role="status" aria-live="polite" className="text-base font-medium text-ink">
            {active
              ? eventCount > 0
                ? `${toBn(eventCount)} টি অনুষ্ঠান পাওয়া গেছে`
                : "কোনো অনুষ্ঠান পাওয়া যায়নি"
              : "নাম, জেলা বা তারিখ দিয়ে অনুষ্ঠান খুঁজুন।"}
          </p>
          <Button variant="secondary" onClick={onClear} disabled={!active}>
            ফিল্টার মুছুন
          </Button>
        </div>
      </form>

      {active && eventCount === 0 && (
        <div className="mt-4">
          <EmptyState
            title="কোনো ফলাফল মেলেনি"
            description="অন্য নাম লিখে বা কিছু ফিল্টার সরিয়ে আবার চেষ্টা করুন।"
            action={<Button onClick={onClear}>সব ফিল্টার মুছুন</Button>}
          />
        </div>
      )}
    </div>
  );
}
