import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "ghost";
}

export const Card = ({
  children,
  className = "",
  variant = "glass",
  ...props
}: CardProps) => {
  const variants = {
    glass: "bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl",
    solid: "bg-slate-900 border border-white/5 shadow-xl",
    ghost: "bg-transparent border border-white/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden group ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Subtle Inner Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-gold/5 pointer-events-none" />
      
      {/* Animated Shine Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
