/**
 * Temporary text-based logo: the Bengali letter "ক" on a maroon square with a gold underline.
 * It is not an official logo of any organisation. Replace it when you have a real one.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-sm border-b-4 border-gold bg-brand text-xl font-bold text-ivory ${className}`}
    >
      ক
    </span>
  );
}
