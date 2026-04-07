"use client";

import { motion } from "framer-motion";
import { Lock, Eye } from "lucide-react";
import Link from "next/link";

export default function SampleProfiles() {
  const profiles = [
    {
      name: "Aditya S.",
      age: 29,
      location: "London / Mumbai",
      bio: "An architect by profession, looking for a meaningful life partner who values heritage and modern outlook.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Priyanka K.",
      age: 27,
      location: "New York / Delhi",
      bio: "A data scientist with a passion for classical music and travel. Seeking someone deeply connected to their roots.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sameer V.",
      age: 32,
      location: "Singapore / Bangalore",
      bio: "An entrepreneur focused on sustainable tech. I value emotional intelligence and shared family goals.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="bg-slate-950 py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Our <span className="text-gold italic">Distinguished</span> Members
          </h2>
          <p className="text-slate-400 font-medium">Curious? Start your journey to see more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[40px] p-6 relative group overflow-hidden"
            >
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden relative mb-6">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0 h-full relative"
                />
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-3">
                     <Lock className="w-8 h-8 text-gold" />
                     <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Profile Protected</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 relative z-10 px-2">
                 <div className="flex justify-between items-center">
                    <h3 className="text-white font-serif font-bold text-2xl">{profile.name}</h3>
                    <span className="text-gold font-bold text-sm">{profile.age}</span>
                 </div>
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{profile.location}</div>
                 <p className="text-slate-500 text-sm leading-relaxed blur-[3px] select-none text-limit-3">
                   {profile.bio}
                 </p>
                 <div className="pt-4 flex justify-between items-center">
                    <div className="h-px shrink-1 flex-1 bg-white/10 mr-4" />
                    <Link 
                      href="#start-journey"
                      className="text-gold hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      View Profile
                    </Link>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
