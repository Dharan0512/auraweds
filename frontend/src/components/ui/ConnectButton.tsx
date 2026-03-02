"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Lock, Check, Loader2, Heart } from "lucide-react";

interface ConnectButtonProps {
  isPremiumUser?: boolean;
  hasSentInterest?: boolean;
  isLoading?: boolean;
  connectLimitReached?: boolean;
  onConnect: () => void;
  className?: string;
}

/**
 * Premium Connect CTA Button for AuraWeds
 * Zero-dependency version with custom SVG heart burst animation
 */
export default function ConnectButton({
  isPremiumUser = false,
  hasSentInterest = false,
  isLoading = false,
  connectLimitReached = false,
  onConnect,
  className = "",
}: ConnectButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleConnect = async () => {
    if (hasSentInterest || isLoading) return;

    if (!isPremiumUser && connectLimitReached) {
      onConnect();
      return;
    }

    try {
      await onConnect();

      // Trigger success animation
      setIsSuccess(true);
      setShowHearts(true);

      // Reset animations
      setTimeout(() => setShowHearts(false), 1000);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  // Determine button state and styles
  const isLocked = !isPremiumUser && connectLimitReached;
  const isDisabled = hasSentInterest || isLoading;

  let buttonText = "Connect";
  let buttonStyles =
    "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]";
  let icon = <Sparkles className="w-4 h-4 mr-2" />;

  if (isLocked) {
    buttonText = "Upgrade";
    buttonStyles =
      "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]";
    icon = <Lock className="w-3.5 h-3.5 mr-1.5" />;
  } else if (isLoading) {
    buttonText = "Sending";
    icon = <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />;
  } else if (hasSentInterest) {
    buttonText = "Sent";
    buttonStyles =
      "bg-emerald-500/10 text-emerald-500 cursor-not-allowed border border-emerald-500/20";
    icon = <Check className="w-3.5 h-3.5 mr-1.5" />;
  } else if (isSuccess) {
    buttonText = "Done";
    buttonStyles =
      "bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-105";
    icon = <Check className="w-3.5 h-3.5 mr-1.5 animate-bounce" />;
  } else {
    // Default state pulse to attract attention
    icon = <Sparkles className="w-3.5 h-3.5 mr-1.5" />;
    buttonStyles += " animate-pulse-subtle";
  }

  return (
    <div className={`relative group isolate ${className}`}>
      {/* Heart Burst Particles (Zero Dependency) */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-heart-burst"
              style={
                {
                  "--angle": `${i * 45}deg`,
                  "--delay": `${i * 0.05}s`,
                  "--distance": "80px",
                } as React.CSSProperties
              }
            >
              <Heart className="w-4 h-4 text-red-500 fill-current opacity-0" />
            </div>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {!isDisabled && !isLocked && !isSuccess && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[200px] px-3 py-2 bg-slate-900 border border-white/10 text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl z-[100] text-center leading-relaxed">
          Express interest to start your matchmaking journey.
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}

      <button
        type="button"
        onClick={handleConnect}
        disabled={isDisabled && !isLocked}
        aria-label={buttonText}
        className={`
          flex items-center justify-center h-[50px] w-full px-4 rounded-2xl
          text-white font-black uppercase tracking-[0.15em] text-[10px]
          transition-all duration-300 ease-out
          active:scale-95 transform
          ${!isDisabled && !isSuccess ? "hover:-translate-y-0.5" : ""}
          ${buttonStyles}
        `}
      >
        {icon}
        <span>{buttonText}</span>
      </button>

      <style jsx global>{`
        @keyframes heartBurst {
          0% {
            transform: rotate(var(--angle)) translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle))
              translateY(calc(-1 * var(--distance))) scale(1);
            opacity: 0;
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 35px rgba(168, 85, 247, 0.4);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        .animate-heart-burst {
          animation: heartBurst 0.8s ease-out forwards;
          animation-delay: var(--delay);
        }
        .animate-heart-burst svg {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
