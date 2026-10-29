import { IconMapPin } from "@/components/ui/icons";

/**
 * Shown instead of a map because there is no verified location data yet.
 * Later: put a real map here (for example Leaflet or Google Maps) using each Vihara's
 * latitude and longitude. No fake pins are shown on purpose.
 */
export default function MapPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-gold bg-white px-5 py-8 text-center sm:flex-row sm:text-left">
      <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-tint text-gold-deep">
        <IconMapPin size={24} />
      </span>
      <div>
        <p className="text-lg font-semibold text-ink">মানচিত্র শীঘ্রই আসছে</p>
        <p className="text-muted">
          বিহারগুলোর যাচাইকৃত অবস্থানের তথ্য পাওয়া গেলে এখানে মানচিত্র যুক্ত করা হবে। ভুল স্থান দেখানো এড়াতে এখন কোনো অবস্থান দেখানো হচ্ছে না।
        </p>
      </div>
    </div>
  );
}
