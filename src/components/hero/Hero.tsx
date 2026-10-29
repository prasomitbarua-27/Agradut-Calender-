import Image from "next/image";
import { buttonClasses } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { IconArrowRight, IconSearch } from "@/components/ui/icons";
import { DATA_NOTICE } from "@/lib/config";

/**
 * The picture lives in public/images/hero-bg.webp. It is a decoration, so it has empty alt text.
 * The dark layer on top keeps the white text easy to read on small screens, where the text
 * and the Buddha figure share the same space.
 */
export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-night text-ivory print:hidden">
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[88%_35%] lg:object-[right_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-night/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-night/90 lg:via-night/55 lg:to-transparent"
      />

      <Container className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-lg font-semibold text-gold-light">বাংলাদেশের বৌদ্ধ বিহার</p>
          <h1 id="hero-heading" className="mt-2 text-4xl font-bold leading-[1.3] sm:text-5xl lg:text-6xl lg:leading-[1.25]">
            কঠিন চীবরদান ২০২৬
          </h1>
          <div className="mt-5 h-1 w-16 bg-gold" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/90 sm:text-xl">
            বাংলাদেশের বিভিন্ন বিহারের কঠিন চীবরদান অনুষ্ঠানের তারিখ, স্থান ও প্রয়োজনীয় তথ্য খুঁজে নিন একটি প্ল্যাটফর্মে।
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#calendar" className={buttonClasses("onDark", "lg")}>
              ক্যালেন্ডার দেখুন
              <IconArrowRight />
            </a>
            <a href="#search" className={buttonClasses("outlineOnDark", "lg")}>
              <IconSearch />
              বিহার খুঁজুন
            </a>
          </div>

          <p className="mt-6 max-w-xl border-l-2 border-gold pl-3 text-base text-ivory/90">{DATA_NOTICE}</p>
        </div>
      </Container>
    </section>
  );
}
