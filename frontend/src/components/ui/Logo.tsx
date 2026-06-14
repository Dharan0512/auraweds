import React from "react";
import { Infinity as InfinityIcon } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  iconClassName = "",
  textClassName = "",
  showText = true,
  href = "/",
  size = "md",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "w-8 h-8 rounded-lg",
      icon: "w-5 h-5",
      text: "text-xs",
    },
    md: {
      container: "w-10 h-10 rounded-xl",
      icon: "w-6 h-6",
      text: "text-sm",
    },
    lg: {
      container: "w-12 h-12 rounded-2xl",
      icon: "w-7 h-7",
      text: "text-base",
    },
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className={`flex items-center gap-3 transition-transform duration-300 group ${className}`}>
      <div
        className={`${currentSize.container} bg-gradient-to-br from-[#D4AF37] to-purple-600 flex items-center justify-center text-slate-950 shadow-lg group-hover:scale-110 group-hover:shadow-[#D4AF37]/20 transition-all ${iconClassName}`}
      >
        <InfinityIcon className={currentSize.icon} />
      </div>
      {showText && (
        <span
          className={`font-serif font-bold text-white tracking-[0.2em] uppercase ${currentSize.text} ${textClassName}`}
        >
          AuraWeds
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
