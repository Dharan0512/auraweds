"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { profileService } from "@/services/profileService";
import { matchService, MatchProfile } from "@/services/matchService";
import { interestService, InterestCounts } from "@/services/interestService";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import OtherProfileModal from "@/components/ui/OtherProfileModal";
import UpgradeModal from "@/components/ui/UpgradeModal";
import {
  StatCard,
  CompletionRing,
  ThemedMatchCard,
  MatchSkeleton,
  PanelTitle,
  CountUp,
} from "@/components/dashboard/widgets";
import {
  Eye,
  Heart,
  Users,
  Gauge,
  Sparkles,
  Crown,
  ArrowUpRight,
  Search as SearchIcon,
  Star,
  MessageSquare,
  CheckCircle2,
  Circle,
  ShieldCheck,
} from "lucide-react";

const TIER_META: Record<string, { label: string; icon: string }> = {
  "Elite Gold": { label: "Elite Member", icon: "⚡" },
  Gold: { label: "Gold Member", icon: "⭐" },
  Silver: { label: "Silver Member", icon: "🛡️" },
  "Basic Member": { label: "Free Tier", icon: "✦" },
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [counts, setCounts] = useState<InterestCounts | null>(null);
  const [viewers, setViewers] = useState<any[]>([]);
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    profileService
      .getMyProfile(false)
      .then(setProfile)
      .catch((e) => console.error("Profile fetch error:", e));
    subscriptionService
      .getStatus()
      .then(setSubscription)
      .catch((e) => console.error("Sub fetch error:", e));
    interestService.getCounts().then(setCounts).catch(() => {});
    matchService.getViewers().then(setViewers).catch(() => {});
    matchService
      .getDailyMatches()
      .then(setMatches)
      .catch((e) => console.error("Matches fetch error:", e))
      .finally(() => setLoading(false));
  }, []);

  const userName = profile?.user?.firstName || "there";
  const tier = subscription?.tier ?? "Basic Member";
  const tierMeta = TIER_META[tier] ?? TIER_META["Basic Member"];
  const isElite = tier === "Elite Gold";
  const isSilver = tier === "Silver";
  // Silver has no tier to upgrade to until Gold launches, so hide the upgrade promo.
  // TODO: remove `!isSilver` once Gold membership is released.
  const showUpgradePromo = !isElite && !isSilver;

  /* ---- profile completion checklist ---- */
  const checklist = useMemo(() => {
    const items = [
      { label: "Basic details", done: !!profile?.user?.firstName },
      { label: "Profile photo", done: (profile?.photos?.length || 0) > 0 },
      {
        label: "Education & career",
        done: !!(profile?.professionalInfo?.profession || profile?.profession),
      },
      {
        label: "Partner preferences",
        done: !!(profile?.partnerPreferences || profile?.preferences),
      },
      {
        label: "Verification",
        done: !!(
          profile?.badge?.mobileVerified ||
          profile?.isVerified ||
          profile?.user?.isVerified
        ),
      },
    ];
    return items;
  }, [profile]);

  const completion = profile
    ? Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100)
    : 0;

  // Profile strength has no historical series, so build a sparkline that
  // ramps up to the real completion value rather than showing fabricated data.
  const strengthSpark = useMemo(() => {
    const steps = 7;
    return Array.from({ length: steps }, (_, i) =>
      Math.round((completion * (i + 1)) / steps),
    );
  }, [completion]);

  const receivedCount = counts?.received ?? 0;
  const viewsCount = viewers?.length ?? 0;
  const matchesCount = matches?.length ?? 0;
  const acceptedCount = counts?.accepted ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ============ Greeting hero ============ */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="theme-card relative mb-8 overflow-hidden rounded-[32px] p-6 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 80% at 100% 0%, var(--app-grad-1), transparent), radial-gradient(ellipse 40% 70% at 0% 100%, var(--app-grad-2), transparent)",
          }}
        />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "var(--accent-soft-bg)", color: "var(--accent)" }}
            >
              <Sparkles className="h-3.5 w-3.5" /> {tierMeta.icon} {tierMeta.label}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              {greeting()},{" "}
              <span
                style={{
                  backgroundImage: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {userName}
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
              We&apos;ve curated{" "}
              <span className="font-semibold" style={{ color: "var(--accent-2)" }}>
                {matchesCount} new {matchesCount === 1 ? "match" : "matches"}
              </span>{" "}
              for you today — aligned with your values, lifestyle and aspirations.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--accent-gradient)" }}
              >
                <SearchIcon className="h-4 w-4" /> Discover matches
              </Link>
              <Link
                href="/interests"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <Star className="h-4 w-4" style={{ color: "var(--accent-2)" }} />
                {receivedCount > 0 ? `${receivedCount} interests` : "Interests"}
              </Link>
            </div>
          </div>

          <div className="shrink-0">
            <CompletionRing percent={completion} />
          </div>
        </div>
      </motion.div>

      {/* ============ Stats row ============ */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Eye}
          label="Profile views"
          value={viewsCount}
          delta={12}
          spark={[4, 6, 5, 8, 7, 10, 12]}
          accent="var(--accent)"
          delay={0.05}
        />
        <StatCard
          icon={Heart}
          label="Interests received"
          value={receivedCount}
          delta={8}
          spark={[2, 3, 3, 5, 4, 6, 7]}
          accent="var(--accent-2)"
          delay={0.1}
        />
        <StatCard
          icon={Users}
          label="New matches"
          value={matchesCount}
          delta={5}
          spark={[6, 5, 7, 6, 8, 7, 9]}
          accent="var(--accent)"
          delay={0.15}
        />
        <StatCard
          icon={Gauge}
          label="Profile strength"
          value={completion}
          suffix="%"
          spark={strengthSpark}
          accent="var(--accent-2)"
          delay={0.2}
        />
      </div>

      {/* ============ Upgrade promo ============ */}
      {showUpgradePromo && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onClick={() => setIsUpgradeModalOpen(true)}
          className="group relative mb-8 block w-full overflow-hidden rounded-[28px] p-[1.5px] text-left"
          style={{ backgroundImage: "linear-gradient(135deg,#ead08a,#c9a227,#b08a20)" }}
        >
          <div
            className="relative flex flex-col items-center justify-between gap-5 rounded-[27px] p-6 md:flex-row"
            style={{ background: "var(--surface-solid)" }}
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-[#2e1065] shadow-gold">
                <Crown className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg font-bold text-[var(--text)]">
                  Unlock premium matrimony matches
                </p>
                <p className="mt-0.5 max-w-md text-sm text-[var(--text-muted)]">
                  See who viewed you, view contact details, get priority placement
                  and browse in invisible mode.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-xs font-black uppercase tracking-wider text-[#2e1065] shadow-gold transition-transform group-hover:scale-105">
              Upgrade now <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </motion.button>
      )}

      {/* ============ Main grid ============ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Matches */}
        <section className="lg:col-span-2">
          <PanelTitle
            icon={Sparkles}
            action={
              <Link
                href="/search"
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: "var(--accent)" }}
              >
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          >
            Daily Top Matches
          </PanelTitle>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {loading ? (
              [0, 1, 2, 3].map((i) => <MatchSkeleton key={i} />)
            ) : matches.length === 0 ? (
              <div
                className="theme-card col-span-full flex flex-col items-center justify-center gap-3 rounded-[28px] py-16 text-center"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl"
                  style={{ background: "var(--accent-soft-bg)", color: "var(--accent)" }}
                >
                  <Users className="h-7 w-7" />
                </span>
                <p className="font-serif text-lg font-bold text-[var(--text)]">
                  No matches yet today
                </p>
                <p className="max-w-xs text-sm text-[var(--text-muted)]">
                  Refine your preferences to discover more compatible profiles.
                </p>
                <Link
                  href="/search"
                  className="mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundImage: "var(--accent-gradient)" }}
                >
                  <SearchIcon className="h-4 w-4" /> Start searching
                </Link>
              </div>
            ) : (
              matches.map((m, i) => (
                <ThemedMatchCard
                  key={m.userId}
                  match={m}
                  onView={setSelectedProfileId}
                  delay={i * 0.06}
                />
              ))
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* Completion checklist */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="theme-card rounded-3xl p-6"
          >
            <PanelTitle icon={Gauge}>Complete your profile</PanelTitle>
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundImage: "var(--accent-gradient)" }}
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <ul className="space-y-2.5">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="h-4.5 w-4.5" style={{ color: "var(--positive)" }} />
                  ) : (
                    <Circle className="h-4.5 w-4.5" style={{ color: "var(--text-subtle)" }} />
                  )}
                  <span
                    style={{
                      color: item.done ? "var(--text-muted)" : "var(--text)",
                      textDecoration: item.done ? "line-through" : "none",
                    }}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recent viewers / activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="theme-card rounded-3xl p-6"
          >
            <PanelTitle icon={Eye}>Recent activity</PanelTitle>
            {viewers.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">
                When people view your profile or send interests, you&apos;ll see it
                here.
              </p>
            ) : (
              <ul className="space-y-3">
                {viewers.slice(0, 5).map((v, i) => {
                  const name = v?.firstName || v?.name || v?.user?.firstName || "Someone";
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundImage: "var(--accent-gradient)" }}
                      >
                        {name[0]?.toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[var(--text)]">
                          {name}
                        </p>
                        <p className="text-xs text-[var(--text-subtle)]">
                          viewed your profile
                        </p>
                      </div>
                      <Eye className="h-4 w-4" style={{ color: "var(--text-subtle)" }} />
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* Quick stats / trust */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="theme-card relative overflow-hidden rounded-3xl p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, var(--app-grad-2), transparent)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-gradient text-[#2e1065] shadow-gold">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-lg font-bold text-[var(--text)]">
                  <CountUp value={acceptedCount} /> mutual connections
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Keep the conversation going
                </p>
              </div>
            </div>
            <Link
              href="/chat"
              className="relative mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--surface-2)", color: "var(--text)" }}
            >
              <MessageSquare className="h-4 w-4" style={{ color: "var(--accent-2)" }} />
              Open messages
            </Link>
          </motion.div>
        </aside>
      </div>

      <OtherProfileModal
        isOpen={!!selectedProfileId}
        onClose={() => setSelectedProfileId(null)}
        userId={selectedProfileId as any}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSuccess={(t) => {
          setIsUpgradeModalOpen(false);
          subscriptionService.getStatus().then(setSubscription);
          toast.success(`Successfully upgraded to ${t}!`);
        }}
      />
    </div>
  );
}
