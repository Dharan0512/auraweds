"use client";

import { useState, useEffect } from "react";
import { matchService } from "@/services/matchService";
import { MatchProfile } from "@/services/matchService";
import { formatTimeAgo } from "@/lib/dateUtils";
import { User, MapPin, Calendar, Heart } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

export default function WhoViewedPage() {
  const [viewers, setViewers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgradeRequired, setUpgradeRequired] = useState<string | null>(null);

  useEffect(() => {
    const fetchViewers = async () => {
      try {
        const data: any = await matchService.getViewers();
        if (data.upgradeRequired) {
          setUpgradeRequired(data.upgradeRequired);
        } else {
          setViewers(data);
        }
      } catch (error) {
        console.error("Error fetching viewers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchViewers();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (upgradeRequired) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-3xl max-w-2xl mx-auto shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Heart className="w-10 h-10 text-slate-950" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-6">
            Premium Feature
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            See exactly who is checking out your profile! This feature is
            available for
            <span className="text-[#D4AF37] font-bold">
              {" "}
              {upgradeRequired}{" "}
            </span>{" "}
            members and above.
          </p>
          <button className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-10 py-3 rounded-2xl font-black uppercase tracking-wider text-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95">
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Recent Visitors
          </h1>
          <p className="text-slate-500 font-medium">
            People who viewed your profile recently
          </p>
        </div>
        <div className="bg-slate-900/50 border border-white/10 px-6 py-3 rounded-2xl">
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest mr-3">
            Total Views
          </span>
          <span className="text-[#D4AF37] text-2xl font-black">
            {viewers.length}
          </span>
        </div>
      </div>

      {viewers.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-white/10">
          <User className="w-16 h-16 text-slate-700 mx-auto mb-6 opacity-20" />
          <p className="text-slate-500 text-lg font-medium">
            No one has viewed your profile yet. Keep your profile updated!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {viewers.map((view, idx) => (
            <div
              key={idx}
              className="group bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="relative h-48">
                <img
                  src={getImageUrl(
                    view.profile.basicDetails.photos?.[0],
                    view.profile.basicDetails.firstName,
                  )}
                  alt={view.profile.basicDetails.firstName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {view.profile.basicDetails.firstName}
                  </h2>
                </div>
                <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-tighter border border-white/5">
                  {formatTimeAgo(view.viewedAt)}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {view.profile.basicDetails.age} years
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {view.profile.basicDetails.city || "NP"}
                  </div>
                </div>
                <Link
                  href={`/user/${view.profile.userId}`}
                  className="block w-full text-center py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all duration-300 border border-white/5 hover:border-white/20"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
