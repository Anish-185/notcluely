import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Reveal from "@/components/sections/Reveal";
import HowItWorks from "@/components/sections/HowItWorks";
import Exhibits from "@/components/sections/Exhibits";
import UseCases from "@/components/sections/UseCases";
import Showcase from "@/components/sections/Showcase";
import Proof from "@/components/sections/Proof";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Epilogue from "@/components/sections/Epilogue";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Reveal />
        <HowItWorks />
        <Exhibits />
        <UseCases />
        <Showcase />
        <Proof />
        <Pricing />
        <FAQ />
        <Epilogue />
      </main>
      <Footer />
    </>
  );
}
