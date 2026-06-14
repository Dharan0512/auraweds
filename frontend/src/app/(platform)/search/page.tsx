"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMasterData } from "@/context/MasterDataContext";
import { formatMasterLabel } from "@/lib/utils";
import { profileService } from "@/services/profileService";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import MatchCard from "@/components/ui/MatchCard";
import MatchCardSkeleton from "@/components/ui/MatchCardSkeleton";
import UpgradeModal from "@/components/ui/UpgradeModal";
import OtherProfileModal from "@/components/ui/OtherProfileModal";
import {
  Search,
  Filter,
  X,
  Lock,
  ChevronRight,
  User,
  Globe,
  Briefcase,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import PremiumSelect from "@/components/ui/PremiumSelect";

const SILVER_FILTERS = [
  "educationId",
  "occupationId",
  "heightMin",
  "heightMax",
  "motherTongueId",
  "diet",
  "incomeRangeId",
  "subcasteId",
  "cityId",
  "maritalStatus",
];
const GOLD_FILTERS = [
  "horoscopeMatch",
  "incomeSlider",
  "familyStatus",
  "smoking",
  "drinking",
  "isVerified",
  "recentlyActive",
  "onlineNow",
  "profileStrength",
  "sort",
  "starId",
  "rasiId",
  "dosham",
];

const MARITAL_STATUS_OPTIONS = [
  { id: "Never Married", name: "Never Married" },
  { id: "Divorced", name: "Divorced" },
  { id: "Widowed", name: "Widowed" },
  { id: "Awaiting Divorce", name: "Awaiting Divorce" },
];

const INCOME_OPTIONS = [
  { id: "1", name: "< 5L" },
  { id: "2", name: "5L – 10L" },
  { id: "3", name: "10L – 20L" },
  { id: "4", name: "20L+" },
];

const SORT_OPTIONS = [
  { id: "recentlyJoined", name: "Recently Joined" },
  { id: "mostCompatible", name: "Most Compatible" },
  { id: "recentlyActive", name: "Recently Active" },
  { id: "profileScore", name: "Profile Score" },
];

const FILTER_LABELS: Record<string, string> = {
  ageMin: "Min Age",
  ageMax: "Max Age",
  cityId: "City",
  stateId: "State",
  religionId: "Religion",
  maritalStatus: "Marital",
  casteId: "Caste",
  subcasteId: "Subcaste",
  sort: "Sort",
  starId: "Star",
  rasiId: "Rasi",
  dosham: "Dosham",
  educationId: "Education",
  incomeRangeId: "Income",
  isVerified: "Verified",
  recentlyActive: "Active",
};

export default function SearchPage() {
  const {
    religions,
    educations,
    fetchStates,
    fetchCities,
    fetchCastes,
    fetchSubcastes,
    stars,
    rasis,
  } = useMasterData();

  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<
    string | number | null
  >(null);

  const [results, setResults] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [filters, setFilters] = useState<any>({
    ageMin: "",
    ageMax: "",
    cityId: "",
    stateId: "",
    religionId: "",
    casteId: "",
    subcasteId: "",
    maritalStatus: "",
    sort: "recentlyJoined",
    starId: "",
    rasiId: "",
    dosham: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<any>(filters);
  const [isFiltersChanged, setIsFiltersChanged] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Basic Details",
    "Location",
  ]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [castes, setCastes] = useState<any[]>([]);
  const [subcastes, setSubcastes] = useState<any[]>([]);

  useEffect(() => {
    subscriptionService.getStatus().then(setSubscription);
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(filters) !== JSON.stringify(appliedFilters);
    setIsFiltersChanged(changed);
  }, [filters, appliedFilters]);

  // Lock body scroll while the mobile filter drawer is open
  useEffect(() => {
    document.body.style.overflow = isFilterDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterDrawerOpen]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await profileService.searchProfiles(filters);
      setResults(data.results);
      setTotalCount(data.total);
      setAppliedFilters(filters);
      setIsFiltersChanged(false);
      setIsFilterDrawerOpen(false);
    } catch (err: any) {
      if (err.response?.status === 403 && err.response?.data?.upgradeRequired) {
        setIsUpgradeModalOpen(true);
      } else {
        console.error("Search error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const [connectingId, setConnectingId] = useState<string | number | null>(
    null,
  );

  const handleConnect = async (targetUserId: string | number) => {
    try {
      setConnectingId(targetUserId);
      await profileService.sendInterest(targetUserId);
      setResults((prev) =>
        prev.map((r) =>
          r.userId === targetUserId ? { ...r, hasSentInterest: true } : r,
        ),
      );
    } catch (error: any) {
      if (error.response?.status === 403) {
        setIsUpgradeModalOpen(true);
      } else {
        console.error("Connect error:", error);
      }
      throw error;
    } finally {
      setConnectingId(null);
    }
  };

  const updateFilter = (key: string, value: any) => {
    const isSilver = SILVER_FILTERS.includes(key);
    const isGold = GOLD_FILTERS.includes(key);
    const GOLD_ONLY_SORTS = ["mostCompatible", "recentlyActive", "profileScore"];
    const isGoldSort = key === "sort" && GOLD_ONLY_SORTS.includes(value);

    const userTier = subscription?.tier || "Basic Member";

    if (
      (isGold || isGoldSort) &&
      userTier !== "Gold" &&
      userTier !== "Elite Gold"
    ) {
      setIsUpgradeModalOpen(true);
      return;
    }
    if (isSilver && userTier === "Basic Member") {
      setIsUpgradeModalOpen(true);
      return;
    }

    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      ageMin: "",
      ageMax: "",
      cityId: "",
      stateId: "",
      religionId: "",
      casteId: "",
      subcasteId: "",
      maritalStatus: "",
      sort: "recentlyJoined",
      starId: "",
      rasiId: "",
      dosham: "",
    });
    setStates([]);
    setCities([]);
    setCastes([]);
    setSubcastes([]);
  };

  const handleStateFetch = async (countryId: number) => {
    const data = await fetchStates(countryId);
    setStates(data);
  };

  useEffect(() => {
    handleStateFetch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filters.religionId) {
      fetchCastes(filters.religionId).then(setCastes);
    } else {
      setCastes([]);
    }
    // Caste/subcaste depend on religion; clear stale selections when it changes.
    setSubcastes([]);
    setFilters((prev: any) => ({ ...prev, casteId: "", subcasteId: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.religionId]);

  useEffect(() => {
    if (filters.casteId) {
      fetchSubcastes(filters.casteId).then(setSubcastes);
    } else {
      setSubcastes([]);
    }
    // Subcaste depends on caste; clear stale selection when it changes.
    setFilters((prev: any) => ({ ...prev, subcasteId: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.casteId]);

  useEffect(() => {
    if (filters.stateId) {
      fetchCities(filters.stateId).then(setCities);
    } else {
      setCities([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.stateId]);

  const isFilterLocked = (filterKey: string, value?: any) => {
    const userTier = subscription?.tier || "Basic Member";
    const GOLD_ONLY_SORTS = ["mostCompatible", "recentlyActive", "profileScore"];

    if (filterKey === "sort" && value && GOLD_ONLY_SORTS.includes(value)) {
      return userTier !== "Gold" && userTier !== "Elite Gold";
    }
    if (GOLD_FILTERS.includes(filterKey)) {
      return userTier !== "Gold" && userTier !== "Elite Gold";
    }
    if (SILVER_FILTERS.includes(filterKey)) {
      return userTier === "Basic Member";
    }
    return false;
  };

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "" && v !== "recentlyJoined",
  ).length;

  const labelCls =
    "text-[10px] font-bold text-[var(--text-subtle)] uppercase tracking-wider";
  const inputCls =
    "w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors";

  /* ---------- Filters body (shared by desktop sidebar + mobile drawer) ---------- */
  const filtersBody = (
    <div className="space-y-6">
      {/* Basic Details */}
      <FilterSection
        title="Basic Details"
        icon={<User size={16} />}
        isOpen={expandedSections.includes("Basic Details")}
        onToggle={() => toggleSection("Basic Details")}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className={labelCls}>Min Age</label>
            <input
              type="number"
              value={filters.ageMin}
              onChange={(e) => updateFilter("ageMin", e.target.value)}
              placeholder="18"
              className={inputCls}
            />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Max Age</label>
            <input
              type="number"
              value={filters.ageMax}
              onChange={(e) => updateFilter("ageMax", e.target.value)}
              placeholder="40"
              className={inputCls}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelCls}>Religion</label>
          <PremiumSelect
            options={[
              { id: "", name: "Any Religion" },
              ...religions.map((r) => ({ id: r.id, name: r.name })),
            ]}
            value={filters.religionId}
            onChange={(val) => updateFilter("religionId", val)}
            placeholder="Any Religion"
            className="premium-select-filter"
          />
        </div>

        {/* Caste — available to all members */}
        <div className="space-y-2">
          <label className={labelCls}>Caste / Community</label>
          <PremiumSelect
            options={[
              { id: "", name: "Any Caste" },
              ...castes.map((c) => ({ id: c.id, name: c.name })),
            ]}
            value={filters.casteId}
            onChange={(val) => updateFilter("casteId", val)}
            disabled={!filters.religionId}
            searchable
            placeholder={
              filters.religionId ? "Search caste…" : "Select a religion first"
            }
            className="premium-select-filter"
          />
        </div>

        {/* Sub-caste — premium only */}
        <div className="space-y-2">
          <label className={`${labelCls} flex items-center gap-1.5`}>
            Sub-caste
            {isFilterLocked("subcasteId") && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-black tracking-wider"
                style={{
                  background: "var(--accent-soft-bg)",
                  color: "var(--accent-2)",
                }}
              >
                <Lock size={9} /> PREMIUM
              </span>
            )}
          </label>
          <div className="relative">
            <PremiumSelect
              options={[
                { id: "", name: "Any Sub-caste" },
                ...subcastes.map((s) => ({ id: s.id, name: s.name })),
              ]}
              value={filters.subcasteId}
              onChange={(val) => updateFilter("subcasteId", val)}
              disabled={isFilterLocked("subcasteId") || !filters.casteId}
              searchable
              placeholder={
                isFilterLocked("subcasteId")
                  ? "Upgrade to filter by sub-caste"
                  : filters.casteId
                    ? "Search sub-caste…"
                    : "Select a caste first"
              }
              className="premium-select-filter"
            />
            {isFilterLocked("subcasteId") && (
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(true)}
                aria-label="Upgrade to filter by sub-caste"
                className="absolute inset-0 z-10 rounded-2xl"
              />
            )}
          </div>
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        icon={<Globe size={16} />}
        isOpen={expandedSections.includes("Location")}
        onToggle={() => toggleSection("Location")}
      >
        <div className="space-y-2">
          <label className={labelCls}>State</label>
          <PremiumSelect
            options={[
              { id: "", name: "Any State" },
              ...states.map((s) => ({ id: s.id, name: s.name })),
            ]}
            value={filters.stateId}
            onChange={(val) => updateFilter("stateId", val)}
            searchable
            placeholder="Search state…"
            className="premium-select-filter"
          />
        </div>
        <div className="space-y-2">
          <label className={labelCls}>City</label>
          <PremiumSelect
            options={[
              { id: "", name: "Any City" },
              ...cities.map((c) => ({ id: c.id, name: c.name })),
            ]}
            value={filters.cityId}
            onChange={(val) => updateFilter("cityId", val)}
            searchable
            placeholder="Search city…"
            className="premium-select-filter"
          />
        </div>
      </FilterSection>

      {!showMoreFilters ? (
        <button
          onClick={() => setShowMoreFilters(true)}
          className="w-full py-3 bg-[var(--surface-2)] hover:bg-[var(--surface-hover)] border border-[var(--border)] rounded-2xl text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--accent)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
        >
          Show more filters <ChevronRight size={14} className="rotate-90" />
        </button>
      ) : (
        <>
          {/* Essential Filters (Silver) */}
          <FilterSection
            title="Essential Filters"
            icon={<Briefcase size={16} />}
            aspirational="Precise Matchmaking"
            isOpen={expandedSections.includes("Essential Filters")}
            onToggle={() => toggleSection("Essential Filters")}
            locked={isFilterLocked("educationId")}
          >
            <div className="space-y-2">
              <label className={labelCls}>Education</label>
              <PremiumSelect
                options={[
                  { id: "", name: "Any Education" },
                  ...educations.map((e) => ({ id: e.id, name: e.name })),
                ]}
                value={filters.educationId}
                onChange={(val) => updateFilter("educationId", val)}
                disabled={isFilterLocked("educationId")}
                placeholder="Any Education"
                className="premium-select-filter"
              />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Marital Status</label>
              <PremiumSelect
                options={[{ id: "", name: "Any Status" }, ...MARITAL_STATUS_OPTIONS]}
                value={filters.maritalStatus}
                onChange={(val) => updateFilter("maritalStatus", val)}
                disabled={isFilterLocked("maritalStatus")}
                placeholder="Any Status"
                className="premium-select-filter"
              />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Income</label>
              <PremiumSelect
                options={[{ id: "", name: "Any Income" }, ...INCOME_OPTIONS]}
                value={filters.incomeRangeId}
                onChange={(val) => updateFilter("incomeRangeId", val)}
                disabled={isFilterLocked("incomeRangeId")}
                placeholder="Any Income"
                className="premium-select-filter"
              />
            </div>
          </FilterSection>

          {/* Power Filters (Gold) */}
          <FilterSection
            title="Power Filters"
            icon={<Search size={16} />}
            aspirational="Unlock Smarter Matchmaking"
            isOpen={expandedSections.includes("Power Filters")}
            onToggle={() => toggleSection("Power Filters")}
            locked={isFilterLocked("isVerified")}
            premium
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <label className={labelCls}>Sort By</label>
                <PremiumSelect
                  options={SORT_OPTIONS}
                  value={filters.sort}
                  onChange={(val) => updateFilter("sort", val)}
                  disabled={isFilterLocked("sort")}
                  placeholder="Sort Results"
                  className="premium-select-filter"
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Star (Nakshatram)</label>
                <PremiumSelect
                  options={[
                    { id: "", name: "Any Star" },
                    ...stars.map((s) => ({ id: s.id, name: formatMasterLabel(s) })),
                  ]}
                  value={filters.starId}
                  onChange={(val) => updateFilter("starId", val)}
                  disabled={isFilterLocked("starId")}
                  placeholder="Any Star"
                  className="premium-select-filter"
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Rasi</label>
                <PremiumSelect
                  options={[
                    { id: "", name: "Any Rasi" },
                    ...rasis.map((r) => ({ id: r.id, name: formatMasterLabel(r) })),
                  ]}
                  value={filters.rasiId}
                  onChange={(val) => updateFilter("rasiId", val)}
                  disabled={isFilterLocked("rasiId")}
                  placeholder="Any Rasi"
                  className="premium-select-filter"
                />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Dosham</label>
                <PremiumSelect
                  options={[
                    { id: "", name: "Any" },
                    { id: "sevvai", name: "Sevvai Dosham" },
                    { id: "rahu", name: "Rahu Ketu Dosham" },
                  ]}
                  value={filters.dosham}
                  onChange={(val) => updateFilter("dosham", val)}
                  disabled={isFilterLocked("dosham")}
                  placeholder="Any Dosham"
                  className="premium-select-filter"
                />
              </div>

              <ToggleRow
                label="Verified Only"
                checked={filters.isVerified === "true"}
                disabled={isFilterLocked("isVerified")}
                onChange={(c) => updateFilter("isVerified", c ? "true" : "false")}
              />
              <ToggleRow
                label="Recently Active"
                checked={filters.recentlyActive === "true"}
                disabled={isFilterLocked("recentlyActive")}
                onChange={(c) =>
                  updateFilter("recentlyActive", c ? "true" : "false")
                }
              />
            </div>
          </FilterSection>

          <button
            onClick={() => setShowMoreFilters(false)}
            className="w-full py-3 text-[10px] font-bold text-[var(--text-subtle)] hover:text-[var(--text)] transition-all uppercase tracking-widest"
          >
            Show less
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[var(--text)]">
            Advanced{" "}
            <span
              style={{
                backgroundImage: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Search
            </span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Discover profiles tailored to your specific criteria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter trigger */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-soft transition-colors hover:bg-[var(--surface-hover)]"
          >
            <SlidersHorizontal size={16} style={{ color: "var(--accent-2)" }} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[10px] font-black text-white"
                style={{ backgroundImage: "var(--accent-gradient)" }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Results count */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 backdrop-blur-md">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-subtle)]">
              Results
            </span>
            <span
              className="text-2xl font-black tabular-nums"
              style={{ color: "var(--accent-2)" }}
            >
              {loading ? "…" : totalCount}
              <span className="ml-1 text-xs font-bold text-[var(--text-muted)]">
                PROFILES
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-24 h-fit max-h-[calc(100vh*1.2-6rem)] overflow-y-auto pb-10">
          <div className="theme-card relative overflow-hidden rounded-3xl p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -mr-10 -mt-10 right-0 top-0 h-32 w-32 rounded-full blur-[60px]"
              style={{ background: "var(--app-grad-1)" }}
            />
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-xl font-bold text-[var(--text)]">
                <Filter size={20} style={{ color: "var(--accent-2)" }} /> Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-xs font-bold uppercase tracking-widest text-[var(--text-subtle)] transition-colors hover:text-[var(--accent)]"
              >
                Reset
              </button>
            </div>
            <div className="relative z-10">{filtersBody}</div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1 min-w-0">
          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === "" || value === "recentlyJoined")
                  return null;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]"
                  >
                    <span style={{ color: "var(--accent-2)" }}>
                      {FILTER_LABELS[key] || key}:
                    </span>
                    {String(value)}
                    <button
                      onClick={() => updateFilter(key, "")}
                      className="ml-1 transition-colors hover:text-[var(--danger)]"
                      aria-label={`Remove ${FILTER_LABELS[key] || key} filter`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => <MatchCardSkeleton key={i} />)
            ) : results.length === 0 ? (
              <div className="theme-card col-span-full rounded-[2.5rem] border border-dashed border-[var(--border-strong)] px-8 py-20 text-center">
                <div
                  className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full"
                  style={{
                    background: "var(--accent-soft-bg)",
                    color: "var(--accent)",
                  }}
                >
                  <Search size={32} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--text)]">
                  No strong matches found
                </h3>
                <p className="mx-auto mb-8 max-w-md text-sm text-[var(--text-muted)]">
                  Try widening your age range or removing the income filter to see
                  more profiles.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({
                        ...prev,
                        ageMin: Math.max(18, (Number(prev.ageMin) || 18) - 2),
                        ageMax: (Number(prev.ageMax) || 35) + 2,
                      }))
                    }
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-xs font-bold text-[var(--text-muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    Expand age range by 2 years
                  </button>
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({ ...prev, cityId: "" }))
                    }
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-xs font-bold text-[var(--text-muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    Search nearby cities
                  </button>
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({ ...prev, incomeRangeId: "" }))
                    }
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-xs font-bold text-[var(--text-muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  >
                    Remove income filter
                  </button>
                </div>
              </div>
            ) : (
              results.map((match) => (
                <MatchCard
                  key={match.userId}
                  match={match}
                  onViewProfile={setSelectedProfileId}
                  onConnect={() => handleConnect(match.userId)}
                  hasSentInterest={match.hasSentInterest}
                  isLoading={connectingId === match.userId}
                  isLocked={false}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* ---------- Mobile filter drawer (portaled above the nav) ---------- */}
      {mounted &&
        isFilterDrawerOpen &&
        createPortal(
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsFilterDrawerOpen(false)}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col shadow-2xl animate-in slide-in-from-left duration-300"
            style={{ background: "var(--surface-solid)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div
              className="flex items-center justify-between border-b px-5 py-4"
              style={{ borderColor: "var(--border)" }}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--text)]">
                <Filter size={18} style={{ color: "var(--accent-2)" }} /> Filters
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-subtle)] hover:text-[var(--accent)]"
                >
                  <RotateCcw size={12} /> Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  aria-label="Close filters"
                  className="grid h-9 w-9 place-items-center rounded-xl border text-[var(--text)]"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">{filtersBody}</div>

            <div
              className="border-t p-4"
              style={{ borderColor: "var(--border)", background: "var(--surface-solid)" }}
            >
              <button
                onClick={handleSearch}
                className="w-full rounded-2xl py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95"
                style={{ backgroundImage: "var(--accent-gradient)" }}
              >
                Show {loading ? "…" : totalCount} results
              </button>
            </div>
          </div>
        </div>,
          document.body,
        )}

      {/* Sticky apply bar (desktop) */}
      {isFiltersChanged && (
        <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 animate-in slide-in-from-bottom-10 duration-500 lg:block">
          <div
            className="flex items-center gap-8 rounded-3xl border px-6 py-4 shadow-2xl backdrop-blur-2xl"
            style={{
              background: "var(--surface-solid)",
              borderColor: "var(--accent-border)",
            }}
          >
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-[var(--text-subtle)]">
                Smart Search
              </span>
              <span className="text-sm font-bold text-[var(--text)]">
                <span style={{ color: "var(--accent-2)" }}>
                  {activeFilterCount}
                </span>{" "}
                filters applied
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="rounded-2xl px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundImage: "var(--accent-gradient)" }}
            >
              Apply Search
            </button>
          </div>
        </div>
      )}

      <OtherProfileModal
        isOpen={!!selectedProfileId}
        onClose={() => setSelectedProfileId(null)}
        userId={selectedProfileId as any}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSuccess={() => {
          setIsUpgradeModalOpen(false);
          subscriptionService.getStatus().then(setSubscription);
        }}
      />
    </div>
  );
}

/* ---------------- Toggle row ---------------- */
function ToggleRow({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between group">
      <span className="text-sm text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
        {label}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          disabled={disabled}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="h-5 w-10 rounded-full bg-[var(--surface-hover)] peer-checked:bg-[var(--accent-2)] after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
      </div>
    </label>
  );
}

/* ---------------- Filter section ---------------- */
function FilterSection({
  title,
  icon,
  children,
  aspirational,
  isOpen,
  onToggle,
  locked,
  premium,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  aspirational?: string;
  isOpen?: boolean;
  onToggle: () => void;
  locked?: boolean;
  premium?: boolean;
}) {
  return (
    <div
      className="relative space-y-4 rounded-3xl p-1 transition-all duration-500"
      style={
        premium
          ? { background: "linear-gradient(to bottom, var(--accent-soft-bg), transparent)" }
          : undefined
      }
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3 text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
          <div
            className="grid h-8 w-8 place-items-center rounded-xl transition-colors"
            style={
              premium
                ? { background: "var(--accent-soft-bg)", color: "var(--accent-2)" }
                : { background: "var(--surface-2)" }
            }
          >
            {icon}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest">
              {title}
            </span>
            {aspirational && (
              <span className="text-[9px] font-medium uppercase tracking-tight text-[var(--text-subtle)]">
                {aspirational}
              </span>
            )}
          </div>
        </div>
        <ChevronRight
          size={16}
          className={`text-[var(--text-subtle)] transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-5 px-1 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="h-px w-full bg-[var(--border)]" />
          {children}
        </div>
      )}

      {locked && (
        <div
          onClick={onToggle}
          className="group absolute -inset-1 z-10 flex cursor-pointer items-center justify-center rounded-3xl border backdrop-blur-[2px] transition-all duration-500"
          style={{
            background: "color-mix(in srgb, var(--app-bg) 45%, transparent)",
            borderColor: premium ? "var(--accent-border)" : "var(--border)",
          }}
        >
          <div
            className="flex translate-y-2 items-center gap-2 rounded-2xl border px-4 py-2 text-[10px] font-bold opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{
              background: "var(--surface-solid)",
              borderColor: "var(--accent-border)",
              color: "var(--text)",
            }}
          >
            <Lock size={12} style={{ color: "var(--accent-2)" }} /> Upgrade to
            unlock smarter matchmaking
          </div>
        </div>
      )}
    </div>
  );
}
