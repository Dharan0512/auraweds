import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const FormContainer = ({ children, className = "", id }: FormContainerProps) => {
  return (
    <div id={id} className={`w-full max-w-lg mx-auto relative ${className}`}>
      {/* Background Animated Glows (Chat-style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold/5 rounded-full blur-[80px] animate-pulse delay-700 pointer-events-none" />
      
      <div className="relative z-10 transition-all duration-700">
        {children}
      </div>
    </div>
  );
};
