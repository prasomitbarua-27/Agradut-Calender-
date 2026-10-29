# কঠিন চীবরদান ক্যালেন্ডার (Kathin Chibar Dan Calendar)

A website to find Kathin Chibar Dan ceremony dates and Viharas in Bangladesh.

**About the data:** the 2026 schedule (737 entries, 713 different Viharas) was imported from
`kathin_chibar_dan_2026_districts_draft.xlsx`. Dates and Vihara names are copied from that file.
The **districts are a draft**: only some are written clearly in the Vihara name. The rest were guessed
from place names or are unknown. The site marks them (see "District certainty" below).
Verify the districts before treating them as final.

## How to run it

You need [Node.js](https://nodejs.org) version 18.18 or newer.

```bash
npm install        # downloads the tools (only needed once)
npm run dev        # starts the site
```

Open http://localhost:3000 in your browser.

Other useful commands:

```bash
npm run typecheck  # checks the TypeScript code for mistakes
npm run build      # builds the production version (also catches errors)
```

## Put it online (GitHub + Vercel)

1. Create a new empty repository on github.com (no README, no .gitignore).
2. In this folder run:

   ```bash
   git remote add origin https://github.com/YOUR-NAME/kathin-calendar.git
   git push -u origin main
   ```
3. Go to vercel.com, sign in with GitHub, click **Add New → Project**, choose the repository and press **Deploy**.
   Vercel detects Next.js by itself. No settings or database are needed.
4. After about a minute you get a link like `https://kathin-calendar.vercel.app` to show as a demo.
5. To update later: change the data or code, then `git add . && git commit -m "Update" && git push`. Vercel redeploys by itself.

The original Excel file is kept in `data-source/` as a backup. Use a **private** repository if you do not want others to download it.

## What is inside

| Folder | What it does |
| --- | --- |
| `src/data/` | **Imported data.** `viharas.ts` and `events.ts` are generated from the workbook. Do not edit them by hand; re-run the import script instead. |
| `src/types/` | The shapes of the data (`Vihara`, `KathinEvent`). |
| `src/lib/` | Plain logic with no screen code: `calendar.ts` (month grid, dates), `filters.ts` (search), `format.ts` (Bengali text and numbers), `config.ts` (site settings). |
| `src/components/` | The screen parts, grouped by area: `layout`, `hero`, `calendar`, `filters`, `events`, `viharas`, `ui`, `sections`. |
| `src/components/sections/KathinExplorer.tsx` | Holds the page state (filters, selected month and date) and passes data to the other components. |
| `src/app/globals.css` | Colours and base styles ("design tokens"). |

## How to update the data (re-import the workbook)

1. Put the updated workbook somewhere (for example in the project folder).
2. Run (needs Python 3 and `pip install openpyxl`):

   ```bash
   python3 scripts/import_schedule.py data-source/kathin_chibar_dan_2026_districts_draft.xlsx
   ```
3. The script rewrites `src/data/viharas.ts` and `src/data/events.ts` and prints how many events and
   Viharas it wrote. Compare those numbers with the workbook. It stops with an error if a date's weekday
   does not match the workbook's "বার" column.

## District certainty

Each Vihara has a `districtStatus`:

| Status | Meaning | How the site shows it |
| --- | --- | --- |
| `explicit` | District is written in the Vihara name | plain district name |
| `inferred` | Guessed from a place name (not verified) | "চট্টগ্রাম (সম্ভাব্য)" plus a note |
| `unverified` | Could not be worked out | "জেলা যাচাই প্রয়োজন" |
| `abroad` | Outside Bangladesh | "বিদেশে (বাংলাদেশের জেলা নয়)" |

Optional fields (`address`, `contact`, `latitude`, `longitude`) are hidden when missing. If you add
`latitude` and `longitude` to a Vihara, a map link appears automatically.

## Good to know

- Dates are stored as plain text like `"2026-11-14"` (not Date objects). This avoids "one day off" time-zone bugs.
- The calendar uses Gregorian dates. Bengali or Buddhist-calendar labels can be added later without rewriting the grid.
- The week starts on Sunday. Change `WEEK_STARTS_ON` in `src/lib/config.ts` (6 = Saturday).
- The first month shown is November 2026 (`DEFAULT_VIEW` in `src/lib/config.ts`).
- The hero picture is `public/images/hero-bg.webp`, used in `src/components/hero/Hero.tsx`. To change it, replace that file (keep it under about 200 KB). `HeroIllustration.tsx` is the old drawing and is no longer used.
- Colours: change them in `src/app/globals.css` (the `@theme` block).
