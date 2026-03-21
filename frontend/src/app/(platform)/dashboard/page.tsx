"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { profileService } from "@/services/profileService";
import { matchService, MatchProfile } from "@/services/matchService";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import MatchCardSkeleton from "@/components/ui/MatchCardSkeleton";
import MatchCard from "@/components/ui/MatchCard";
import OtherProfileModal from "@/components/ui/OtherProfileModal";
import UpgradeModal from "@/components/ui/UpgradeModal";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<
    string | number | null
  >(null);
  // Initialize with empty array
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile and matches independently so one failure doesn't block the other
    profileService
      .getMyProfile(false)
      .then((data) => setProfile(data))
      .catch((err) => console.error("Profile fetch error:", err));

    subscriptionService
      .getStatus()
      .then((data) => setSubscription(data))
      .catch((err) => console.error("Sub fetch error:", err));

    matchService
      .getDailyMatches()
      .then((data) => setMatches(data))
      .catch((err) => console.error("Matches fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const userName = profile?.user?.firstName || "User";

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome & Premium Nudge */}
      <div className="relative mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              Good evening,{" "}
              {loading ? (
                <span className="inline-block w-40 h-10 bg-white/5 rounded-lg animate-pulse align-middle" />
              ) : (
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              )}
            </h1>
            <p className="mt-2 text-base text-slate-400 max-w-2xl leading-relaxed">
              We've curated{" "}
              <span className="text-[#D4AF37] font-semibold tracking-wide">
                {(matches || []).length} extraordinary matches
              </span>{" "}
              for you today, perfectly aligned with your lifestyle and
              aspirations.
            </p>
          </div>
          {/* Subscription Badge */}
          <div className="flex gap-4">
            {subscription ? (
              <div
                className={`p-0.5 rounded-full ${
                  subscription.tier === "Elite Gold"
                    ? "bg-gradient-to-br from-purple-500 to-indigo-500"
                    : subscription.tier === "Gold"
                      ? "bg-gradient-to-br from-[#D4AF37] to-[#B8860B]"
                      : subscription.tier === "Silver"
                        ? "bg-gradient-to-br from-slate-300 to-slate-500"
                        : "bg-slate-800"
                }`}
              >
                <div
                  className="bg-slate-900 px-6 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 cursor-pointer shadow-lg"
                  onClick={() => setIsUpgradeModalOpen(true)}
                >
                  {subscription.tier === "Elite Gold"
                    ? "⚡ Elite Member"
                    : subscription.tier === "Gold"
                      ? "⭐ Gold Member"
                      : subscription.tier === "Silver"
                        ? "🛡️ Silver Member"
                        : "Free Tier"}
                </div>
              </div>
            ) : (
              <div className="w-32 h-10 bg-white/5 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Completion Banner - HIDDEN FOR NOW
      <div className="relative group mb-16 px-1">
        ... (boost banner)
      </div> */}

      {/* Subscription Upgrade Promo Banner (Shown if not Elite Gold) */}
      {(!subscription || subscription.tier !== "Elite Gold") && (
        <div
          className="relative group mb-8 px-1 cursor-pointer"
          onClick={() => setIsUpgradeModalOpen(true)}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative bg-[#1a1c29] border border-[#D4AF37]/30 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-slate-950 shadow-inner">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  Unlock Premium Matrimony Matches
                </p>
                <p className="text-slate-400 mt-1 text-sm max-w-md">
                  View direct contact numbers, get priority placement, and
                  browse in invisible mode. Upgrade to Gold today.
                </p>
              </div>
            </div>
            <button className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-wider text-xs">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-serif font-bold text-white">
          Daily Top Matches
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      {/* Match Discovery Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => <MatchCardSkeleton key={i} />)
        ) : !matches || matches.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No matches found for your criteria today.
            </p>
          </div>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.userId}
              match={match}
              onViewProfile={setSelectedProfileId}
              onConnect={(userId: string | number) => {
                // Handle connect logic if needed, or just console log for now
                console.log("Connect with", userId);
              }}
            />
          ))
        )}
      </div>

      <OtherProfileModal
        isOpen={!!selectedProfileId}
        onClose={() => setSelectedProfileId(null)}
        userId={selectedProfileId as any}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSuccess={(tier) => {
          setIsUpgradeModalOpen(false);
          subscriptionService.getStatus().then((data) => setSubscription(data));
          toast.success(`Successfully authenticated and upgraded to ${tier}!`);
        }}
      />
    </div>
  );
}
