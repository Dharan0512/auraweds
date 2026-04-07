"use client";

import { motion } from "framer-motion";
import { UserPlus, Sparkles, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Your Legacy",
      description: "Build a profound profile detailing your values, aspirations, and family background.",
      icon: <UserPlus className="w-8 h-8 text-gold" />,
    },
    {
      title: "Smart Matching",
      description: "Our AI-driven algorithms connect you with individuals who align with your lifestyle.",
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Connect Meaningfully",
      description: "Initiate conversations in a secure, curated environment built for serious intentions.",
      icon: <MessageCircle className="w-8 h-8 text-gold" />,
    },
  ];

  return (
    <section className="bg-slate-950 py-32 px-4 relative overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
            The Journey to <span className="text-gold italic">Everlasting</span>
          </h2>
          <p className="text-slate-400 font-medium">Simple, elegant, and profoundly effective.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 group-hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-500 relative">
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                   0{i + 1}
                 </div>
                 {step.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
