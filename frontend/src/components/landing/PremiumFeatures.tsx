"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Lock, Star } from "lucide-react";

export default function PremiumFeatures() {
  const features = [
    {
      title: "AI-Driven Matching",
      description: "Our proprietary AI analyzes 100+ compatibility points including values, lifestyle, and temperament.",
      icon: <Brain className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Verified Excellence",
      description: "Every member undergoes a multi-step verification process to ensure authenticity and serious intent.",
      icon: <Shield className="w-6 h-6 text-gold" />,
    },
    {
      title: "Privacy First",
      description: "Complete control over your visibility. Choose who can see your photos and contact information.",
      icon: <Lock className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Priority Placement",
      description: "Premium members receive 3x more visibility and exclusive access to the 'Elite 50' daily curated list.",
      icon: <Star className="w-6 h-6 text-gold" />,
    },
  ];

  return (
    <section className="bg-slate-900 py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2]">
             An Exclusive <br />
             <span className="text-gold italic">Sanctuary</span> for the <br />
             Discerning Few
           </h2>
           <p className="text-slate-400 font-medium max-w-md leading-relaxed">
             AuraWeds isn't just an app; it's a curated experience for high-achieving 
             individuals and families who prioritize quality and privacy above all.
           </p>
           <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <h4 className="text-white font-serif font-bold text-lg">{feat.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Feature Visual */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-gold/10 blur-3xl opacity-50 transition-opacity" />
           <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="relative bg-white/5 border border-white/10 p-8 rounded-[40px] shadow-2xl backdrop-blur-xl"
           >
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden relative">
                 <img 
                   src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                   alt="Elegant Connection"
                   className="w-full h-full object-cover grayscale-[0.2] opacity-80 group-hover:scale-110 transition-transform duration-1000"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
                    <div className="text-white font-serif font-bold text-2xl mb-2">Refined Encounters</div>
                    <p className="text-slate-300 text-sm">Where sophistication meets compatibility.</p>
                 </div>
              </div>
           </motion.div>

           {/* Floating Elements */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl animate-pulse" />
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
