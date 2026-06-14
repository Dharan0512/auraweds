"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Infinity as InfinityIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Profiles", href: "#profiles" },
  { label: "Family", href: "#family" },
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#stories" },
];

function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Aura Weds home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-royal-gradient text-white shadow-royal">
        <InfinityIcon className="h-5 w-5" />
      </span>
      <span
        className={`font-serif text-lg font-bold tracking-tight ${
          onDark ? "text-white" : "text-royal-950"
        }`}
      >
        Aura<span className="text-gold-500"> Weds</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(251,247,240,0.85)" : "rgba(251,247,240,0)",
          boxShadow: scrolled
            ? "0 8px 30px -12px rgba(76,29,149,0.18)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className="border-b backdrop-blur-md"
        style={{ borderColor: scrolled ? "rgba(76,29,149,0.08)" : "transparent" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Brand />

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-royal-900/80 transition-colors hover:text-royal-700"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-royal-800 transition-colors hover:text-royal-950"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-royal-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-royal transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(76,29,149,0.6)]"
            >
              Create Your Profile
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-royal-200 bg-white/70 text-royal-800 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-royal-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-ivory-100 p-6 shadow-2xl"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="mb-4 flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-royal-200 bg-white text-royal-800"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-royal-900 transition-colors hover:bg-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-royal-200 bg-white px-5 py-3 text-center text-sm font-semibold text-royal-800"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-royal-gradient px-5 py-3 text-center text-sm font-semibold text-white shadow-royal"
                >
                  Create Your Profile
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
