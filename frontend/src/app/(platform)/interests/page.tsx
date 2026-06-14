"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Heart,
  Send,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import InterestCard from "@/components/interests/InterestCard";
import {
  interestService,
  Interest,
  InterestCounts,
} from "@/services/interestService";
import { subscriptionService } from "@/services/subscriptionService";
import PremiumSelect from "@/components/ui/PremiumSelect";
import MatchCardSkeleton from "@/components/ui/MatchCardSkeleton";
import ProfileModal from "@/components/ui/ProfileModal";

type TabType = "received" | "sent" | "accepted" | "declined" | "blocked";

const FILTER_OPTIONS = [
  { id: "newest", name: "Newest First" },
  { id: "premium", name: "Premium Users First" },
];

export default function InterestsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [counts, setCounts] = useState<InterestCounts>({
    received: 0,
    sent: 0,
    accepted: 0,
    declined: 0,
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userTier, setUserTier] = useState("Basic Member");
  const [sortBy, setSortBy] = useState("newest");

  // Profile Modal State
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(
    null,
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paginatedData, countsData, subStatus] = await Promise.all([
        interestService.getInterests(activeTab, page, 10, sortBy),
        interestService.getCounts(),
        subscriptionService.getStatus(),
      ]);

      setInterests(paginatedData.interests);
      setTotal(paginatedData.total);
      setCounts(countsData);
      setUserTier(subStatus.tier);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, page, sortBy]);

  const handleAction = async (
    id: string | number,
    action: "accepted" | "rejected",
  ) => {
    try {
      const promise =
        action === "accepted"
          ? interestService.accept(id)
          : interestService.decline(id);
      toast.promise(promise, {
        loading: action === "accepted" ? "Accepting..." : "Declining...",
        success:
          action === "accepted" ? "Interest accepted!" : "Interest declined",
        error: `Failed to ${action} interest.`,
      });
      await promise;
      fetchData();
    } catch (error) {
      console.error("Action error:", error);
    }
  };

  const handleWithdraw = async (id: string | number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-200">
            Are you sure you want to withdraw this interest?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const promise = interestService.withdraw(id);
                  toast.promise(promise, {
                    loading: "Withdrawing...",
                    success: "Interest withdrawn",
                    error: "Failed to withdraw",
                  });
                  await promise;
                  fetchData();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold transition-all"
            >
              Withdraw
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handleBlock = async (id: string | number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-200">
            Block this profile? They will be moved to your blocked list.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const promise = interestService.blockInterest(id);
                  toast.promise(promise, {
                    loading: "Blocking...",
                    success: "User blocked",
                    error: "Failed to block user",
                  });
                  await promise;
                  fetchData();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition-all"
            >
              Block
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handleRemove = async (id: string | number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-200">
            Remove this interest from your list?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const promise = interestService.remove(id);
                  toast.promise(promise, {
                    loading: "Removing...",
                    success: "Interest removed",
                    error: "Failed to remove",
                  });
                  await promise;
                  fetchData();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handleViewProfile = (
    userId: string | number,
    interestId?: string | number,
  ) => {
    if (interestId && activeTab === "received") {
      interestService.markAsViewed(interestId).catch(console.error);
    }
    setSelectedUserId(userId);
    setIsProfileModalOpen(true);
  };

  const tabs = [
    { id: "received", label: "Received", icon: Heart, count: counts.received },
    { id: "sent", label: "Sent", icon: Send, count: counts.sent },
    {
      id: "accepted",
      label: "Accepted",
      icon: CheckCircle2,
      count: counts.accepted,
    },
    {
      id: "declined",
      label: "Declined",
      icon: XCircle,
      count: counts.declined,
    },
    {
      id: "blocked",
      label: "Blocked",
      icon: XCircle, // Fallback icon
      count: 0, // Simplified for now
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full animate-pulse"
          style={{ background: "var(--app-grad-1)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full animate-pulse delay-700"
          style={{ background: "var(--app-grad-2)" }}
        />
        <div
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] blur-[100px] rounded-full animate-pulse delay-1000"
          style={{ background: "var(--app-grad-3)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
              style={{
                background: "var(--accent-soft-bg)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent-2)",
              }}
            >
              <Sparkles size={12} />
              The Pipeline
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--text)] tracking-tight leading-tight">
              Aura{" "}
              <span
                style={{
                  backgroundImage: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Interests
              </span>
            </h1>
            <p className="max-w-lg text-[var(--text-muted)] text-sm font-medium leading-relaxed">
              Track your matchmaking journey. Manage incoming and outgoing
              interests in one premium relationship pipeline.
            </p>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-[10px] font-black text-[var(--text-subtle)] uppercase tracking-widest mb-3 ml-1">
              Filter Pipeline
            </label>
            <PremiumSelect
              options={FILTER_OPTIONS}
              value={sortBy}
              onChange={(val) => {
                setSortBy(val as string);
                setPage(1);
              }}
              placeholder="Sort By"
              className="premium-select-filter"
            />
          </div>
        </div>

        {/* Tabs Layout */}
        <div className="theme-card bg-[var(--surface)] backdrop-blur-3xl border border-[var(--border)] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden">
          {/* Navigation */}
          <div className="flex flex-wrap border-b border-[var(--border)] p-3 gap-2 bg-[var(--surface-2)] backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setPage(1);
                  }}
                  className={`flex-1 min-w-[120px] flex items-center justify-center gap-3 py-4 rounded-[2.5rem] text-sm font-black transition-all duration-500 relative group overflow-hidden ${
                    isActive
                      ? "text-slate-950"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C49B06] animate-gradient-xy transition-all duration-500" />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline tracking-wide">
                    {tab.label}
                  </span>
                  {tab.count > 0 && (
                    <span
                      className={`relative z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black border transition-all duration-500 ${
                        isActive
                          ? "bg-slate-950 text-[#D4AF37] border-slate-800"
                          : "bg-[var(--surface-2)] text-[var(--text)] border-[var(--border)] group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent-2)]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="p-8 min-h-[500px]">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <MatchCardSkeleton key={i} />
                ))}
              </div>
            ) : interests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-700">
                <div className="relative mb-10">
                  <div
                    className="absolute inset-0 blur-3xl rounded-full scale-150 animate-pulse"
                    style={{ background: "var(--accent-soft-bg)" }}
                  />
                  <div
                    className="relative w-32 h-32 backdrop-blur-xl rounded-full flex items-center justify-center shadow-inner"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--accent-border)",
                      color: "var(--accent-2)",
                    }}
                  >
                    <Search size={48} className="animate-bounce" />
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-[var(--text)] mb-4">
                  No Interests Yet
                </h3>
                <p className="text-[var(--text-muted)] max-w-sm font-medium leading-relaxed">
                  Connect with potential matches. Start expressing interest to
                  fill your relationship pipeline.
                </p>
                <button
                  onClick={() => (window.location.href = "/search")}
                  className="mt-10 relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                >
                  <span className="relative z-10">Discover Matches</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {interests.map((interest) => (
                    <InterestCard
                      key={interest.id}
                      interest={interest}
                      type={activeTab === "declined" ? "rejected" : activeTab}
                      userTier={userTier}
                      onAction={handleAction}
                      onWithdraw={handleWithdraw}
                      onRemove={handleRemove}
                      onBlock={handleBlock}
                      onViewProfile={(uid) =>
                        handleViewProfile(uid, interest.id)
                      }
                      onMessage={() => toast.success("Chat coming soon!")}
                      onContact={async (uid) => {
                        const currentInterest = interests.find(
                          (i) => i.profile.userId === uid,
                        );
                        const mobile =
                          currentInterest?.profile?.basicDetails?.mobile;
                        const firstName =
                          currentInterest?.profile?.basicDetails?.firstName ||
                          "User";

                        if (mobile) {
                          // Success case: notify user as well
                          await interestService.notifyCall(uid);
                          window.location.href = `tel:${mobile}`;
                        } else {
                          // Failure case (not mutual/premium): notify user and show connection wish
                          await interestService.notifyCall(uid);
                          toast.error(
                            `Profile ${firstName} wants to connect with you. (Upgrade to Silver to view contact)`,
                            { duration: 5000 },
                          );
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {total > 10 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-bold text-[var(--text-subtle)] tracking-widest">
                      PAGE {page} OF {Math.ceil(total / 10)}
                    </span>
                    <button
                      disabled={page >= Math.ceil(total / 10)}
                      onClick={() => setPage((p) => p + 1)}
                      className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userId={selectedUserId?.toString()}
        />
      </div>
    </div>
  );
}
