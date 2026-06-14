import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-white text-slate-950 hover:bg-slate-100 shadow-xl",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    outline: "bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] font-black",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-[10px] rounded-lg",
    md: "px-6 py-2.5 text-xs rounded-xl",
    lg: "px-8 py-3.5 text-sm rounded-2xl",
    xl: "px-10 py-4 text-base rounded-[24px]",
  };

  const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Subtle shine effect for primary/gold */}
      {(variant === "primary" || variant === "gold") && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
      
      <span className={`flex items-center gap-2 relative z-10 ${loading ? "opacity-0" : "opacity-100"}`}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}
    </button>
  );
}
