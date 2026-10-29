import type { DistrictStatus, Vihara } from "@/types";

/**
 * Honest wording for districts. Only "explicit" districts are shown plainly.
 * Guesses and unknowns are always labelled so nobody mistakes them for verified facts.
 */

/** These two values come straight from the workbook's district column. */
export const DISTRICT_UNVERIFIED = "যাচাই প্রয়োজন";
export const DISTRICT_ABROAD = "বাংলাদেশের জেলা নয়—বিদেশে";

export function statusOf(vihara: Pick<Vihara, "districtStatus">): DistrictStatus {
  return vihara.districtStatus ?? "explicit";
}

/** Short text for cards and lists, e.g. "চট্টগ্রাম (সম্ভাব্য)". */
export function districtText(vihara: Pick<Vihara, "district" | "districtStatus">): string {
  switch (statusOf(vihara)) {
    case "inferred":
      return `${vihara.district} (সম্ভাব্য)`;
    case "unverified":
      return "জেলা যাচাই প্রয়োজন";
    case "abroad":
      return "বিদেশে (বাংলাদেশের জেলা নয়)";
    default:
      return vihara.district;
  }
}

/** A one-line warning, or null when the district is clearly stated in the name. */
export function districtNote(vihara: Pick<Vihara, "districtStatus">): string | null {
  switch (statusOf(vihara)) {
    case "inferred":
      return "জেলাটি বিহারের নামে থাকা স্থাননাম দেখে অনুমান করা হয়েছে। এটি এখনও যাচাই করা হয়নি।";
    case "unverified":
      return "এই বিহারের জেলা এখনও নির্ভরযোগ্যভাবে জানা যায়নি। যাচাই প্রয়োজন।";
    default:
      return null;
  }
}

/** Label for the district drop-down. */
export function districtOptionLabel(district: string): string {
  if (district === DISTRICT_UNVERIFIED) return "জেলা যাচাই প্রয়োজন";
  if (district === DISTRICT_ABROAD) return "বিদেশে (বাংলাদেশের জেলা নয়)";
  return district;
}

/** True when the chosen filter is a real district name (so results may include guessed ones). */
export function isRealDistrict(district: string): boolean {
  return district !== "" && district !== DISTRICT_UNVERIFIED && district !== DISTRICT_ABROAD;
}
