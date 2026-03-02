"use client";

import React, { useState, useEffect } from "react";
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

  if (!isOpen) return null;

  const PRICING = {
    Free: { "3M": 0, "6M": 0, "12M": 0 },
    Silver: { "3M": 3499, "6M": 5000, "12M": 9999 },
    Gold: { "3M": 8000, "6M": 14000, "12M": 24000 },
    EliteGold: { "3M": 50000, "6M": 90000, "12M": 150000 },
  };

  const TIER_ORDER = ["Free", "Silver", "Gold", "Elite Gold"];

  const getButtonProps = (tier: string) => {
    const currentTier = status?.tier || "Free";
    const state = status?.state || "FREE";

    // Elite Coming Soon
    if (tier === "Elite Gold") {
      return { label: "Elite Gold", type: "waitlist" };
    }

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

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-4 py-8 sm:p-12">
        <div
          className="relative w-full max-w-7xl bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-50 border border-white/5"
          >
            <X size={24} />
          </button>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-left">
              {/* Free Plan */}
              <PlanCard
                name="Free"
                icon={<Zap size={20} className="text-slate-500" />}
                price="0"
                period="Lifetime"
                features={[
                  "10 Interests per month",
                  "Basic Search Filters",
                  "Blurred Photos",
                  "Limited Chat",
                ]}
                status={getButtonProps("Free")}
                isPremium={false}
              />

              {/* Silver / Early Bird Plan */}
              <PlanCard
                name={duration === "6M" ? "Early Bird Access" : "Silver"}
                icon={
                  <Shield
                    size={20}
                    className={
                      duration === "6M" ? "text-[#D4AF37]" : "text-slate-400"
                    }
                  />
                }
                price={PRICING.Silver[duration].toLocaleString()}
                period={duration}
                features={[
                  "Unlimited Interests",
                  "View Full Profiles",
                  "Contact Access",
                  "Advanced Filters",
                  "View Who Viewed You",
                ]}
                status={getButtonProps("Silver")}
                isPremium={true}
                onSelect={() => handleUpgrade("Silver")}
                loading={loadingTier === "Silver"}
                highlight={duration === "6M"}
                badge={duration === "6M" ? "Limited Period Only" : undefined}
                eliteTheme={duration === "6M"}
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
                  "Priority Search Ranking",
                  "Profile Highlight",
                  "Direct Messenger (Coming Soon)",
                ]}
                status={getButtonProps("Gold")}
                isPremium={true}
                highlight={duration !== "6M"}
                onSelect={() => handleUpgrade("Gold")}
                loading={loadingTier === "Gold"}
              />

              {/* Elite Gold Plan */}
              <div className="relative p-8 rounded-[2.5rem] bg-slate-950 border border-purple-500/20 flex flex-col group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full group-hover:bg-purple-500/10 transition-all duration-700"></div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center gap-3">
                    <Crown size={24} className="text-purple-400" /> Elite Gold
                  </h3>
                  <div className="mt-3 inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-black uppercase tracking-widest">
                    Coming Soon
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-black text-white/40 italic tracking-tighter">
                    VIP Service
                  </span>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                    Personal relationship manager, handpicked matches, and
                    assisted outreach.
                  </p>
                </div>

                {waitlistSent ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                    <Check className="text-purple-400 mb-4" size={40} />
                    <h4 className="text-white font-bold mb-2">
                      You're on the list!
                    </h4>
                    <p className="text-slate-500 text-xs text-balance">
                      We'll notify you as soon as Elite Gold launches.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleWaitlist}
                    className="flex-1 flex flex-col justify-end"
                  >
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter email for early access"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!!loadingTier || !waitlistEmail}
                        className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-purple-900/20"
                      >
                        {loadingTier === "Elite Gold"
                          ? "..."
                          : "Join VIP Waitlist"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
}: PlanCardProps) {
  return (
    <div
      className={`relative p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 group ${
        eliteTheme
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-[#D4AF37]/10 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.2)] scale-105 z-10"
          : highlight
            ? "bg-slate-900 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.1)] scale-105 z-10"
            : "bg-slate-800/30 border border-white/5 hover:border-white/10"
      }`}
    >
      {(highlight || eliteTheme) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl whitespace-nowrap">
          {badge || "Recommended"}
        </div>
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
          onClick={onSelect}
          disabled={status.type === "disabled" || loading}
          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
            status.type === "primary"
              ? highlight
                ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              : "bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : status.label}
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
