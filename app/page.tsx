import { Navbar } from "@/components/Navbar";
import { SectionIndicator } from "@/components/SectionIndicator";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyParticipate } from "@/components/WhyParticipate";
import { Tracks } from "@/components/Tracks";
import { Investors } from "@/components/Investors";
import { Timeline } from "@/components/Timeline";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionIndicator />
      <main>
        <Hero />
        <About />
        <WhyParticipate />
        <Tracks />
        <Investors />
        <Timeline />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
