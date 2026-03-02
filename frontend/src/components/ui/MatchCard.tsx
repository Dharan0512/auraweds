"use client";

import React from "react";
import { MatchProfile } from "@/services/matchService";
import { getImageUrl, calculateAge } from "@/lib/utils";

interface MatchCardProps {
  match: MatchProfile;
  onViewProfile: (userId: string | number) => void;
  onConnect: (userId: string | number) => void;
  isLocked?: boolean;
}

export default function MatchCard({
  match,
  onViewProfile,
  onConnect,
  isLocked = false,
}: MatchCardProps) {
  const age = calculateAge(match.basicDetails.dob);

  return (
    <div className="group relative flex flex-col bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-all duration-500">
      <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative h-[28rem] m-3 overflow-hidden rounded-[2rem]">
        <img
          src={getImageUrl(match.photos?.[0], match.basicDetails.firstName)}
          alt={match.basicDetails.firstName}
          className={`h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isLocked ? "blur-md" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Match Score Badge */}
        {!isLocked && (
          <div className="absolute top-5 right-5 z-20">
            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 flex items-center rounded-full text-xs font-black text-white shadow-2xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-2 animate-pulse"></span>
              {match.matchScore}% SYNC
            </div>
          </div>
        )}

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
        <div className="flex gap-3">
          <button
            className="flex-1 bg-slate-800/40 hover:bg-slate-800/60 text-slate-200 text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all active:scale-95 outline-none"
            onClick={() => onViewProfile(match.userId)}
          >
            Profile
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl hover:shadow-purple-500/20 hover:brightness-110 active:scale-95 transition-all outline-none"
            onClick={() => onConnect(match.userId)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
