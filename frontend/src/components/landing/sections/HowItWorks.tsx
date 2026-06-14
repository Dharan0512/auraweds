"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Users, Sparkles, Heart } from "lucide-react";
import {
  SectionHeading,
  staggerContainer,
  staggerItem,
} from "../shared";
import { HOW_IT_WORKS } from "../content";

const ICONS: Record<string, React.ElementType> = {
  UserPlus,
  Users,
  Sparkles,
  Heart,
};

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      {/* soft band background */}
      <div aria-hidden className="absolute inset-0 bg-ivory-radial" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How Aura Weds works"
          title={
            <>
              A calmer, more trusted path to{" "}
              <span className="text-royal-foil">“I do.”</span>
            </>
          }
          subtitle="Four thoughtful steps that bring you and your family together around the right match."
        />

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* connecting line on desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-royal-200 to-transparent lg:block"
          />
          {HOW_IT_WORKS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.li
                key={s.step}
                variants={staggerItem}
                className="group relative rounded-3xl border border-royal-100 bg-white/80 p-7 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal-gradient text-white shadow-royal transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-serif text-4xl font-bold text-royal-100 transition-colors group-hover:text-gold-200">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-royal-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
