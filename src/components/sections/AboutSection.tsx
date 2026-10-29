import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-sand py-14 print:hidden">
      <Container className="grid gap-8 lg:grid-cols-2">
        <SectionHeading id="about-heading" eyebrow="আমাদের সম্পর্কে" title="কেন এই ক্যালেন্ডার?" />
        <div className="space-y-4 text-lg text-ink">
          <p>
            কঠিন চীবরদান বাংলাদেশের বৌদ্ধ সমাজের একটি গুরুত্বপূর্ণ ধর্মীয় অনুষ্ঠান। কোন বিহারে কবে অনুষ্ঠান হবে, তা এক জায়গায়
            খুঁজে পাওয়া সহজ করাই এই ওয়েবসাইটের উদ্দেশ্য।
          </p>
          <p className="text-muted">
            এটি একটি নতুন প্রকল্প। এখানকার অনুষ্ঠানের তারিখ ও বিহারের নাম ২০২৬ সালের একটি প্রকাশিত তালিকা (tathagata.online) থেকে নেওয়া। জেলার তথ্য
            প্রাথমিকভাবে নাম দেখে অনুমান করা হয়েছে এবং এখনও যাচাই হয়নি। ঠিকানা, যোগাযোগ ও মানচিত্রের তথ্য যাচাইয়ের পর যুক্ত করা হবে।
          </p>
          <p className="text-muted">
            এই ওয়েবসাইট কোনো সংগঠনের অফিসিয়াল সাইট হিসেবে দাবি করে না। ক্যালেন্ডারে এখন ইংরেজি (গ্রেগরিয়ান) তারিখ ব্যবহার করা
            হচ্ছে; বাংলা ও বৌদ্ধ পঞ্জিকার তারিখ পরে যুক্ত করার সুযোগ রাখা হয়েছে।
          </p>
        </div>
      </Container>
    </section>
  );
}
