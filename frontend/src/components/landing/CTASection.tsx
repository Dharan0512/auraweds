"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-32 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-gold/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-gradient-to-b from-white/5 to-transparent blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.3em] text-gold shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          The Legacy Awaits
        </motion.div>

        <h2 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
          Your journey to a <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">meaningful relationship</span> <br />
          starts here.
        </h2>

        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Beyond the superficial, where compatibility meets character. 
          Become part of the most exclusive matchmaking legacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
           <Link
             href="#start-journey"
             className="w-full sm:w-auto px-12 py-5 rounded-[24px] bg-white text-slate-950 font-bold uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:bg-gold-50 transition-all flex items-center justify-center gap-3 active:scale-95 group"
           >
             Start Your Journey
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
           <Link
             href="#start-journey"
             className="w-full sm:w-auto px-12 py-5 rounded-[24px] bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all active:scale-95"
           >
             Explore Matches
           </Link>
        </div>

        <div className="pt-12 flex flex-col items-center gap-4">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
             Trusted by 10,000+ elite members worldwide
           </p>
           <div className="flex gap-8 opacity-20 filter grayscale hover:grayscale-0 transition-all">
              {/* Simple logo placeholders */}
              <div className="text-white font-serif font-bold tracking-tighter text-2xl">VOGUE</div>
              <div className="text-white font-serif font-bold tracking-tighter text-2xl">FORBES</div>
              <div className="text-white font-serif font-bold tracking-tighter text-2xl">TATLER</div>
           </div>
        </div>
      </div>
    </section>
  );
}
