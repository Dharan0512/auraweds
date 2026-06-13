"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { MasterDataProvider } from "@/context/MasterDataContext";
import ProfileModal from "@/components/ui/ProfileModal";
import {
  User,
  LogOut,
  Search as SearchIcon,
  Star,
  MessageSquare,
  Infinity as InfinityIcon,
} from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import { getImageUrl } from "@/lib/utils";
import UpgradeModal from "@/components/ui/UpgradeModal";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import { ThemeToggle, ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Matches", Icon: InfinityIcon },
  { href: "/search", label: "Search", Icon: SearchIcon },
  { href: "/interests", label: "Interests", Icon: Star },
  { href: "/chat", label: "Messages", Icon: MessageSquare },
];

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [subStatus, setSubStatus] = useState<SubscriptionStatusResponse | null>(
    null,
  );
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
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

    const getProfileData = async () => {
      try {
        const data = await profileService.getMyProfile();
        setProfile(data);
      } catch (err) {
        // Silent fail
      }
    };

    const fetchSubStatus = async () => {
      try {
        const data = await subscriptionService.getStatus();
        setSubStatus(data);
      } catch (err) {
        console.error("Failed to fetch sub status", err);
      }
    };

    getProfileData();
    fetchSubStatus();

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userNameInitial = profile?.user?.firstName
    ? profile.user.firstName[0].toUpperCase()
    : "D";

  return (
    <MasterDataProvider>
      <div
        className="relative min-h-screen"
        style={{ background: "var(--app-bg)", color: "var(--text)" }}
      >
        {/* Ambient theme-aware background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -left-[10%] h-[45%] w-[45%] rounded-full blur-[130px] animate-pulse"
            style={{ background: "var(--app-grad-1)" }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] h-[45%] w-[45%] rounded-full blur-[130px] animate-pulse"
            style={{ background: "var(--app-grad-2)", animationDelay: "0.7s" }}
          />
          <div
            className="absolute top-[30%] right-[20%] h-[30%] w-[30%] rounded-full blur-[120px]"
            style={{ background: "var(--app-grad-3)" }}
          />
        </div>

        {/* Navigation */}
        <nav
          className="sticky top-0 z-50 border-b backdrop-blur-xl"
          style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Brand */}
                <Link
                  href="/dashboard"
                  className="flex-shrink-0 flex items-center gap-2.5"
                >
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg"
                    style={{ backgroundImage: "var(--accent-gradient)" }}
                  >
                    <InfinityIcon className="h-5 w-5" />
                  </span>
                  <span
                    className="font-serif text-lg font-bold tracking-tight"
                    style={{ color: "var(--text)" }}
                  >
                    Aura<span style={{ color: "var(--accent-2)" }}> Weds</span>
                  </span>
                </Link>

                <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
                  {NAV_ITEMS.map(({ href, label, Icon }) => {
                    const active = isActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="group relative inline-flex items-center gap-2 rounded-xl px-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
                        style={{
                          color: active ? "var(--text)" : "var(--text-muted)",
                        }}
                      >
                        <Icon
                          className="h-4 w-4 transition-colors"
                          style={{
                            color: active
                              ? "var(--accent-2)"
                              : "var(--text-subtle)",
                          }}
                        />
                        {label}
                        <span
                          className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full transition-all duration-300"
                          style={{
                            background: active ? "var(--accent-2)" : "transparent",
                          }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center gap-3">
                {/* Only Basic members see an upgrade CTA (Silver is top tier until Gold launches) */}
                {subStatus?.tier === "Basic Member" && (
                  <button
                    onClick={() => setIsUpgradeModalOpen(true)}
                    className="relative group overflow-hidden rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,#ead08a,#c9a227,#b08a20)",
                      color: "#1a1206",
                    }}
                  >
                    <span className="relative z-10">Upgrade to Silver</span>
                    <div className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full skew-x-12" />
                  </button>
                )}

                <ThemeToggle />
                <NotificationBell />

                {/* Profile dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    data-testid="profile-menu"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="group relative rounded-full p-0.5 transition-all duration-300 focus:outline-none"
                    style={{ backgroundImage: "var(--accent-gradient)" }}
                  >
                    <div
                      className="h-9 w-9 overflow-hidden rounded-full flex items-center justify-center font-black"
                      style={{
                        background: "var(--surface-solid)",
                        color: "var(--text)",
                      }}
                    >
                      {profile?.photos?.[0] ? (
                        <img
                          src={getImageUrl(
                            profile.photoUrl ||
                              profile.photos?.[0]?.url ||
                              profile.photos?.[0],
                            profile.user?.firstName,
                          )}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{userNameInitial}</span>
                      )}
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-3 w-64 rounded-2xl py-2 focus:outline-none animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 z-50"
                      style={{
                        background: "var(--surface-solid)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--card-shadow)",
                      }}
                    >
                      <div
                        className="px-4 py-3 mb-1 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-subtle)]">
                          Account
                        </p>
                        <p className="text-sm font-medium truncate text-[var(--text)]">
                          {profile?.user?.email || "Welcome back"}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex items-center w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-[var(--surface-hover)] text-[var(--text-muted)]"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                          style={{ background: "var(--accent-soft-bg)" }}
                        >
                          <User size={16} style={{ color: "var(--accent)" }} />
                        </div>
                        My Profile
                      </button>

                      <div
                        className="my-1.5 border-t"
                        style={{ borderColor: "var(--border)" }}
                      />
                      <ThemeSwitcher />
                      <div
                        className="my-1.5 border-t"
                        style={{ borderColor: "var(--border)" }}
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-[var(--surface-hover)]"
                        style={{ color: "var(--danger)" }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                          style={{ background: "rgba(244,63,94,0.12)" }}
                        >
                          <LogOut size={16} />
                        </div>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile controls */}
              <div className="flex items-center gap-2 sm:hidden">
                <ThemeToggle />
                <NotificationBell />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="rounded-full p-0.5"
                  style={{ backgroundImage: "var(--accent-gradient)" }}
                >
                  <div
                    className="h-8 w-8 overflow-hidden rounded-full flex items-center justify-center text-sm font-black"
                    style={{
                      background: "var(--surface-solid)",
                      color: "var(--text)",
                    }}
                  >
                    {profile?.photos?.[0] ? (
                      <img
                        src={getImageUrl(
                          profile.photoUrl ||
                            profile.photos?.[0]?.url ||
                            profile.photos?.[0],
                          profile.user?.firstName,
                        )}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{userNameInitial}</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile nav + dropdown */}
          {isDropdownOpen && (
            <div
              className="sm:hidden border-t px-3 py-3"
              style={{ borderColor: "var(--border)", background: "var(--surface-solid)" }}
            >
              <ThemeSwitcher />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsProfileModalOpen(true);
                  }}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold"
                  style={{ background: "var(--surface-2)", color: "var(--text)" }}
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold"
                  style={{ background: "rgba(244,63,94,0.12)", color: "var(--danger)" }}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
          <div className="sm:hidden border-t" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-around px-2 py-1.5">
              {NAV_ITEMS.map(({ href, label, Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-semibold"
                    style={{
                      color: active ? "var(--accent-2)" : "var(--text-muted)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">{children}</main>

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />

        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          onSuccess={() => {
            setIsUpgradeModalOpen(false);
            subscriptionService.getStatus().then(setSubStatus);
          }}
        />
      </div>
    </MasterDataProvider>
  );
}
