"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { interestService, Interest } from "@/services/interestService";
import { User, Check, X } from "lucide-react";
import { getImageUrl, calculateAge } from "@/lib/utils";

export default function MatchList() {
  const queryClient = useQueryClient();

  // Fetch received interests
  const { data: interestData, isLoading } = useQuery({
    queryKey: ["interests", "received"],
    queryFn: () => interestService.getInterests("received"),
  });

  // Accept Mutation
  const acceptMutation = useMutation({
    mutationFn: (id: string | number) => interestService.accept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interests", "received"] });
      alert("Interest accepted! You can now chat with them.");
    },
    onError: () => alert("Failed to accept interest."),
  });

  // Decline Mutation
  const declineMutation = useMutation({
    mutationFn: (id: string | number) => interestService.decline(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interests", "received"] });
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const pendingInterests = interestData?.interests || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">
        Received Interests
      </h2>

      {pendingInterests.length === 0 ? (
        <div className="bg-slate-900/40 rounded-xl border border-white/5 p-12 text-center text-slate-500">
          <p>No pending interests right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingInterests.map((interest) => {
            const profile = interest.profile;
            return (
              <div
                key={interest.id}
                className="bg-slate-900/40 p-6 rounded-xl border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                    {profile?.photos?.[0] ? (
                      <img
                        src={getImageUrl(
                          profile.photos[0],
                          profile.basicDetails?.firstName,
                        )}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white hover:text-[#D4AF37] cursor-pointer inline-block transition-colors">
                      {profile?.basicDetails?.firstName || "Member"}{" "}
                      {profile?.basicDetails?.lastName || ""}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {calculateAge(profile?.basicDetails?.dob)} yrs •{" "}
                      {profile?.basicDetails?.location || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Received:{" "}
                      {new Date(interest.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => declineMutation.mutate(interest.id)}
                    disabled={
                      declineMutation.isPending || acceptMutation.isPending
                    }
                    className="p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors disabled:opacity-50"
                    title="Decline"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => acceptMutation.mutate(interest.id)}
                    disabled={
                      declineMutation.isPending || acceptMutation.isPending
                    }
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-full shadow-sm hover:brightness-110 transition-all flex items-center disabled:opacity-50"
                  >
                    <Check className="w-4 h-4 mr-1" /> Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
