import { SearchResultProfile } from "@/services/searchService";
import { User, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface SearchResultsProps {
  isLoading: boolean;
  results?: SearchResultProfile[];
  onSendInterest: (profileId: string) => void;
}

export default function SearchResults({
  isLoading,
  results,
  onSendInterest,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-4 rounded-xl shadow-sm border border-purple-50 h-[340px]"
          >
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-purple-50 p-12 text-center text-gray-500">
        <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No profiles found</h3>
        <p className="mt-1">
          Try adjusting your filters to broaden your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {results.map((profile) => (
        <div
          key={profile.id}
          className="bg-white rounded-xl shadow-sm border border-purple-50 overflow-hidden hover:shadow-md transition-shadow group"
        >
          {/* Profile Image (Placeholder for now) */}
          <div className="h-48 bg-purple-100 flex items-center justify-center relative overflow-hidden">
            {profile.profilePicUrl ? (
              <img
                src={getImageUrl(profile.profilePicUrl, profile.firstName)}
                alt={profile.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-purple-300" />
            )}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-[#6A0DAD]">
              ID: AW{profile.id.substring(0, 6).toUpperCase()}
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-5 flex flex-col justify-between h-[200px]">
            <div>
              <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#6A0DAD] transition-colors line-clamp-1">
                {profile.firstName} {profile.lastName}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {profile.age} yrs • {profile.height} cm • {profile.religionName}
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {profile.occupation || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {profile.education || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {profile.city}, {profile.state}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onSendInterest(profile.id)}
              className="mt-4 w-full bg-purple-50 text-[#6A0DAD] border border-purple-100 font-medium py-2 rounded-lg hover:bg-[#6A0DAD] hover:text-white transition-colors text-sm"
            >
              Send Interest
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
