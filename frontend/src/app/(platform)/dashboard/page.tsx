"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profileService } from "@/services/profileService";
import {
  matchService,
  MatchProfile,
  DUMMY_MATCHES,
} from "@/services/matchService";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import MatchCardSkeleton from "@/components/ui/MatchCardSkeleton";
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
  // Pre-populate with dummy matches so the UI renders immediately
  const [matches, setMatches] = useState<MatchProfile[]>(DUMMY_MATCHES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile and matches independently so one failure doesn't block the other
    profileService
      .getMyProfile()
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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Welcome & Premium Nudge */}
      <div className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white tracking-tight">
              Good evening,{" "}
              {loading ? (
                <span className="inline-block w-40 h-10 bg-white/5 rounded-lg animate-pulse align-middle" />
              ) : (
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              )}
            </h1>
            <p className="mt-3 text-lg text-slate-400 max-w-2xl leading-relaxed">
              We've curated{" "}
              <span className="text-[#D4AF37] font-semibold tracking-wide">
                {matches.length} extraordinary matches
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

      {/* Completion Banner */}
      <div className="relative group mb-16 px-1">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          <div className="flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-white">
                Unlock 3x More Connections
              </p>
              <p className="text-slate-400 mt-1 max-w-md">
                Your profile is{" "}
                <span className="text-[#D4AF37] font-bold">20% complete</span>.
                Complete your professional story to appear in high-priority
                searches.
              </p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="w-full md:w-auto px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl hover:shadow-white/10"
          >
            Enhance Your Profile
          </Link>
        </div>
      </div>

      {/* Subscription Upgrade Promo Banner (Shown if not Elite Gold) */}
      {(!subscription || subscription.tier !== "Elite Gold") && (
        <div
          className="relative group mb-16 px-1 cursor-pointer"
          onClick={() => setIsUpgradeModalOpen(true)}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative bg-[#1a1c29] border border-[#D4AF37]/30 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-slate-950 shadow-inner">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  Unlock Premium Matrimony Matches
                </p>
                <p className="text-slate-400 mt-1 max-w-md">
                  View direct contact numbers, get priority placement, and
                  browse in invisible mode. Upgrade to Gold today.
                </p>
              </div>
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-wider text-sm">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl font-serif font-bold text-white">
          Daily Top Matches
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      {/* Match Discovery Cards */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => <MatchCardSkeleton key={i} />)
        ) : matches.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest">
              No matches found for your criteria today.
            </p>
          </div>
        ) : (
          matches.map((match) => {
            const age = match.basicDetails.dob
              ? new Date().getFullYear() -
                new Date(match.basicDetails.dob).getFullYear()
              : 25;
            return (
              <div
                key={match.userId}
                className="group relative flex flex-col bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-all duration-500"
              >
                <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative h-[28rem] m-3 overflow-hidden rounded-[2rem]">
                  <img
                    src={
                      match.photos[0] ||
                      `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000`
                    }
                    alt={match.basicDetails.firstName}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  {/* Match Score Badge */}
                  <div className="absolute top-5 right-5 z-20">
                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 flex items-center rounded-full text-xs font-black text-white shadow-2xl border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2 animate-pulse"></span>
                      {match.matchScore}% SYNC
                    </div>
                  </div>

                  {/* Verification Badges */}
                  <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                    {match.badge?.mobileVerified && (
                      <span className="text-[9px] font-black bg-emerald-500/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-emerald-400/30">
                        ✓ Verified
                      </span>
                    )}
                    {match.badge?.horoscopeAvailable && (
                      <span className="text-[9px] font-black bg-amber-500/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-amber-400/30">
                        🌙 Horoscope
                      </span>
                    )}
                  </div>

                  {/* Name & Location */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="text-3xl font-serif font-bold text-white mb-1">
                      {match.basicDetails.firstName}, {age}
                    </h3>
                    <div className="flex items-center text-slate-300 text-sm font-medium gap-2">
                      <svg
                        className="w-4 h-4 text-[#D4AF37]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {match.basicDetails.location} &bull;{" "}
                      {match.professionalInfo.profession}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-7 pb-7 pt-2 space-y-4">
                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5">
                      {match.basicDetails.religion}
                    </span>
                    {match.basicDetails.caste && (
                      <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5">
                        {match.basicDetails.caste}
                      </span>
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5">
                      {match.basicDetails.height}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/10">
                      {match.professionalInfo.incomeRange}
                    </span>
                  </div>

                  {/* Education */}
                  <p className="text-slate-500 text-xs font-semibold truncate">
                    🎓 {match.professionalInfo.education}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-[0.2em] py-4 rounded-2xl border border-white/5 transition-all outline-none"
                      onClick={() => setSelectedProfileId(match.userId)}
                    >
                      Profile
                    </button>
                    <button className="flex-[1.5] bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            );
          })
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
          alert(`Successfully authenticated and upgraded to ${tier}!`);
        }}
      />
    </div>
  );
}
