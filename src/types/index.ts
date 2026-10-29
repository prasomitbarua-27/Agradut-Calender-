/**
 * Data shapes for the whole site.
 *
 * Dates are stored as plain "YYYY-MM-DD" text (a "date key"), never as Date objects.
 * This avoids the common bug where a date shifts by one day because of time zones.
 */

export type EventStatus = "scheduled" | "tentative" | "completed" | "cancelled";

/**
 * How sure we are about a Vihara's district:
 * - explicit:   the district is written at the start of the Vihara's name
 * - inferred:   guessed from a place name in the Vihara's name (NOT verified)
 * - unverified: could not be worked out
 * - abroad:     the Vihara is outside Bangladesh
 */
export type DistrictStatus = "explicit" | "inferred" | "unverified" | "abroad";

export interface ViharaContact {
  person?: string;
  phone?: string;
  email?: string;
  note?: string;
}

export interface Vihara {
  id: string;
  name: string;
  district: string;
  /** how reliable `district` is. Missing = treated as explicit (older/sample data) */
  districtStatus?: DistrictStatus;
  /** short reason for the district (from the workbook) */
  districtBasis?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  contact?: ViharaContact;
  /** true while the record is demo data and not verified */
  isSample?: boolean;
}

export interface KathinEvent {
  id: string;
  title: string;
  /** row number in the source workbook (for checking the import) */
  serial?: number;
  /** "YYYY-MM-DD" */
  date: string;
  /** links the event to a Vihara by id (no copying of Vihara info) */
  viharaId: string;
  description?: string;
  status?: EventStatus;
  /** true while the record is demo data and not verified */
  isSample?: boolean;
}

/** An event together with its Vihara. `vihara` is undefined if the id is unknown. */
export interface EventWithVihara extends KathinEvent {
  vihara?: Vihara;
}
