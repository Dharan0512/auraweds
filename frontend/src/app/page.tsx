import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/sections/Hero";
import TrustBar from "@/components/landing/sections/TrustBar";
import FeaturedProfiles from "@/components/landing/sections/FeaturedProfiles";
import HowItWorks from "@/components/landing/sections/HowItWorks";
import FamilyMatchmaking from "@/components/landing/sections/FamilyMatchmaking";
import Compatibility from "@/components/landing/sections/Compatibility";
import SuccessStories from "@/components/landing/sections/SuccessStories";
import Privacy from "@/components/landing/sections/Privacy";
import Pricing from "@/components/landing/sections/Pricing";
import Testimonials from "@/components/landing/sections/Testimonials";
import FAQ from "@/components/landing/sections/FAQ";
import CTABand from "@/components/landing/sections/CTABand";
import Footer from "@/components/landing/sections/Footer";
import { FAQS } from "@/components/landing/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Aura Weds",
      url: "https://auraweds.com",
      description:
        "Premium Indian matrimonial platform with verified profiles, family-assisted matchmaking, and privacy-first connections.",
      areaServed: "IN",
    },
    {
      "@type": "WebSite",
      name: "Aura Weds",
      url: "https://auraweds.com",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="landing-root min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-royal-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <FeaturedProfiles />
        <HowItWorks />
        <FamilyMatchmaking />
        <Compatibility />
        <SuccessStories />
        <Privacy />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABand />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
