"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function LandingFooter() {
  const links = {
    platform: [
      { name: "How It Works", href: "#" },
      { name: "Membership", href: "#" },
      { name: "Verified Profiles", href: "#" },
      { name: "Success Stories", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Press", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Safety Tips", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 relative z-10">
        {/* Brand Section */}
        <div className="space-y-6">
          <Logo size="lg" />
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            The world's most exclusive matrimony platform for those who desire 
            a life partner beyond the swipe.
          </p>
          <div className="flex gap-4">
             {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
             ))}
          </div>
        </div>

        {/* Links Sections */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white underline decoration-gold/40 underline-offset-8">
              {title}
            </h4>
            <ul className="space-y-4">
               {items.map((link) => (
                 <li key={link.name}>
                   <Link href={link.href} className="text-slate-500 hover:text-gold transition-colors text-sm font-medium">
                     {link.name}
                   </Link>
                 </li>
               ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
        <p>© {new Date().getFullYear()} AuraWeds Premium Matrimony. All Rights Reserved.</p>
        <div className="flex gap-8">
           <Link href="#" className="hover:text-white">Terms of Honor</Link>
           <Link href="#" className="hover:text-white">Privacy Circle</Link>
           <Link href="#" className="hover:text-white">Data Protection</Link>
        </div>
      </div>
    </footer>
  );
}
