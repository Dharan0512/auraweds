"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Infinity as InfinityIcon,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Verified profiles", href: "#profiles" },
      { label: "Compatibility", href: "#compatibility" },
      { label: "Membership", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Success stories", href: "#stories" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#" },
      { label: "Safety tips", href: "#privacy" },
      { label: "Contact us", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Cookie policy", href: "#" },
      { label: "Trust & safety", href: "#privacy" },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Twitter, label: "Twitter" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-royal-950 px-5 pb-10 pt-20 text-white sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 10% 0%, rgba(124,58,237,0.25), transparent), radial-gradient(ellipse 40% 50% at 95% 10%, rgba(201,162,39,0.14), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        {/* top: brand + newsletter */}
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Aura Weds home">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal-gradient text-white shadow-royal ring-1 ring-white/10">
                <InfinityIcon className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl font-bold tracking-tight">
                Aura<span className="text-gold-400"> Weds</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              A premium Indian matrimonial platform built on verified profiles, family-assisted
              matchmaking, and privacy-first connections — for relationships that last a lifetime.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/70">
              <ShieldCheck className="h-4 w-4 text-gold-400" />
              100% verified · Privacy-first · 256-bit encrypted
            </div>
          </div>

          <div className="lg:pl-8">
            <h3 className="font-serif text-lg font-bold">Stay in the loop</h3>
            <p className="mt-2 text-sm text-white/60">
              Thoughtful advice on finding the right partner — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-royal-950 shadow-gold transition-transform hover:-translate-y-0.5"
              >
                {sent ? "Subscribed ✓" : "Subscribe"}
                {!sent && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40" aria-live="polite">
              {sent ? "Thanks! Please check your inbox to confirm." : "We respect your privacy. Unsubscribe anytime."}
            </p>
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Aura Weds. Made with love in India.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-gold-400/40 hover:text-gold-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
