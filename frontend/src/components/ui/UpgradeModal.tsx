"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import { Check, X, Shield, Star, Crown, Zap, Clock, Info } from "lucide-react";

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
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [status, setStatus] = useState<SubscriptionStatusResponse | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSent, setWaitlistSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  const fetchStatus = async () => {
    try {
      const data = await subscriptionService.getStatus();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status", error);
    }
  };

  if (!isOpen || !mounted) return null;

  const PRICING = {
    "Basic Member": { "3M": 0, "6M": 0, "12M": 0 },
    Silver: { "3M": 3499, "6M": 5000, "12M": 9999 },
    Gold: { "3M": 8000, "6M": 14000, "12M": 24000 },
  };

  const TIER_ORDER = ["Basic Member", "Silver", "Gold"];

  const getButtonProps = (tier: string) => {
    const currentTier = status?.tier || "Basic Member";
    const state = status?.state || "FREE";

    // Current Plan
    if (tier === currentTier) {
      if (state === "EXPIRED") return { label: "Renew Plan", type: "primary" };
      return {
        label: "Current Plan",
        type: "disabled",
        sub: status?.endDate
          ? `Exp: ${new Date(status.endDate).toLocaleDateString()}`
          : null,
      };
    }

    // Upgrade Logic
    const currentIndex = TIER_ORDER.indexOf(currentTier);
    const targetIndex = TIER_ORDER.indexOf(tier);

    if (targetIndex > currentIndex) {
      const discount = status?.remainingValue || 0;
      return {
        label: discount > 0 ? `Upgrade (Save ₹${discount})` : `Select ${tier}`,
        type: "primary",
        discount,
      };
    }

    // Downgrade Logic
    if (targetIndex < currentIndex && currentIndex > 0) {
      return {
        label: "Downgrade",
        type: "disabled",
        tooltip: "Downgrade available after current plan expires",
      };
    }

    return { label: `Select ${tier}`, type: "primary" };
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (tier: "Silver" | "Gold" | "EliteGold") => {
    try {
      setLoadingTier(tier);
      const planKey = `${tier}-${duration}`;

      // 1. Load Razorpay Script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error(
          "Failed to load payment gateway. Please check your connection.",
        );
        return;
      }

      // 2. Create Order on Backend
      const orderData = await subscriptionService.createOrder(planKey);

      // 3. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AuraWeds",
        description: `${tier} Membership (${duration})`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            setLoadingTier(tier);
            const verifyRes = await subscriptionService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planKey,
            });
            toast.success(verifyRes.message);
            onSuccess(verifyRes.tier);
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setLoadingTier(null);
          }
        },
        prefill: {
          name: "", // Can add user name if available
          email: "", // Can add user email if available
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    try {
      setLoadingTier("Elite Gold");
      await subscriptionService.joinWaitlist(waitlistEmail, "Elite Gold");
      setWaitlistSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTier(null);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close Button — pinned to the viewport so it stays above the platform
          nav and remains reachable no matter how the modal is scrolled. */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[210] border border-white/10 shadow-lg backdrop-blur-md"
      >
        <X size={24} />
      </button>

      <div className="min-h-full flex items-start justify-center p-4 py-8 sm:p-12">
        <div
          className="relative w-full max-w-7xl bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-8">
              <Crown size={14} /> Premium Membership
            </div>

            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Elevate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                Matchmaking
              </span>
            </h2>

            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Unlock the full potential of AuraWeds. High-intent matchmaking
              with direct communication and priority visibility.
            </p>

            {/* Duration Toggle */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center p-1.5 bg-slate-950 rounded-[2rem] border border-white/5 shadow-inner">
                {(["3M", "6M", "12M"] as Duration[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-10 py-4 text-sm font-black rounded-[1.5rem] transition-all duration-500 ${
                      duration === d
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-xl scale-105"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {d === "12M"
                      ? "12 Months (Save 40%)"
                      : d.replace("M", " Months")}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
              {/* Basic Member Plan */}
              <PlanCard
                name="Basic Member"
                icon={<Zap size={20} className="text-slate-500" />}
                price="0"
                period="Lifetime"
                features={[
                  "5 Interests per month",
                  "Basic Search (Age, Location, Religion)",
                  "Blurred Photos",
                  "No Contact Access",
                  "Limited Chat (Only if accepted)",
                ]}
                status={getButtonProps("Basic Member")}
                isPremium={false}
              />

              {/* Silver Plan */}
              <PlanCard
                name="Silver"
                icon={<Shield size={20} className="text-slate-400" />}
                price={PRICING.Silver[duration].toLocaleString()}
                period={duration}
                features={[
                  "Unlimited Interests",
                  "View Full Profiles",
                  "Contact Access (10/month)",
                  "Advanced Filters (Caste, Education, Income)",
                  "View Who Viewed You",
                  "Basic Match Percentage",
                ]}
                status={getButtonProps("Silver")}
                isPremium={true}
                onSelect={() => handleUpgrade("Silver")}
                loading={loadingTier === "Silver"}
                highlight={true}
              />

              {/* Gold Plan */}
              <PlanCard
                name="Gold"
                icon={
                  <Star size={20} className="fill-[#D4AF37] text-[#D4AF37]" />
                }
                price={PRICING.Gold[duration].toLocaleString()}
                period={duration}
                features={[
                  "Everything in Silver+",
                  "Unlimited Phone Views",
                  "Horoscope Matching (Star/Rasi/Dosham)",
                  "Profiles Matching Your Horoscope",
                  "Priority Search Ranking",
                  "Profile Highlight Badge",
                  "Advanced Compatibility Score",
                  "Unlimited Messaging",
                  "See Who Shortlisted You",
                  "Recently Active Filter",
                ]}
                status={getButtonProps("Gold")}
                isPremium={true}
                comingSoon={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

interface PlanCardProps {
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  features: string[];
  status: {
    label: string;
    type: string;
    sub?: string | null;
    tooltip?: string;
    discount?: number;
  };
  isPremium: boolean;
  highlight?: boolean;
  onSelect?: () => void;
  loading?: boolean;
  badge?: string;
  eliteTheme?: boolean;
  comingSoon?: boolean;
}

function PlanCard({
  name,
  icon,
  price,
  period,
  features,
  status,
  isPremium,
  highlight,
  onSelect,
  loading,
  badge,
  eliteTheme,
  comingSoon,
}: PlanCardProps) {
  return (
    <div
      className={`relative p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 group ${
        comingSoon
          ? "bg-slate-800/20 border border-white/5 opacity-75"
          : eliteTheme
            ? "bg-gradient-to-br from-slate-900 via-slate-950 to-[#D4AF37]/10 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.2)] scale-105 z-10"
            : highlight
              ? "bg-slate-900 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.1)] scale-105 z-10"
              : "bg-slate-800/30 border border-white/5 hover:border-white/10"
      }`}
    >
      {comingSoon ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-700 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl whitespace-nowrap">
          Coming Soon
        </div>
      ) : (
        (highlight || eliteTheme) && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl whitespace-nowrap">
            {badge || "Recommended"}
          </div>
        )
      )}

      <div className="mb-6">
        <h3
          className={`text-2xl font-black flex items-center gap-3 ${highlight ? "text-[#D4AF37]" : "text-white"}`}
        >
          {icon} {name}
        </h3>
        <p className="mt-2 text-slate-500 text-xs">AuraWeds Membership</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white">₹{price}</span>
          <span className="text-slate-500 font-bold text-sm tracking-widest uppercase italic">
            {" "}
            / {period}
          </span>
        </div>
        {status.discount
          ? status.discount > 0 && (
              <div className="mt-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} /> Prorated Discount Applied
              </div>
            )
          : null}
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feat, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-slate-400 text-sm leading-snug"
          >
            <div
              className={`mt-1 p-0.5 rounded-full ${highlight ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-white/10 text-white"}`}
            >
              <Check size={12} strokeWidth={4} />
            </div>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="relative">
        <button
          onClick={comingSoon ? undefined : onSelect}
          disabled={comingSoon || status.type === "disabled" || loading}
          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
            comingSoon
              ? "bg-slate-900 text-slate-500 border border-white/5 cursor-not-allowed"
              : status.type === "primary"
                ? highlight
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                : "bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed"
          }`}
        >
          {comingSoon ? "Coming Soon" : loading ? "Processing..." : status.label}
        </button>

        {status.sub && (
          <div className="mt-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Clock size={10} /> {status.sub}
          </div>
        )}

        {status.tooltip && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-slate-950 border border-white/10 text-white text-[10px] font-bold rounded-xl opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none group-hover:opacity-100 flex items-center gap-2">
            <Info size={12} className="text-[#D4AF37]" /> {status.tooltip}
          </div>
        )}
      </div>
    </div>
  );
}

function Sparkles({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
