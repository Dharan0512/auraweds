"use client";

import { MessageSquare, Sparkles } from "lucide-react";

export default function ChatComingSoon() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
      <div className="relative w-full max-w-2xl">
        {/* Animated Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[80px] animate-pulse delay-700" />

        <div
          className="relative backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-16 text-center overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Subtle Inner Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

          <div className="relative z-10">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/10 to-[#D4AF37]/10 mb-8 animate-bounce-subtle"
              style={{ border: "1px solid var(--border)" }}
            >
              <MessageSquare
                className="w-10 h-10"
                style={{ color: "var(--accent-2)" }}
              />
            </div>

            <h1
              className="text-4xl sm:text-5xl font-serif font-bold mb-6 tracking-tight"
              style={{ color: "var(--text)" }}
            >
              The Future of{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--accent), var(--accent-2))",
                }}
              >
                Connection
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl max-w-md mx-auto mb-10 leading-relaxed font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              We are crafting an emotionally intelligent messaging experience
              that transcends words.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div
                className="px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--accent-2)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text-subtle)" }}
              >
                Phase 2 Integration
              </div>
            </div>

            {/* Premium Infinity Symbol Decoration */}
            <div className="mt-16 opacity-30">
              <svg
                width="80"
                height="40"
                viewBox="0 0 80 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto animate-pulse"
              >
                <path
                  d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 31.3333 26.6667 36 22.6667C40.6667 18.6667 46.4772 10 52 10C57.5228 10 62 14.4772 62 20C62 25.5228 57.5228 30 52 30C46.4772 30 40.6667 21.3333 36 17.3333C31.3333 13.3333 25.5228 10 20 10Z"
                  stroke="url(#paint0_linear)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="10"
                    y1="20"
                    x2="62"
                    y2="20"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
