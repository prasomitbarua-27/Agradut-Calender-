"use client";

import { useMemo, useState } from "react";
import CalendarSection from "@/components/calendar/CalendarSection";
import type { CalendarView } from "@/components/calendar/CalendarToolbar";
import EventDetailsDialog from "@/components/events/EventDetailsDialog";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import FilterBar from "@/components/filters/FilterBar";
import Container from "@/components/ui/Container";
import ViharaDirectory from "@/components/viharas/ViharaDirectory";
import { events as eventData, viharas as viharaData } from "@/data";
import { useToday } from "@/hooks/useToday";
import { monthPrefix, parseDateKey, shiftMonth } from "@/lib/calendar";
import { DEFAULT_VIEW } from "@/lib/config";
import { focusAndScroll, scrollToId } from "@/lib/dom";
import { attachViharas, groupByDate, groupByVihara, uniqueDistricts } from "@/lib/events";
import {
  EMPTY_FILTERS,
  filterEvents,
  filterViharas,
  getDateError,
  hasActiveFilters,
  type Filters,
} from "@/lib/filters";
import type { EventWithVihara } from "@/types";

/**
 * The "brain" of the interactive part of the page. It owns the state
 * (filters, visible month, selected date, view, open event) and hands data
 * down to small display components. Because every component gets its data from
 * the same filtered list, the calendar, cards and directory always agree.
 */
export default function KathinExplorer() {
  const today = useToday();
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [visible, setVisible] = useState<{ year: number; month: number }>(DEFAULT_VIEW);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<CalendarView>("grid");
  const [openEventId, setOpenEventId] = useState<string | null>(null);

  // Data prepared once.
  const allEvents = useMemo(() => attachViharas(eventData, viharaData), []);
  const districts = useMemo(() => uniqueDistricts(viharaData), []);

  // Everything below is derived from the filters.
  const filtered = useMemo(() => filterEvents(allEvents, filters), [allEvents, filters]);
  const filteredViharas = useMemo(() => filterViharas(viharaData, filters), [filters]);
  const byDate = useMemo(() => groupByDate(filtered), [filtered]);
  const eventsByVihara = useMemo(() => groupByVihara(filtered), [filtered]);

  const active = hasActiveFilters(filters);
  const dateError = getDateError(filters.date);
  const prefix = monthPrefix(visible.year, visible.month);
  const monthEvents = filtered.filter((event) => event.date.startsWith(prefix));
  const selectedEvents = selectedDate ? (byDate.get(selectedDate) ?? []) : [];
  const upcoming = today === null ? null : filtered.filter((event) => event.date >= today);
  const openEvent = allEvents.find((event) => event.id === openEventId) ?? null;

  function selectDate(key: string) {
    const parsed = parseDateKey(key);
    if (!parsed) return;
    setSelectedDate(key);
    setVisible({ year: parsed.year, month: parsed.month });
  }

  function handleFilterChange(patch: Partial<Filters>) {
    const next = { ...filters, ...patch };
    setFilters(next);

    // Keep the calendar in step with the filter the person just chose.
    if (patch.date && getDateError(patch.date) === null) {
      selectDate(patch.date);
    } else if ("year" in patch || "month" in patch) {
      setVisible({
        year: next.year ? Number(next.year) : visible.year,
        month: next.month ? Number(next.month) - 1 : visible.month,
      });
    }
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
  }

  function goToToday() {
    if (today) selectDate(today);
  }

  function stepMonth(delta: number) {
    setVisible((current) => shiftMonth(current.year, current.month, delta));
  }

  function showOnCalendar(event: EventWithVihara) {
    setOpenEventId(null);
    setView("grid");
    selectDate(event.date);
    // Wait a moment so the dialog has finished closing before we scroll.
    window.setTimeout(() => scrollToId("calendar"), 60);
  }

  function showVihara(viharaId: string) {
    setOpenEventId(null);
    // Make sure the Vihara is not hidden by the name/district filters.
    setFilters((current) => ({ ...current, query: "", district: "" }));
    window.setTimeout(() => focusAndScroll(`vihara-${viharaId}`), 60);
  }

  return (
    <>
      <section id="search" aria-labelledby="search-heading" className="border-b border-line bg-sand py-10 print:hidden">
        <Container>
          <FilterBar
            filters={filters}
            districts={districts}
            active={active}
            dateError={dateError}
            eventCount={filtered.length}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />
        </Container>
      </section>

      <CalendarSection
        year={visible.year}
        month={visible.month}
        today={today}
        selectedDate={selectedDate}
        view={view}
        filtersActive={active}
        byDate={byDate}
        monthEvents={monthEvents}
        selectedEvents={selectedEvents}
        onPrev={() => stepMonth(-1)}
        onNext={() => stepMonth(1)}
        onToday={goToToday}
        onChangeMonth={(month) => setVisible((current) => ({ ...current, month }))}
        onChangeYear={(year) => setVisible((current) => ({ ...current, year }))}
        onChangeView={setView}
        onSelectDate={selectDate}
        onOpenEvent={setOpenEventId}
        onClearFilters={clearFilters}
      />

      <UpcomingEvents
        events={upcoming}
        filtersActive={active}
        onOpenEvent={setOpenEventId}
        onGoToCalendar={() => scrollToId("calendar")}
        onClearFilters={clearFilters}
      />

      <ViharaDirectory
        viharas={filteredViharas}
        eventsByVihara={eventsByVihara}
        filtersActive={active}
        onOpenEvent={setOpenEventId}
        onClearFilters={clearFilters}
      />

      <EventDetailsDialog
        event={openEvent}
        onClose={() => setOpenEventId(null)}
        onShowOnCalendar={showOnCalendar}
        onShowVihara={showVihara}
      />
    </>
  );
}
