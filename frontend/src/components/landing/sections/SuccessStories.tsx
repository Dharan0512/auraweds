"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";
import {
  Avatar,
  SectionHeading,
  staggerContainer,
  staggerItem,
} from "../shared";
import { SUCCESS_STORIES } from "../content";

export default function SuccessStories() {
  return (
    <section id="stories" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Success stories"
          title={
            <>
              50,000+ beginnings.{" "}
              <span className="text-gold-foil">Countless forevers.</span>
            </>
          }
          subtitle="Real couples who found each other on Aura Weds — and the families who celebrated with them."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {SUCCESS_STORIES.map((s) => (
            <motion.figure
              key={s.couple}
              variants={staggerItem}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-royal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
            >
              <div className="relative mb-6 flex items-center">
                <Avatar
                  name={s.couple.split(" & ")[0]}
                  theme={s.theme}
                  rounded="rounded-full"
                  className="h-16 w-16 ring-4 ring-white"
                />
                <Avatar
                  name={s.couple.split(" & ")[1] ?? s.couple}
                  theme={s.theme2}
                  rounded="rounded-full"
                  className="-ml-5 h-16 w-16 ring-4 ring-white"
                />
                <span className="ml-3 grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-royal-950 shadow-gold">
                  <Heart className="h-4 w-4 fill-royal-950" />
                </span>
              </div>
              <Quote className="h-7 w-7 text-royal-200" />
              <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-royal-900 text-pretty">
                “{s.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-royal-100 pt-4">
                <p className="font-serif text-lg font-bold text-royal-950">{s.couple}</p>
                <p className="text-sm text-[var(--muted)]">{s.location}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
