"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ShieldCheck, ArrowUpRight, Lock } from "lucide-react";
import {
  Avatar,
  SectionHeading,
  staggerContainer,
  staggerItem,
  SecondaryButton,
  Reveal,
} from "../shared";
import { FEATURED_PROFILES } from "../content";

export default function FeaturedProfiles() {
  return (
    <section id="profiles" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Profiles"
          title={
            <>
              Real, verified people.{" "}
              <span className="text-gold-foil">Ready for forever.</span>
            </>
          }
          subtitle="Every profile is government-ID verified before it appears. Photos stay private until you choose to connect."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURED_PROFILES.map((p) => (
            <motion.article
              key={p.name}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl border border-royal-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
            >
              <div className="relative">
                <Avatar
                  name={p.name}
                  theme={p.theme}
                  rounded="rounded-2xl"
                  className="aspect-[5/4] w-full"
                />
                {/* privacy veil hint */}
                <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-royal-950/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                  <Lock className="h-3 w-3" /> Photo private
                </div>
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-royal-950 shadow-gold">
                  <ShieldCheck className="h-3 w-3" strokeWidth={3} /> Verified
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl font-bold text-royal-950">
                    {p.name}, {p.age}
                  </h3>
                  <span className="rounded-full bg-royal-50 px-2.5 py-0.5 text-[11px] font-semibold text-royal-700">
                    {p.community}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Briefcase className="h-4 w-4 text-royal-400" /> {p.profession}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <MapPin className="h-4 w-4 text-royal-400" /> {p.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-royal-100 bg-ivory-100 px-2.5 py-1 text-[11px] font-medium text-royal-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="/register"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-royal-200 bg-white py-2.5 text-sm font-semibold text-royal-800 transition-all group-hover:border-transparent group-hover:bg-royal-gradient group-hover:text-white"
                >
                  View profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <SecondaryButton href="/register">
            Browse all verified profiles
            <ArrowUpRight className="h-4 w-4" />
          </SecondaryButton>
        </Reveal>
      </div>
    </section>
  );
}
