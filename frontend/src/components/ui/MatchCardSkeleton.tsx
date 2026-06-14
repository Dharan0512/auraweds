import React from "react";

export default function MatchCardSkeleton() {
  return (
    <div className="theme-card flex flex-col border border-[var(--border)] rounded-[2.5rem] overflow-hidden animate-pulse">
      {/* Photo Area */}
      <div className="relative h-[20rem] m-2.5 overflow-hidden rounded-[2rem] bg-[var(--surface-2)]">
        {/* Top Badge Placeholder */}
        <div className="absolute top-5 right-5 w-24 h-9 bg-[var(--surface-hover)] rounded-full" />

        {/* Bottom Text Area */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="w-3/4 h-9 bg-[var(--surface-hover)] rounded-lg" />
          <div className="w-1/2 h-4 bg-[var(--surface-hover)] rounded-lg" />
        </div>
      </div>

      {/* Details & Actions Area */}
      <div className="px-5 pb-6 pt-2">
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="w-16 h-7 bg-[var(--surface-2)] rounded-lg" />
          <div className="w-20 h-7 bg-[var(--surface-2)] rounded-lg" />
        </div>

        <div className="flex gap-3">
          <div className="w-[50px] h-[50px] bg-[var(--surface-2)] rounded-2xl" />
          <div className="flex-1 h-[50px] bg-[var(--surface-2)] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
