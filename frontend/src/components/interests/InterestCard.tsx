"use client";

import React from "react";
import {
  Check,
  X,
  User,
  MessageCircle,
  Phone,
  Clock,
  ShieldCheck,
  Lock,
  Star,
  Ban,
} from "lucide-react";
import { Interest } from "@/services/interestService";
import { MatchProfile } from "@/services/matchService";
import { getImageUrl } from "@/lib/utils";
import ConnectButton from "../ui/ConnectButton";

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes";
  return Math.floor(seconds) + " seconds";
}

interface InterestCardProps {
  interest: Interest;
  type: "received" | "sent" | "accepted" | "rejected" | "blocked";
  userTier: string;
  onAction?: (id: string | number, action: "accepted" | "rejected") => void;
  onViewProfile: (userId: string | number) => void;
  onMessage?: (userId: string | number) => void;
  onContact?: (userId: string | number) => void;
  onWithdraw?: (id: string | number) => void;
  onRemove?: (id: string | number) => void;
  onSendReminder?: (id: string | number) => void;
  onBlock?: (id: string | number) => void;
}

export default function InterestCard({
  interest,
  type,
  userTier,
  onAction,
  onViewProfile,
  onMessage,
  onContact,
  onWithdraw,
  onRemove,
  onSendReminder,
  onBlock,
}: InterestCardProps) {
  const profile: MatchProfile = interest.profile;
  const isFree = userTier === "Free";
  const isGold = userTier === "Gold" || userTier === "Elite Gold";
  const isSilver = userTier === "Silver";

  if (!profile) return null;

  const age = profile.basicDetails.dob
    ? new Date().getFullYear() -
      new Date(profile.basicDetails.dob).getFullYear()
    : 25;

  const getStatusBadge = () => {
    switch (interest.status) {
      case "ACCEPTED":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
            <Check size={12} /> Accepted
          </span>
        );
      case "DECLINED":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider border border-rose-500/20">
            <X size={12} /> Declined
          </span>
        );
      case "WITHDRAWN":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-500/20">
            <X size={12} /> Withdrawn
          </span>
        );
      case "BLOCKED":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
            <Ban size={12} /> Blocked
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  const firstName = profile.basicDetails.firstName || "";
  const lastName = profile.basicDetails.lastName || "";

  const name =
    isFree && type === "received"
      ? `${firstName[0] || ""}*** ${lastName ? lastName[0] + "***" : ""}`
      : `${firstName} ${lastName}`.trim();

  const isExpired =
    new Date().getTime() - new Date(interest.createdAt).getTime() >
    5 * 24 * 60 * 60 * 1000;

  return (
    <div
      className={`relative group p-6 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border transition-all duration-700 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ${type === "accepted" ? "border-[#D4AF37]/40 shadow-[#D4AF37]/5 bg-gradient-to-br from-slate-900/60 to-[#D4AF37]/5" : "border-white/10 hover:border-[#D4AF37]/30"}`}
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="flex gap-6">
        {/* Photo Container */}
        <div className="relative shrink-0 w-36 h-36 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
          <img
            src={getImageUrl(profile.photos[0], profile.basicDetails.firstName)}
            alt={profile.basicDetails.firstName}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isFree && type === "received" ? "blur-2xl scale-125 saturate-[0.8]" : ""}`}
          />
          {isFree && type === "received" && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
              <Lock size={24} className="text-[#D4AF37]" />
            </div>
          )}
          {type === "received" && !interest.viewedAt && (
            <div className="absolute top-3 right-3 w-3 h-3 bg-[#D4AF37] rounded-full ring-4 ring-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse"></div>
          )}

          {/* Match Score Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end justify-center pb-2">
            <span className="text-[10px] font-black text-white bg-[#D4AF37] px-2 py-0.5 rounded-full shadow-lg">
              {profile.matchScore}% SYNC
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between mb-3 gap-4">
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-white truncate hover:text-[#D4AF37] transition-colors cursor-pointer">
                    {name}, {age}
                  </h3>
                  {profile.badge?.mobileVerified && (
                    <div className="bg-emerald-500/10 p-1 rounded-full border border-emerald-500/20">
                      <ShieldCheck size={14} className="text-emerald-400" />
                    </div>
                  )}
                  {type === "accepted" && (
                    <div className="bg-[#D4AF37]/10 p-1 rounded-full border border-[#D4AF37]/20">
                      <Star
                        size={14}
                        className="text-[#D4AF37] fill-[#D4AF37]/20"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
                    <User size={12} className="text-slate-500" />
                    {profile.basicDetails.religion}
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
                    📍 {profile.basicDetails.location.split(",")[0]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0 mt-1">
                {new Date().getTime() - new Date(interest.createdAt).getTime() <
                  24 * 60 * 60 * 1000 && (
                  <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    New
                  </span>
                )}
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock size={10} className="text-slate-600" />
                  {timeAgo(new Date(interest.createdAt))}
                </span>
              </div>
            </div>

            {/* Highlights (Optional) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-slate-400 text-[10px] font-medium min-h-[1rem] mb-4">
              {profile.professionalInfo.profession && (
                <span className="flex items-center gap-1">
                  💼 {profile.professionalInfo.profession}
                </span>
              )}
              {profile.professionalInfo.education && (
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  🎓 {profile.professionalInfo.education}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {(type === "sent" || type === "rejected") && (
                <div className="flex items-center gap-3">
                  {getStatusBadge()}
                  {interest.status === "PENDING" && interest.viewedAt && (
                    <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                      <Clock size={10} /> Viewed
                    </span>
                  )}
                </div>
              )}
              {type === "received" && getStatusBadge()}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {type === "received" && interest.status === "PENDING" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onAction?.(interest.id, "accepted")}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] text-[10px] font-black uppercase tracking-widest active:scale-95"
                  >
                    <Check size={14} /> Accept
                  </button>
                  <button
                    onClick={() => onAction?.(interest.id, "rejected")}
                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 active:scale-95"
                    title="Decline Interest"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {type === "sent" && interest.status === "PENDING" && (
                <>
                  <button
                    onClick={() => onWithdraw?.(interest.id)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/5 transition-all text-[10px] font-bold uppercase tracking-widest"
                  >
                    Withdraw
                  </button>
                  {isExpired && (
                    <button
                      onClick={() => onSendReminder?.(interest.id)}
                      disabled={!isGold}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isGold ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20" : "bg-slate-800 text-slate-600 border border-white/5 cursor-not-allowed"}`}
                    >
                      {isGold ? (
                        "Send Reminder"
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Lock size={10} /> Reminder
                        </div>
                      )}
                    </button>
                  )}
                </>
              )}

              {type === "accepted" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onMessage?.(profile.userId)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-[0_4px_15px_rgba(79,70,229,0.4)] transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
                  >
                    <MessageCircle size={14} /> Send Message
                  </button>
                  <button
                    onClick={() => onContact?.(profile.userId)}
                    disabled={!isGold}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border-2 ${isGold ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/20" : "bg-slate-900/60 text-slate-500 border-white/5 cursor-not-allowed opacity-60"}`}
                  >
                    {isGold ? (
                      <>
                        <Phone size={14} /> Call Now
                      </>
                    ) : (
                      <>
                        <Lock size={14} /> Get Contact
                      </>
                    )}
                  </button>
                </div>
              )}

              {type === "rejected" && (
                <button
                  onClick={() => onRemove?.(interest.id)}
                  className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all border border-white/5"
                  title="Remove from list"
                >
                  <X size={18} />
                </button>
              )}

              {(type === "accepted" || type === "received") && onBlock && (
                <button
                  onClick={() => onBlock(interest.id)}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 active:scale-95"
                  title="Block Profile"
                >
                  <Ban size={18} />
                </button>
              )}

              <button
                onClick={() => onViewProfile(profile.userId)}
                className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 transition-all border border-white/5"
                title="View Profile"
              >
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFree && type === "received" && (
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02] -mx-6 -mb-6 px-6 pb-6 rounded-b-[2.5rem]">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Lock size={16} />
            </div>
            <div>
              <p className="text-[11px] text-white font-bold leading-none mb-1">
                Detailed Profile is Locked
              </p>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Upgrade to{" "}
                <span className="text-[#D4AF37] font-bold">
                  Gold Membership
                </span>{" "}
                to reveal details
              </p>
            </div>
          </div>
          <button className="relative group px-5 py-2.5 rounded-full overflow-hidden border border-[#D4AF37]/50 transition-all hover:border-[#D4AF37] active:scale-95">
            <span className="relative z-10 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">
              Upgrade Now
            </span>
            <div className="absolute inset-0 bg-[#D4AF37]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      )}
    </div>
  );
}
