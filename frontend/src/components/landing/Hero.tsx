"use client";

import { motion } from "framer-motion";
import LoginCard from "./LoginCard";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4 pt-24 pb-12">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[130px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[130px] rounded-full animate-pulse-slow delay-1000" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grain.png')] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gold-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Elite Matrimony Collective
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] tracking-tight">
            Find Your <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
              Perfect Partner
            </span>
            , <br />
            Not Just a Match
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            AuraWeds is an exclusive sanctuary for those who value depth over 
            data and character over profile. Experience the future of meaningful 
            family-led matchmaking.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 font-bold uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3">
              Explore Matches
            </button>
          </div>

          <div className="flex items-center gap-4 pt-8 text-slate-500">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Member" className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
             </div>
             <p className="text-xs font-bold uppercase tracking-widest">
               Trusted by <span className="text-white">10,000+</span> Elite Members
             </p>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <div className="flex justify-center lg:justify-end">
           <LoginCard />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Discover More</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>
    </section>
  );
}
