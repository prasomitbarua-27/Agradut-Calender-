"use client";

import { useSyncExternalStore } from "react";
import { todayKey } from "@/lib/calendar";

const subscribe = () => () => {};

/**
 * Today's date key ("YYYY-MM-DD") in the visitor's time zone.
 * It is null while the page is being built on the server. Reading the clock on the
 * server would give a different "today" than the visitor's phone and cause a mismatch.
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, todayKey, () => null);
}
