"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Avatar,
  SectionHeading,
  staggerContainer,
  staggerItem,
} from "../shared";
import { TESTIMONIALS } from "../content";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ivory-300/50 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Loved by members & families"
          title={
            <>
              Trusted at every step of the{" "}
              <span className="text-royal-foil">journey.</span>
            </>
          }
          subtitle="From the first conversation to the wedding mandap — members and their families tell it best."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={staggerItem}
              className="flex flex-col rounded-3xl border border-royal-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-royal-900 text-pretty">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-royal-100 pt-4">
                <Avatar name={t.name} theme={t.theme} rounded="rounded-full" className="h-11 w-11" />
                <div>
                  <p className="text-sm font-bold text-royal-950">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
