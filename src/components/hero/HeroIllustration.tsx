/**
 * An original, simple illustration made of basic shapes: a sun, hills and a vihara roofline.
 * It is a stand-in until you have a photo you own or have permission to use.
 * To use a photo later, put it in public/images/ and swap this component for an <img>.
 */
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="সূর্য, পাহাড় ও বিহারের একটি সরল চিত্র"
      className="h-auto w-full"
    >
      <rect width="480" height="360" fill="#5b1626" />
      <circle cx="340" cy="118" r="46" fill="#e2c27d" />
      <circle cx="340" cy="118" r="62" fill="none" stroke="#e2c27d" strokeOpacity="0.35" />

      <path d="M0 250 C70 190 130 200 200 238 C270 270 330 210 480 236 L480 360 L0 360Z" fill="#451120" />
      <path d="M0 290 C90 250 170 262 250 286 C330 306 400 270 480 284 L480 360 L0 360Z" fill="#370d19" />

      {/* vihara: base, middle tier, roof tiers and spire */}
      <rect x="150" y="238" width="180" height="62" fill="#2a0912" />
      <rect x="168" y="206" width="144" height="34" fill="#37101c" />
      <path d="M140 240 L240 196 L340 240Z" fill="#6b1d2a" stroke="#e2c27d" strokeWidth="2" />
      <path d="M176 208 L240 166 L304 208Z" fill="#7d2434" stroke="#e2c27d" strokeWidth="2" />
      <path d="M212 170 L240 130 L268 170Z" fill="#8f2c3e" stroke="#e2c27d" strokeWidth="2" />
      <line x1="240" y1="130" x2="240" y2="104" stroke="#e2c27d" strokeWidth="3" />
      <rect x="226" y="262" width="28" height="38" rx="14" fill="#e2c27d" fillOpacity="0.9" />
      <rect x="180" y="262" width="16" height="22" rx="8" fill="#e2c27d" fillOpacity="0.55" />
      <rect x="284" y="262" width="16" height="22" rx="8" fill="#e2c27d" fillOpacity="0.55" />
    </svg>
  );
}
