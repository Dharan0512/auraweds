"use client";

import React, { useState } from "react";
import { subscriptionService } from "@/services/subscriptionService";
import { Check, X, Shield, Star, Crown, Zap } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tier: string) => void;
}

type Duration = "3M" | "6M" | "12M";

export default function UpgradeModal({
  isOpen,
  onClose,
  onSuccess,
}: UpgradeModalProps) {
  const [duration, setDuration] = useState<Duration>("6M");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const PRICING = {
    Silver: { "3M": 3499, "6M": 5999, "12M": 9999 },
    Gold: { "3M": 8000, "6M": 14000, "12M": 24000 },
    EliteGold: { "3M": 50000, "6M": 90000, "12M": 150000 },
  };

  const FEATURES = {
    Silver: [
      "Unlimited interests",
      "View full profile details",
      "View contact details",
      "50 chat messages per day",
      "Advanced search filters",
      "View who viewed profile",
      "Horoscope details access",
      "Family photos access",
    ],
    Gold: [
      "Everything in Silver",
      "Profile highlighted in search",
      "Featured in similar matches",
      "1 profile boost per month",
      "Monthly email blast to prospects",
      "Hide last seen",
      "Priority customer support",
    ],
    EliteGold: [
      "Everything in Gold",
      "Dedicated relationship manager",
      "Curated handpicked matches",
      "Assisted outreach to matches",
      "WhatsApp coordination support",
      "Profile optimization support",
      "Priority verified badge",
      "3 homepage featured placements",
      "Unlimited boosts",
    ],
  };

  const handleUpgrade = async (tier: "Silver" | "Gold" | "EliteGold") => {
    try {
      setLoading(true);
      const planKey = `${tier}-${duration}`;
      const res = await subscriptionService.purchase(planKey);
      onSuccess(res.tier);
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-4 py-8 sm:p-12">
        <div
          className="relative w-full max-w-6xl bg-slate-900 border border-white/5 rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-12 text-center">
            <Badge
              icon={<Crown size={14} />}
              text="Premium Matrimony Experience"
            />
            <h2 className="mt-6 text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">
                Perfect Match
              </span>{" "}
              Faster
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
              Upgrade your membership to unlock exclusive features, direct
              contact access, and personalized relationship assistance.
            </p>

            {/* Duration Toggle */}
            <div className="flex justify-center mt-10">
              <div className="inline-flex items-center p-1 bg-slate-950 rounded-2xl border border-white/5">
                {(["3M", "6M", "12M"] as Duration[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                      duration === d
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {d.replace("M", " Months")}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 text-left">
              {/* Silver Plan */}
              <div className="relative p-8 rounded-3xl bg-slate-800/50 border border-white/10 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield size={24} className="text-slate-400" /> Silver
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm">
                    Essential tools to connect and converse.
                  </p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-black text-white">
                    ₹{PRICING.Silver[duration].toLocaleString()}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {" "}
                    / {duration}
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {FEATURES.Silver.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-sm"
                    >
                      <Check
                        size={18}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade("Silver")}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Select Silver"}
                </button>
              </div>

              {/* Gold Plan (Most Popular) */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#1a1c29] to-slate-900 border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col transform lg:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
                    <Star size={24} className="fill-[#D4AF37]" /> Gold
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm">
                    Maximum visibility and priority placement.
                  </p>
                </div>
                <div className="my-6">
                  <span className="text-5xl font-black text-white">
                    ₹{PRICING.Gold[duration].toLocaleString()}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {" "}
                    / {duration}
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {FEATURES.Gold.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white text-sm"
                    >
                      <Check
                        size={18}
                        className="text-[#D4AF37] shrink-0 mt-0.5"
                      />
                      <span
                        className={i === 0 ? "font-bold text-[#D4AF37]" : ""}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade("Gold")}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Select Gold"}
                </button>
              </div>

              {/* Elite Gold Plan */}
              <div className="relative p-8 rounded-3xl bg-slate-950 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full"></div>
                <div className="mb-4 relative z-10">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-2">
                    <Zap
                      size={24}
                      className="text-purple-400 fill-purple-400/20"
                    />{" "}
                    Elite Gold
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm">
                    VIP concierge and relationship management.
                  </p>
                </div>
                <div className="my-6 relative z-10">
                  <span className="text-4xl font-black text-white">
                    ₹{PRICING.EliteGold[duration].toLocaleString()}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {" "}
                    / {duration}
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-1 relative z-10">
                  {FEATURES.EliteGold.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-sm"
                    >
                      <Check
                        size={18}
                        className="text-purple-400 shrink-0 mt-0.5"
                      />
                      <span
                        className={i === 0 ? "font-bold text-purple-400" : ""}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade("EliteGold")}
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold relative group overflow-hidden bg-slate-800 text-white disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {loading ? "Processing..." : "Select Elite Gold"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mx-auto">
      {icon}
      <span>{text}</span>
    </div>
  );
}
