import { useState } from "react";
import { MasterItem } from "@/services/masterService";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock } from "lucide-react";
import UpgradeModal from "@/components/ui/UpgradeModal";

interface SearchSidebarProps {
  filters: Record<string, string>;
  onChange: (updates: Record<string, string | null>) => void;
  onClear: () => void;
  // Passing master data down for simplicity
  religions?: MasterItem[];
  castes?: MasterItem[];
  countries?: MasterItem[];
  states?: MasterItem[];
  education?: MasterItem[];
  incomeRanges?: MasterItem[];
}

export default function SearchSidebar({
  filters,
  onChange,
  onClear,
  religions,
  castes,
  education,
  incomeRanges,
}: SearchSidebarProps) {
  const { tier } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isBasic = tier === "Basic Member";
  const isGold = tier === "Gold";

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: string,
  ) => {
    onChange({ [key]: e.target.value || null });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    onChange({ [key]: e.target.value || null });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-50 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-lg text-gray-900">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm text-[#6A0DAD] hover:text-purple-800 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={filters.gender || ""}
            onChange={(e) => handleSelectChange(e, "gender")}
            className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin || ""}
              onChange={(e) => handleInputChange(e, "ageMin")}
              className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax || ""}
              onChange={(e) => handleInputChange(e, "ageMax")}
              className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
            />
          </div>
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Religion
          </label>
          <select
            value={filters.religionId || ""}
            onChange={(e) => handleSelectChange(e, "religionId")}
            className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
          >
            <option value="">Any Religion</option>
            {religions?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Caste - Silver/Gold only */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>Caste</span>
            {isBasic && <Lock size={12} className="text-gray-400" />}
          </label>
          <div className="relative">
            <select
              value={filters.casteId || ""}
              onChange={(e) => handleSelectChange(e, "casteId")}
              disabled={isBasic}
              className={`w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] ${isBasic ? "bg-gray-50 opacity-60" : ""}`}
            >
              <option value="">Any Caste</option>
              {castes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {isBasic && (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setShowUpgrade(true)}
              />
            )}
          </div>
        </div>

        {/* Education - Silver/Gold only */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>Education</span>
            {isBasic && <Lock size={12} className="text-gray-400" />}
          </label>
          <div className="relative">
            <select
              value={filters.educationId || ""}
              onChange={(e) => handleSelectChange(e, "educationId")}
              disabled={isBasic}
              className={`w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] ${isBasic ? "bg-gray-50 opacity-60" : ""}`}
            >
              <option value="">Any Education</option>
              {education?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            {isBasic && (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setShowUpgrade(true)}
              />
            )}
          </div>
        </div>

        {/* Income - Silver/Gold only */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>Annual Income</span>
            {isBasic && <Lock size={12} className="text-gray-400" />}
          </label>
          <div className="relative">
            <select
              value={filters.incomeRangeId || ""}
              onChange={(e) => handleSelectChange(e, "incomeRangeId")}
              disabled={isBasic}
              className={`w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] ${isBasic ? "bg-gray-50 opacity-60" : ""}`}
            >
              <option value="">Any Income</option>
              {incomeRanges?.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            {isBasic && (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setShowUpgrade(true)}
              />
            )}
          </div>
        </div>

        {/* Horoscope Filter - Gold only */}
        <div className="pt-2 border-t border-gray-50">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Premium Filters</span>
            {!isGold && <Lock size={12} className="text-purple-400" />}
          </label>

          <div className="relative">
            <div
              className={`space-y-3 ${!isGold ? "opacity-50 blur-[1px]" : ""}`}
            >
              <select
                disabled={!isGold}
                className="w-full rounded-md border-gray-300 text-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD]"
              >
                <option value="">Star / Rasi</option>
                <option>Ashwini</option>
                <option>Bharani</option>
              </select>
            </div>
            {!isGold && (
              <div
                className="absolute inset-0 cursor-pointer flex items-center justify-center"
                onClick={() => setShowUpgrade(true)}
              >
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100 shadow-sm">
                  Unlock Gold Features
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Modal */}
        <UpgradeModal
          isOpen={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => {
            setShowUpgrade(false);
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}
