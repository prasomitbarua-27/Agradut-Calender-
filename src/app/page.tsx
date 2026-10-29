import Hero from "@/components/hero/Hero";
import KathinExplorer from "@/components/sections/KathinExplorer";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        মূল বিষয়বস্তুতে যান
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <KathinExplorer />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
