/** Site-wide settings. Change values here, not inside components. */

export const SITE_NAME = "কঠিন চীবরদান ক্যালেন্ডার";

export const SITE_DESCRIPTION =
  "বাংলাদেশের বিভিন্ন বিহারের কঠিন চীবরদান অনুষ্ঠানের তারিখ, স্থান ও প্রয়োজনীয় তথ্য খুঁজে নেওয়ার একটি সহজ প্ল্যাটফর্ম।";

/** Shown in the hero. The schedule comes from the 2026 workbook; its districts are a draft. */
export const DATA_NOTICE =
  "২০২৬ সালের তালিকা অনুযায়ী তারিখ ও বিহারের নাম দেখানো হচ্ছে। জেলার তথ্য প্রাথমিক অনুমান, এখনও যাচাই করা হয়নি। যাওয়ার আগে বিহার কর্তৃপক্ষের কাছ থেকে নিশ্চিত হয়ে নিন।";

/** Years offered in the year selectors. */
export const YEARS: readonly number[] = [2026, 2027, 2028, 2029, 2030];

/** Month shown when the page first opens. `month` is 0-based (10 = November). */
export const DEFAULT_VIEW: { year: number; month: number } = { year: 2026, month: 10 };

/** First day of the week in the grid: 0 = Sunday, 1 = Monday, 6 = Saturday. */
export const WEEK_STARTS_ON: 0 | 1 | 6 = 0;

export const NAV_LINKS = [
  { label: "হোম", href: "#home" },
  { label: "ক্যালেন্ডার", href: "#calendar" },
  { label: "বিহারের তালিকা", href: "#viharas" },
  { label: "আমাদের সম্পর্কে", href: "#about" },
  { label: "যোগাযোগ", href: "#contact" },
] as const;
