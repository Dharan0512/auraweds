"use client";

import React, { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading, Reveal } from "../shared";
import { FAQS } from "../content";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div className="overflow-hidden rounded-2xl border border-royal-100 bg-white shadow-soft">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-serif text-lg font-semibold text-royal-950">{q}</span>
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-royal-200 text-royal-600 transition-all duration-300 ${
              open ? "rotate-45 bg-royal-gradient text-white" : "bg-white"
            }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--muted)] text-pretty">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Questions, answered"
          title="Everything you want to know"
          subtitle="Can’t find what you’re looking for? Our support team is a message away."
        />
        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
