"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle } from "lucide-react";

export default function TrustSection() {
  const stories = [
    {
      name: "Siddharth & Ananya",
      text: "AuraWeds provided the privacy and depth we were looking for. It wasn't about swiping, but about shared values.",
      image: "https://images.unsplash.com/photo-1621112904887-419379ce6824?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Vikram & Meera",
      text: "The verification process gave our families peace of mind. We found a connection that felt destined.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Built on <span className="text-gold italic">Trust</span> & <span className="text-purple-400">Authenticity</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Over 10,000 elite members have chosen AuraWeds for its uncompromising 
            standards and privacy-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center relative group overflow-hidden"
            >
              {/* Image with Glow */}
              <div className="relative shrink-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 to-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-900 group-hover:scale-105 transition-transform duration-700 h-full relative z-10"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 relative z-10">
                <Quote className="w-8 h-8 text-gold/40" />
                <p className="text-lg text-slate-300 italic font-medium leading-relaxed">
                  "{story.text}"
                </p>
                <div className="flex items-center gap-3">
                   <span className="text-white font-serif font-bold text-xl">{story.name}</span>
                   <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-widest">
                     <CheckCircle className="w-3 h-3" />
                     Verified Success
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
           {[
             { label: "Elite Members", val: "10,000+" },
             { label: "Matches Made", val: "2,500+" },
             { label: "Verification Rate", val: "100%" },
             { label: "Satisfied Families", val: "5,000+" }
           ].map((stat, i) => (
             <div key={i} className="text-center space-y-1">
                <div className="text-2xl md:text-3xl font-serif font-bold text-white tracking-widest">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
