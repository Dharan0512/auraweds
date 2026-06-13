"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [pendingCasteRequests, setPendingCasteRequests] = useState(0);

  // The global `body { zoom: 0.8 }` makes 100vh elements fill only ~80% of the
  // visual viewport, exposing the (dark) body canvas below. Paint the body canvas
  // with the admin surface colour while this layout is mounted so there's no gap.
  useEffect(() => {
    document.body.classList.add("admin-surface");
    return () => document.body.classList.remove("admin-surface");
  }, []);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/stats`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stats?.pendingCasteRequests != null) {
          setPendingCasteRequests(data.stats.pendingCasteRequests);
        }
      })
      .catch(() => {});
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
    { label: "Reported Profiles", href: "/admin/reports" },
    { label: "Success Stories", href: "/admin/success" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0">
        <div className="h-20 flex items-center px-6">
          <Link
            href="/admin"
            className="text-xl font-bold text-[#6A0DAD] flex items-baseline gap-1"
          >
            AuraWeds{" "}
            <span className="text-gray-400 text-sm font-medium">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg justify-between transition-colors ${
                  isActive
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
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
