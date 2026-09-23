import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HorizontalShowcase } from "@/components/home/HorizontalShowcase";
import { CraftProcess } from "@/components/home/CraftProcess";
import { ParallaxStory } from "@/components/home/ParallaxStory";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { TextureSelector } from "@/components/home/TextureSelector";
import { BrandStatement } from "@/components/home/BrandStatement";
import { Stats } from "@/components/home/Stats";
import { Sustainability } from "@/components/home/Sustainability";
import { Testimonial } from "@/components/home/Testimonial";
import { JournalPreview } from "@/components/home/JournalPreview";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedCollections />
      <HorizontalShowcase />
      <CraftProcess />
      <ParallaxStory />
      <ProductShowcase />
      <TextureSelector />
      <BrandStatement />
      <Stats />
      <Sustainability />
      <Testimonial />
      <JournalPreview />
      <CallToAction />
    </>
  );
}
