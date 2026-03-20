"use client";
import GridBackground    from "@/components/GridBackground";
import Navbar            from "@/components/Navbar";
import HeroSection       from "@/components/HeroSection";
import AboutSection      from "@/components/AboutSection";
import SkillsSection     from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection    from "@/components/ContactSection";
import Footer            from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      <GridBackground />
      <Navbar visible={true} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
