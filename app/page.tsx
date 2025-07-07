import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Stats from "@/components/home/stats";
import Pricing from "@/components/home/pricing";
import FAQ from "@/components/home/faq";
import Contact from "@/components/home/contact";
import LogoCloud from "@/components/home/logocloud";
import AIStoryGenerator from "@/components/product/ai-story-generator";

export default async function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 lg:gap-24">
      <Hero /> 
      <LogoCloud />
      <AIStoryGenerator />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}
