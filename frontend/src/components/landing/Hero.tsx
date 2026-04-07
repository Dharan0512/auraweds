"use client";

import { motion } from "framer-motion";
import LoginCard from "./LoginCard";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { FormContainer } from "@/components/ui/FormContainer";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 pt-48 pb-24">
      {/* Background Animated Glows (Chat-style/Premium) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[120px] rounded-full animate-pulse-slow delay-1000 pointer-events-none" />
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/grain.png')] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center space-y-24 relative z-10">
        
        {/* Centered Headlines */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="text-center space-y-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-gold/80 shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            The Elite Matrimony Collective
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[1.05] tracking-tight">
            Find Your <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 drop-shadow-sm">
              Perfect Partner
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            An exclusive sanctuary for those who value <span className="text-white italic">depth over data</span> and <span className="text-white font-serif">character over profile</span>. The future of family-led matchmaking.
          </p>
        </motion.div>

        {/* Centered Authentication Form */}
        <div id="start-journey" className="w-full max-w-lg scroll-mt-32">
           <FormContainer>
              <LoginCard />
           </FormContainer>
        </div>
      </div>

      {/* Discovery Section Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">The Legacy Continues</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
           <motion.div 
             animate={{ y: [0, 16, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-1 h-3 bg-white/40 rounded-full" 
           />
        </div>
      </motion.div>
    </section>
  );
}
