import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full group">
        {label && (
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within:text-gold/80">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full bg-slate-900/40 border-b-2 border-white/5 py-4 px-1 text-white placeholder:text-slate-700 
              focus:outline-none focus:border-gold/50 focus:bg-slate-900/60
              transition-all duration-300 font-medium text-base
              ${error ? "border-rose-500/50" : "hover:border-white/10"}
              ${className}
            `}
            {...props}
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold/80 to-purple-500/80 group-focus-within:w-full transition-all duration-500" />
        </div>
        {(error || helperText) && (
          <p className={`text-[10px] uppercase font-bold tracking-widest ml-1 ${error ? "text-rose-400" : "text-slate-600"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
