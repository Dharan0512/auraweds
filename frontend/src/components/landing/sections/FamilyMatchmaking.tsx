"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, MessageCircleHeart, ShieldCheck, ThumbsUp, UserCog } from "lucide-react";
import { Avatar, Eyebrow, Reveal } from "../shared";

const BENEFITS = [
  {
    icon: UserCog,
    title: "Invite trusted collaborators",
    desc: "Add parents or a sibling with permission levels you set — they help, you stay in control.",
  },
  {
    icon: ThumbsUp,
    title: "Shortlist together",
    desc: "Family can favourite profiles and leave private notes, so everyone’s on the same page.",
  },
  {
    icon: MessageCircleHeart,
    title: "Blessings, not pressure",
    desc: "Share the conversations you choose. Move forward only when it feels right for you.",
  },
];

export default function FamilyMatchmaking() {
  return (
    <section id="family" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>Family-assisted matchmaking</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-royal-950 text-balance sm:text-4xl md:text-5xl">
              The whole family, on the journey{" "}
              <span className="text-royal-foil">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
              In India, marriage is a family decision made with love. Aura Weds blends
              modern independence with the wisdom of family — beautifully, and privately.
            </p>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.12 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-600">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-royal-950">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* visual: collaboration card */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[40px] bg-royal-gradient opacity-10 blur-2xl"
            />
            <div className="relative rounded-[32px] border border-royal-100 bg-white p-6 shadow-soft-lg">
              {/* candidate */}
              <div className="flex items-center gap-4 rounded-2xl border border-royal-100 bg-ivory-100 p-4">
                <Avatar name="Aanya Sharma" theme="rose" rounded="rounded-2xl" className="h-16 w-16" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-serif text-lg font-bold text-royal-950">
                      Aanya Sharma, 27
                    </p>
                    <ShieldCheck className="h-4 w-4 shrink-0 text-gold-500" />
                  </div>
                  <p className="text-sm text-[var(--muted)]">Pediatric Surgeon · Bengaluru</p>
                </div>
              </div>

              {/* family notes thread */}
              <div className="mt-5 space-y-3">
                {[
                  { who: "Mom", theme: "rose", note: "Lovely family values 💜", approved: true },
                  { who: "Dad", theme: "sky", note: "Verified & well-settled. I approve.", approved: true },
                  { who: "Brother", theme: "gold", note: "Same wavelength — go for it!", approved: true },
                ].map((m, i) => (
                  <motion.div
                    key={m.who}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <Avatar
                      name={m.who}
                      theme={m.theme as "rose"}
                      rounded="rounded-full"
                      className="h-9 w-9 shrink-0"
                    />
                    <div className="flex flex-1 items-center justify-between rounded-2xl rounded-tl-sm bg-royal-50 px-4 py-2.5">
                      <span className="text-sm text-royal-900">
                        <span className="font-semibold">{m.who}:</span> {m.note}
                      </span>
                      {m.approved && (
                        <span className="ml-2 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="mt-5 flex items-center justify-between rounded-2xl bg-royal-gradient px-5 py-3.5 text-white shadow-royal"
              >
                <span className="text-sm font-semibold">Family blessing received</span>
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  <Check className="h-4 w-4" strokeWidth={3} /> 3 / 3
                </span>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
