import { useState } from "react";
import { MasterItem } from "@/services/masterService";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock } from "lucide-react";
import UpgradeModal from "@/components/ui/UpgradeModal";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

interface SearchSidebarProps {
  filters: Record<string, string>;
  onChange: (updates: Record<string, string | null>) => void;
  onClear: () => void;
  // Passing master data down for simplicity
  religions?: MasterItem[];
  castes?: MasterItem[];
  subcastes?: MasterItem[];
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
  subcastes,
  education,
  incomeRanges,
}: SearchSidebarProps) {
  const { tier } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isBasic = tier === "Basic Member";
  const isGold = tier === "Gold";

  // Currently selected caste/subcaste objects for the searchable dropdowns.
  const selectedCaste =
    castes?.find((c) => String(c.id) === String(filters.casteId)) || null;
  const selectedSubcaste =
    subcastes?.find((s) => String(s.id) === String(filters.subcasteId)) ||
    null;

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
            onChange={(e) =>
              // Reset caste + sub-caste because they depend on the religion.
              onChange({
                religionId: e.target.value || null,
                casteId: null,
                subcasteId: null,
              })
            }
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

        {/* Caste - searchable, Silver/Gold only */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>Caste</span>
            {isBasic && <Lock size={12} className="text-gray-400" />}
          </label>
          <div className="relative">
            <SearchableDropdown
              theme="light"
              options={castes || []}
              value={selectedCaste}
              onChange={(val) =>
                // Clear sub-caste whenever the caste changes so the
                // sub-caste filter never references a stale caste.
                onChange({
                  casteId: val ? String(val.id) : null,
                  subcasteId: null,
                })
              }
              placeholder={
                filters.religionId ? "Search caste..." : "Select a religion first"
              }
              disabled={isBasic || !filters.religionId}
            />
            {isBasic && (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setShowUpgrade(true)}
              />
            )}
          </div>
        </div>

        {/* Sub-caste - searchable, Silver/Gold only */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>Sub-caste</span>
            {isBasic && <Lock size={12} className="text-gray-400" />}
          </label>
          <div className="relative">
            <SearchableDropdown
              theme="light"
              options={subcastes || []}
              value={selectedSubcaste}
              onChange={(val) =>
                onChange({ subcasteId: val ? String(val.id) : null })
              }
              placeholder={
                filters.casteId ? "Search sub-caste..." : "Select a caste first"
              }
              disabled={isBasic || !filters.casteId}
            />
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
