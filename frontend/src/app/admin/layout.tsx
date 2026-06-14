"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [pendingCasteRequests, setPendingCasteRequests] = useState(0);
  const [adminDark, setAdminDark] = useState(false);

  // The global `body { zoom: 0.8 }` makes 100vh elements fill only ~80% of the
  // visual viewport, exposing the (dark) body canvas below. Paint the body canvas
  // with the admin surface colour while this layout is mounted so there's no gap.
  useEffect(() => {
    document.body.classList.add("admin-surface");
    return () => {
      document.body.classList.remove("admin-surface", "admin-dark");
    };
  }, []);

  // Restore the saved admin theme preference (defaults to light).
  useEffect(() => {
    setAdminDark(localStorage.getItem("aura_admin_theme") === "dark");
  }, []);

  // Apply / persist the admin theme. Scoped to the admin panel via the
  // `admin-dark` body class — see the admin dark-mode rules in globals.css.
  useEffect(() => {
    document.body.classList.toggle("admin-dark", adminDark);
    localStorage.setItem("aura_admin_theme", adminDark ? "dark" : "light");
  }, [adminDark]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/admin/stats`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stats?.pendingCasteRequests != null) {
          setPendingCasteRequests(data.stats.pendingCasteRequests);
        }
      })
      .catch(() => { });
  }, []);

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", exact: true },
    { label: "User Management", href: "/admin/users" },
    { label: "ID Verifications", href: "/admin/verifications", badge: 12 },

    {
      label: "Caste Requests",
      href: "/admin/caste-requests",
      badge: pendingCasteRequests || undefined,
    },
    { label: "DB Management", href: "/admin/db" },
    { label: "Reported Profiles", href: "/admin/reports" },
    { label: "Success Stories", href: "/admin/success" },

  ];

  return (
    <div className="h-[125vh] bg-gray-50 flex font-sans overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 h-full flex flex-col">
        <div className="h-20 flex items-center px-6">
          <Link
            href="/admin"
            className="text-xl font-bold text-[#6A0DAD] flex items-baseline gap-1"
          >
            AuraWeds{" "}
            <span className="text-gray-400 text-sm font-medium">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg justify-between transition-colors ${isActive
                    ? "bg-[#faf5ff] text-[#6A0DAD]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="bg-[#fee2e2] text-[#ef4444] py-0.5 px-2 text-xs rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setAdminDark((v) => !v)}
            aria-label={`Switch to ${adminDark ? "light" : "dark"} mode`}
            title={`Switch to ${adminDark ? "light" : "dark"} mode`}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <span>{adminDark ? "Dark Mode" : "Light Mode"}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-white">
              <span className="relative h-4 w-4">
                <Sun
                  className="absolute inset-0 h-4 w-4 text-[#d97706] transition-all duration-500"
                  style={{
                    opacity: adminDark ? 0 : 1,
                    transform: adminDark
                      ? "rotate(-90deg) scale(0.5)"
                      : "rotate(0) scale(1)",
                  }}
                />
                <Moon
                  className="absolute inset-0 h-4 w-4 text-[#6A0DAD] transition-all duration-500"
                  style={{
                    opacity: adminDark ? 1 : 0,
                    transform: adminDark
                      ? "rotate(0) scale(1)"
                      : "rotate(90deg) scale(0.5)",
                  }}
                />
              </span>
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
