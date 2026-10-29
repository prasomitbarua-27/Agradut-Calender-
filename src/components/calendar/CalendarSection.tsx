import CalendarToolbar, { type CalendarView } from "@/components/calendar/CalendarToolbar";
import EventListView from "@/components/calendar/EventListView";
import MonthGrid from "@/components/calendar/MonthGrid";
import SelectedDatePanel from "@/components/calendar/SelectedDatePanel";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { EventWithVihara } from "@/types";

interface CalendarSectionProps {
  year: number;
  month: number;
  today: string | null;
  selectedDate: string | null;
  view: CalendarView;
  filtersActive: boolean;
  byDate: Map<string, EventWithVihara[]>;
  monthEvents: EventWithVihara[];
  selectedEvents: EventWithVihara[];
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  onChangeView: (view: CalendarView) => void;
  onSelectDate: (key: string) => void;
  onOpenEvent: (eventId: string) => void;
  onClearFilters: () => void;
}

export default function CalendarSection(props: CalendarSectionProps) {
  const { year, month, today, selectedDate, view, filtersActive, byDate, monthEvents, selectedEvents } = props;

  return (
    <section id="calendar" aria-labelledby="calendar-heading" className="py-14">
      <Container>
        <div className="print:hidden">
          <SectionHeading
            id="calendar-heading"
            eyebrow="ক্যালেন্ডার"
            title="অনুষ্ঠানের ক্যালেন্ডার"
            description="একটি তারিখে ক্লিক করুন। রঙিন দাগ দেওয়া তারিখে অনুষ্ঠান আছে।"
          />
        </div>

        <div className="mt-6">
          <CalendarToolbar
            year={year}
            month={month}
            view={view}
            canGoToToday={today !== null}
            onPrev={props.onPrev}
            onNext={props.onNext}
            onToday={props.onToday}
            onChangeMonth={props.onChangeMonth}
            onChangeYear={props.onChangeYear}
            onChangeView={props.onChangeView}
          />
        </div>

        {view === "grid" ? (
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <MonthGrid
              year={year}
              month={month}
              today={today}
              selectedDate={selectedDate}
              byDate={byDate}
              onSelectDate={props.onSelectDate}
            />
            <SelectedDatePanel
              selectedDate={selectedDate}
              events={selectedEvents}
              filtersActive={filtersActive}
              onOpenEvent={props.onOpenEvent}
            />
          </div>
        ) : (
          <EventListView
            year={year}
            month={month}
            events={monthEvents}
            filtersActive={filtersActive}
            onOpenEvent={props.onOpenEvent}
            onClearFilters={props.onClearFilters}
          />
        )}
      </Container>
    </section>
  );
}
