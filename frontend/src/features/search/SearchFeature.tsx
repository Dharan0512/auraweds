"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { searchService } from "@/services/searchService";
import {
  useReligions,
  useCastes,
  useSubcastes,
  useCountries,
  useStates,
} from "@/hooks/useMasterData";
import SearchSidebar from "./SearchSidebar";
import SearchResults from "./SearchResults";

export default function SearchFeature() {
  const { filters, debouncedFilters, updateFilters, clearFilters } =
    useSearchFilters();

  // Master Data API hooks
  const { data: religions } = useReligions();
  const { data: castes } = useCastes(filters.religionId || null);
  const { data: subcastes } = useSubcastes(filters.casteId || null);
  const { data: countries } = useCountries();
  const { data: states } = useStates(filters.countryId || null);

  // Search API hook
  const { data: searchResponse, isLoading } = useQuery({
    queryKey: ["search", debouncedFilters],
    queryFn: () => searchService.searchProfiles(debouncedFilters),
    // Keep previous data while fetching new to prevent flicker
    placeholderData: (previousData) => previousData,
  });

  const handleSendInterest = async (profileId: string) => {
    try {
      // NOTE: Send interest API call
      // await interestService.sendInterest(profileId);
      toast.success(
        `Interest sent successfully to AW${profileId.substring(0, 6).toUpperCase()}`,
      );
    } catch (e) {
      toast.error("Failed to send interest. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF7F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Discover Matches
          </h1>
          <p className="mt-2 text-gray-600">
            {searchResponse?.meta?.total || 0} profiles found based on your
            preferences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <SearchSidebar
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
                religions={religions}
                castes={castes}
                subcastes={subcastes}
                countries={countries}
                states={states}
              />
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Pagination / Sorting could go here above results */}
            <div className="mb-4 flex justify-between items-center text-sm text-gray-500">
              <span>Showing {searchResponse?.data?.length || 0} results</span>
              {/* Sort dropdown could go here */}
            </div>

            <SearchResults
              isLoading={isLoading}
              results={searchResponse?.data}
              onSendInterest={handleSendInterest}
            />

            {/* Bottom Pagination */}
            {searchResponse?.meta && searchResponse.meta.totalPages > 1 && (
              <div className="mt-8 flex justify-center space-x-2">
                {/* Prev Button */}
                <button
                  disabled={searchResponse.meta.page === 1}
                  onClick={() =>
                    updateFilters({
                      page: String(searchResponse.meta.page - 1),
                    })
                  }
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page Indicator */}
                <span className="px-4 py-2 text-sm text-gray-700 border border-transparent">
                  Page {searchResponse.meta.page} of{" "}
                  {searchResponse.meta.totalPages}
                </span>

                {/* Next Button */}
                <button
                  disabled={
                    searchResponse.meta.page === searchResponse.meta.totalPages
                  }
                  onClick={() =>
                    updateFilters({
                      page: String(searchResponse.meta.page + 1),
                    })
                  }
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
