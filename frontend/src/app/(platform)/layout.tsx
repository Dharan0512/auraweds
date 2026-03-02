"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchApi } from "@/lib/api";
import { MasterDataProvider } from "@/context/MasterDataContext";
import ProfileModal from "@/components/ui/ProfileModal";
import { User, LogOut } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    const getProfile = async () => {
      try {
        const data = await fetchApi("/profile/me");
        setProfile(data);
      } catch (err) {
        // Silent fail
      }
    };
    getProfile();

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userNameInitial = profile?.basicDetails?.name
    ? profile.basicDetails.name[0].toUpperCase()
    : "D";
  return (
    <MasterDataProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        {/* Navigation */}
        <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    href="/dashboard"
                    className="text-3xl font-serif font-bold tracking-tight bg-gradient-to-r from-white via-white to-[#D4AF37] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
                  >
                    Aura<span className="text-[#D4AF37]">Weds</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-10 sm:flex sm:space-x-10">
                  <Link
                    href="/dashboard"
                    className={`${
                      isActive("/dashboard")
                        ? "border-[#D4AF37] text-white"
                        : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide transition-all duration-300`}
                  >
                    Matches
                  </Link>
                  <Link
                    href="/search"
                    className={`${
                      isActive("/search")
                        ? "border-[#D4AF37] text-white"
                        : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
                  >
                    Search
                  </Link>
                  <Link
                    href="/interests"
                    className={`${
                      isActive("/interests")
                        ? "border-[#D4AF37] text-white"
                        : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
                  >
                    Interests
                  </Link>
                  <Link
                    href="/chat"
                    className={`${
                      isActive("/chat")
                        ? "border-[#D4AF37] text-white"
                        : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
                  >
                    Messages
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
                <button className="relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95">
                  <span className="relative z-10">Upgrade to Gold</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative" ref={dropdownRef}>
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="group relative p-0.5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black overflow-hidden relative">
                        {profile?.photos?.[0] ? (
                          <img
                            src={getImageUrl(
                              profile.photos[0]?.url || profile.photos[0],
                              profile.basicDetails?.name,
                            )}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-transparent bg-gradient-to-br from-white to-slate-400 bg-clip-text">
                            {userNameInitial}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl py-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 z-50">
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                          Account
                        </p>
                        <p className="text-sm font-medium text-white truncate">
                          {profile?.user?.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors">
                          <User size={16} className="text-purple-400" />
                        </div>
                        My Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center mr-3 group-hover:bg-rose-500/20 transition-colors">
                          <LogOut size={16} />
                        </div>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">{children}</main>

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </MasterDataProvider>
  );
}
