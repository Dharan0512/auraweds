"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMasterData } from "@/context/MasterDataContext";
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
  Heart,
  Briefcase,
  GraduationCap,
  DollarSign,
  Calendar,
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
  "casteId",
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

export default function SearchPage() {
  const {
    countries,
    religions,
    motherTongues,
    heights,
    educations,
    fetchStates,
    fetchCities,
    fetchCastes,
    fetchOccupations,
    fetchIncomeRanges,
    stars,
    rasis,
    loading: masterLoading,
  } = useMasterData();

  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<
    string | number | null
  >(null);

  const [results, setResults] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<any>({
    ageMin: "",
    ageMax: "",
    cityId: "",
    stateId: "",
    religionId: "",
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
  const [occupations, setOccupations] = useState<any[]>([]);

  useEffect(() => {
    subscriptionService.getStatus().then(setSubscription);
    handleSearch();
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(filters) !== JSON.stringify(appliedFilters);
    setIsFiltersChanged(changed);
  }, [filters, appliedFilters]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await profileService.searchProfiles(filters);
      setResults(data.results);
      setTotalCount(data.total);
      setAppliedFilters(filters);
      setIsFiltersChanged(false);
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
      // Update local state to show interest sent
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
      throw error; // Re-throw for the button to handle if needed
    } finally {
      setConnectingId(null);
    }
  };

  const updateFilter = (key: string, value: any) => {
    const isSilver = SILVER_FILTERS.includes(key);
    const isGold = GOLD_FILTERS.includes(key);
    const GOLD_ONLY_SORTS = [
      "mostCompatible",
      "recentlyActive",
      "profileScore",
    ];
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
    const defaultFilters = {
      ageMin: "",
      ageMax: "",
      cityId: "",
      stateId: "",
      religionId: "",
      maritalStatus: "",
      sort: "recentlyJoined",
      starId: "",
      rasiId: "",
      dosham: "",
    };
    setFilters(defaultFilters);
    setStates([]);
    setCities([]);
    setCastes([]);
  };

  const handleStateFetch = async (countryId: number) => {
    const data = await fetchStates(countryId);
    setStates(data);
  };

  useEffect(() => {
    // For now we assume India (ID 1) as default for states
    handleStateFetch(1);
  }, []);

  useEffect(() => {
    if (filters.religionId) {
      fetchCastes(filters.religionId).then(setCastes);
    } else {
      setCastes([]);
    }
  }, [filters.religionId]);

  useEffect(() => {
    if (filters.stateId) {
      fetchCities(filters.stateId).then(setCities);
    } else {
      setCities([]);
    }
  }, [filters.stateId]);

  const isFilterLocked = (filterKey: string, value?: any) => {
    const userTier = subscription?.tier || "Basic Member";
    const GOLD_ONLY_SORTS = [
      "mostCompatible",
      "recentlyActive",
      "profileScore",
    ];

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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-24 h-fit max-h-[calc(100vh*1.2-6rem)] overflow-y-auto pb-10">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[calc(100vh*1.2-10rem)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full -mr-10 -mt-10"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Filter size={20} className="text-[#D4AF37]" /> Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-slate-500 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
              >
                Reset
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Basic Filters */}
              <FilterSection
                title="Basic Details"
                icon={<User size={16} />}
                isOpen={expandedSections.includes("Basic Details")}
                onToggle={() => toggleSection("Basic Details")}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Min Age
                    </label>
                    <input
                      type="number"
                      value={filters.ageMin}
                      onChange={(e) => updateFilter("ageMin", e.target.value)}
                      placeholder="18"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Max Age
                    </label>
                    <input
                      type="number"
                      value={filters.ageMax}
                      onChange={(e) => updateFilter("ageMax", e.target.value)}
                      placeholder="40"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Religion
                  </label>
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
              </FilterSection>

              {/* Location */}
              <FilterSection
                title="Location"
                icon={<Globe size={16} />}
                isOpen={expandedSections.includes("Location")}
                onToggle={() => toggleSection("Location")}
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    State
                  </label>
                  <PremiumSelect
                    options={[
                      { id: "", name: "Any State" },
                      ...states.map((s) => ({ id: s.id, name: s.name })),
                    ]}
                    value={filters.stateId}
                    onChange={(val) => updateFilter("stateId", val)}
                    placeholder="Any State"
                    className="premium-select-filter"
                  />
                </div>
              </FilterSection>

              {!showMoreFilters ? (
                <button
                  onClick={() => setShowMoreFilters(true)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-bold text-slate-500 hover:text-[#D4AF37] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Show more filters{" "}
                  <ChevronRight size={14} className="rotate-90" />
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
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        Education
                      </label>
                      <PremiumSelect
                        options={[
                          { id: "", name: "Any Education" },
                          ...educations.map((e) => ({
                            id: e.id,
                            name: e.name,
                          })),
                        ]}
                        value={filters.educationId}
                        onChange={(val) => updateFilter("educationId", val)}
                        disabled={isFilterLocked("educationId")}
                        placeholder="Any Education"
                        className="premium-select-filter"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        City
                      </label>
                      <PremiumSelect
                        options={[
                          { id: "", name: "Any City" },
                          ...cities.map((c) => ({ id: c.id, name: c.name })),
                        ]}
                        value={filters.cityId}
                        onChange={(val) => updateFilter("cityId", val)}
                        disabled={isFilterLocked("cityId")}
                        placeholder="Any City"
                        className="premium-select-filter"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Marital Status
                      </label>
                      <PremiumSelect
                        options={[
                          { id: "", name: "Any Status" },
                          ...MARITAL_STATUS_OPTIONS,
                        ]}
                        value={filters.maritalStatus}
                        onChange={(val) => updateFilter("maritalStatus", val)}
                        disabled={isFilterLocked("maritalStatus")}
                        placeholder="Any Status"
                        className="premium-select-filter"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        Income
                      </label>
                      <PremiumSelect
                        options={[
                          { id: "", name: "Any Income" },
                          ...INCOME_OPTIONS,
                        ]}
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
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Sort By
                        </label>
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
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Star (Nakshatram)
                        </label>
                        <PremiumSelect
                          options={[
                            { id: "", name: "Any Star" },
                            ...stars.map((s) => ({ id: s.id, name: s.name })),
                          ]}
                          value={filters.starId}
                          onChange={(val) => updateFilter("starId", val)}
                          disabled={isFilterLocked("starId")}
                          placeholder="Any Star"
                          className="premium-select-filter"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Rasi
                        </label>
                        <PremiumSelect
                          options={[
                            { id: "", name: "Any Rasi" },
                            ...rasis.map((r) => ({ id: r.id, name: r.name })),
                          ]}
                          value={filters.rasiId}
                          onChange={(val) => updateFilter("rasiId", val)}
                          disabled={isFilterLocked("rasiId")}
                          placeholder="Any Rasi"
                          className="premium-select-filter"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Dosham
                        </label>
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

                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          Verified Only
                        </span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            disabled={isFilterLocked("isVerified")}
                            checked={filters.isVerified === "true"}
                            onChange={(e) =>
                              updateFilter(
                                "isVerified",
                                e.target.checked ? "true" : "false",
                              )
                            }
                          />
                          <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-[#D4AF37] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          Recently Active
                        </span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            disabled={isFilterLocked("recentlyActive")}
                            checked={filters.recentlyActive === "true"}
                            onChange={(e) =>
                              updateFilter(
                                "recentlyActive",
                                e.target.checked ? "true" : "false",
                              )
                            }
                          />
                          <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-[#D4AF37] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                      </label>
                    </div>
                  </FilterSection>

                  <button
                    onClick={() => setShowMoreFilters(false)}
                    className="w-full py-3 text-[10px] font-bold text-slate-600 hover:text-white transition-all uppercase tracking-widest"
                  >
                    Show less
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-end gap-5 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                Advanced{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] to-slate-400 bg-clip-text text-transparent">
                  Search
                </span>
              </h1>
              <p className="mt-2 text-slate-400">
                Discover profiles based on your specific criteria.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">
                Results Found
              </span>
              <span className="text-2xl font-black text-[#D4AF37] tabular-nums">
                {loading ? "..." : totalCount}{" "}
                <span className="text-xs text-slate-400 font-bold ml-1">
                  PROFILES
                </span>
              </span>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === "" || value === "recentlyJoined")
                  return null;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    <span className="text-[#D4AF37]/60">{key}:</span>{" "}
                    {String(value)}
                    <button
                      onClick={() => updateFilter(key, "")}
                      className="hover:text-red-400 transition-colors ml-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => <MatchCardSkeleton key={i} />)
            ) : results.length === 0 ? (
              <div className="col-span-full py-20 px-10 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No strong matches found.
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-10">
                  Try widening your age range or removing the income filter to
                  see more profiles.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({
                        ...prev,
                        ageMin: Math.max(18, (Number(prev.ageMin) || 18) - 2),
                        ageMax: (Number(prev.ageMax) || 35) + 2,
                      }))
                    }
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-xs font-bold text-slate-300 transition-all"
                  >
                    Expand age range by 2 years
                  </button>
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({ ...prev, cityId: "" }))
                    }
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-xs font-bold text-slate-300 transition-all"
                  >
                    Search nearby cities
                  </button>
                  <button
                    onClick={() =>
                      setFilters((prev: any) => ({
                        ...prev,
                        incomeRangeId: "",
                      }))
                    }
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-xs font-bold text-slate-300 transition-all"
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

      {/* Sticky Apply Bar */}
      {isFiltersChanged && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-[#D4AF37]/30 px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                Smart Search
              </span>
              <span className="text-sm font-bold text-white">
                <span className="text-[#D4AF37]">{activeFilterCount}</span>{" "}
                filters applied
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
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
        onSuccess={(tier) => {
          setIsUpgradeModalOpen(false);
          subscriptionService.getStatus().then(setSubscription);
        }}
      />
    </div>
  );
}

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
      className={`space-y-4 relative p-1 rounded-3xl transition-all duration-500 ${premium ? "bg-gradient-to-b from-[#D4AF37]/10 to-transparent" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${premium ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-white/5"}`}
          >
            {icon}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest">
              {title}
            </span>
            {aspirational && (
              <span className="text-[9px] font-medium text-slate-500 group-hover:text-[#D4AF37]/70 transition-colors uppercase tracking-tight">
                {aspirational}
              </span>
            )}
          </div>
        </div>
        <ChevronRight
          size={16}
          className={`text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="space-y-5 px-1 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="h-px bg-white/5 w-full"></div>
          {children}
        </div>
      )}

      {locked && (
        <div
          onClick={onToggle}
          className={`absolute -inset-1 bg-slate-950/20 backdrop-blur-[2px] rounded-3xl flex items-center justify-center cursor-pointer group z-10 border transition-all duration-500 ${premium ? "border-[#D4AF37]/20 hover:border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/5 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]" : "border-white/5"}`}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/90 backdrop-blur-md border border-[#D4AF37]/30 px-4 py-2 rounded-2xl text-[10px] font-bold text-white shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
            <Lock size={12} className="text-[#D4AF37]" /> Upgrade to Gold to
            unlock smarter matchmaking
          </div>
        </div>
      )}
    </div>
  );
}
