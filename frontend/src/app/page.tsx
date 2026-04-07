"use client";

import Hero from "@/components/landing/Hero";
import TrustSection from "@/components/landing/TrustSection";
import HowItWorks from "@/components/landing/HowItWorks";
import PremiumFeatures from "@/components/landing/PremiumFeatures";
import SampleProfiles from "@/components/landing/SampleProfiles";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.8)"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-gold/30 selection:text-white">
      {/* Premium Navbar */}
      <motion.nav
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
          borderColor: navBorder,
        }}
        className="fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-300 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="sm" />

          <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="#" className="hover:text-gold transition-colors">How It Works</Link>
            <Link href="#" className="hover:text-gold transition-colors">Profiles</Link>
            <Link href="#" className="hover:text-gold transition-colors">Exclusivity</Link>
            <Link href="#" className="hover:text-gold transition-colors text-white font-serif italic text-xs tracking-normal">The Elite Circle</Link>
          </div>

          <div className="flex items-center gap-6">
             <Link href="#start-journey" className="text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-gold transition-colors px-4 py-2">
               Access Key
             </Link>
             <Link href="#start-journey" className="px-6 py-2.5 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all active:scale-95">
               Start Journey
             </Link>
          </div>
        </div>
      </motion.nav>

      {/* Landing Sections */}
      <Hero />
      <TrustSection />
      <HowItWorks />
      <PremiumFeatures />
      <SampleProfiles />
      <CTASection />
      <LandingFooter />
    </main>
  );
}
