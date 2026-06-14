"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define shape of our API response for typescript checking
interface DashboardStats {
  totalUsers: number;
  activeUsers7Days: number;
  newSignupsToday: number;
  paidUsers: number;
  revenueToday: string | number;
  tierDistribution: Array<{ tier: string; count: string }>;
}

type CardKey = "premium" | "registered" | "pending" | "revenue";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail table shown when a stat card is clicked.
  const [activeCard, setActiveCard] = useState<CardKey | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login"); // or admin login if separate
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Use allSettled so a network failure in one request doesn't reject the
        // whole batch and blank out the cards that did succeed.
        const [statsResult, modResult, reportsResult] = await Promise.allSettled(
          [
            fetch(`${baseUrl}/admin/stats`, { headers }),
            fetch(`${baseUrl}/admin/moderation/pending`, { headers }),
            fetch(`${baseUrl}/admin/reports?page=1&limit=5`, { headers }),
          ],
        );

        const statsRes =
          statsResult.status === "fulfilled" ? statsResult.value : null;
        const modRes =
          modResult.status === "fulfilled" ? modResult.value : null;
        const reportsRes =
          reportsResult.status === "fulfilled" ? reportsResult.value : null;

        if (statsRes?.status === 401 || statsRes?.status === 403) {
          router.push("/");
          return;
        }

        // Handle each response independently so that a failure in one section
        // (e.g. reports or moderation) does not blank out the others.
        if (statsRes?.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.stats);
        } else {
          console.error("Failed to fetch stats:", statsRes?.status ?? statsResult);
        }

        if (modRes?.ok) {
          const modData = await modRes.json();
          const totalProfiles = modData.profiles?.length || 0;
          const totalPhotos = modData.photos?.length || 0;
          setPendingApprovals(totalProfiles + totalPhotos);
        } else {
          console.error("Failed to fetch moderation data:", modRes?.status ?? modResult);
        }

        if (reportsRes?.ok) {
          const reportsData = await reportsRes.json();
          setRecentReports(reportsData.reports || []);
        } else {
          console.error("Failed to fetch reports:", reportsRes?.status ?? reportsResult);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Fetch the underlying records for whichever card is selected.
  const fetchCardDetails = async (card: CardKey) => {
    setDetailLoading(true);
    setDetailError(null);
    setDetailData(null);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const endpoint: Record<CardKey, string> = {
        premium: `${baseUrl}/admin/users?premium=true&limit=50`,
        registered: `${baseUrl}/admin/users?limit=50`,
        pending: `${baseUrl}/admin/moderation/pending`,
        revenue: `${baseUrl}/admin/payments?limit=50`,
      };

      const res = await fetch(endpoint[card], { headers });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      setDetailData(data);
    } catch (err: any) {
      console.error("Card detail error:", err);
      setDetailError("Could not load data. Please try again.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCardClick = (card: CardKey) => {
    // Toggle off when clicking the already-open card.
    if (activeCard === card) {
      setActiveCard(null);
      setDetailData(null);
      setDetailError(null);
      return;
    }
    setActiveCard(card);
    fetchCardDetails(card);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-10 text-[#6A0DAD]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6A0DAD]"></div>
      </div>
    );
  }

  // Format the revenue into INR
  const formattedRevenue = Number(stats?.revenueToday || 0).toLocaleString(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    },
  );

  const cards: Array<{
    key: CardKey;
    label: string;
    value: string;
    valueClass: string;
  }> = [
    {
      key: "premium",
      label: "Total Premium Users",
      value: stats?.paidUsers?.toLocaleString() || "0",
      valueClass: "text-[#6A0DAD]",
    },
    {
      key: "registered",
      label: "Total Registered Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      valueClass: "text-[#6A0DAD]",
    },
    {
      key: "pending",
      label: "Pending Approvals",
      value: String(pendingApprovals),
      valueClass: "text-[#ef4444]",
    },
    {
      key: "revenue",
      label: "Monthly Revenue",
      value: formattedRevenue,
      valueClass: "text-[#d97706]",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#1f2937] mb-8">Overview</h1>

      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => handleCardClick(card.key)}
            aria-pressed={activeCard === card.key}
            className={`text-left bg-white rounded-xl border p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
              activeCard === card.key
                ? "border-[#6A0DAD] ring-2 ring-[#6A0DAD]/30"
                : "border-gray-100"
            }`}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {card.label}
            </h3>
            <p className={`text-3xl font-bold ${card.valueClass}`}>
              {card.value}
            </p>
            <p className="text-xs text-gray-400 mt-3">
              {activeCard === card.key ? "Hide details" : "Click to view details"}
            </p>
          </button>
        ))}
      </div>

      {activeCard && (
        <div className="mb-10 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1f2937]">
              {cards.find((c) => c.key === activeCard)?.label} — Details
            </h2>
            <button
              onClick={() => setActiveCard(null)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              ✕ Close
            </button>
          </div>

          {detailLoading ? (
            <div className="flex items-center justify-center p-10 text-[#6A0DAD]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6A0DAD]"></div>
            </div>
          ) : detailError ? (
            <div className="p-6 text-sm text-red-500">{detailError}</div>
          ) : (
            <CardDetailTable card={activeCard} data={detailData} />
          )}
        </div>
      )}

      <h2 className="text-lg font-bold text-[#1f2937] mb-4">
        Recent Reports requiring attention
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {recentReports.length > 0 ? (
            recentReports.map((report) => (
              <li
                key={report.id}
                className="p-5 hover:bg-gray-50 flex justify-between items-center transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {report.Reported?.firstName}{" "}
                    {report.Reported?.lastName || ""} reported for:{" "}
                    {report.reason}
                  </p>
                  <p className="text-sm text-gray-500">
                    Reported by {report.Reporter?.firstName}{" "}
                    {report.Reporter?.lastName || ""} (ID: #{report.reporterId}
                    ).
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/admin/reports`)}
                  className="text-sm font-medium text-[#ef4444] border border-[#fca5a5] bg-[#fef2f2] hover:bg-[#fee2e2] px-4 py-1.5 rounded-lg transition-colors"
                >
                  Review
                </button>
              </li>
            ))
          ) : (
            <li className="p-5 text-center text-sm text-gray-500">
              No recent reports requiring attention.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// Renders the appropriate table layout for the selected stat card.
function CardDetailTable({ card, data }: { card: CardKey; data: any }) {
  const thClass =
    "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider";
  const tdClass = "px-6 py-3 text-sm text-gray-700 whitespace-nowrap";

  if (card === "premium" || card === "registered") {
    const users: any[] = data?.users || [];
    if (users.length === 0) {
      return <EmptyRow message="No users found." />;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>ID</th>
              <th className={thClass}>Name</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Mobile</th>
              <th className={thClass}>Plan</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const sub = u.Subscriptions?.[0] || u.Subscription?.[0];
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className={tdClass}>#{u.id}</td>
                  <td className={tdClass}>
                    {u.firstName} {u.lastName || ""}
                  </td>
                  <td className={tdClass}>{u.email || "—"}</td>
                  <td className={tdClass}>{u.mobile || "—"}</td>
                  <td className={tdClass}>{sub?.Plan?.name || "Free"}</td>
                  <td className={tdClass}>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {u.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className={tdClass}>{formatDate(u.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (card === "pending") {
    const profiles: any[] = data?.profiles || [];
    const photos: any[] = data?.photos || [];
    const rows = [
      ...profiles.map((p) => ({
        type: "Profile",
        id: p.id,
        user: p.User,
        when: p.updatedAt || p.createdAt,
      })),
      ...photos.map((p) => ({
        type: "Photo",
        id: p.id,
        user: p.User,
        when: p.updatedAt || p.createdAt,
      })),
    ];
    if (rows.length === 0) {
      return <EmptyRow message="No pending approvals." />;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Type</th>
              <th className={thClass}>ID</th>
              <th className={thClass}>User</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={`${r.type}-${r.id}`} className="hover:bg-gray-50">
                <td className={tdClass}>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                    {r.type}
                  </span>
                </td>
                <td className={tdClass}>#{r.id}</td>
                <td className={tdClass}>
                  {r.user?.firstName} {r.user?.lastName || ""}
                </td>
                <td className={tdClass}>{r.user?.email || "—"}</td>
                <td className={tdClass}>{formatDate(r.when)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Revenue
  const payments: any[] = data?.payments || [];
  if (payments.length === 0) {
    return <EmptyRow message="No payments this month." />;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            <th className={thClass}>Txn ID</th>
            <th className={thClass}>User</th>
            <th className={thClass}>Plan</th>
            <th className={thClass}>Amount</th>
            <th className={thClass}>Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className={tdClass}>
                {p.providerTransactionId || `#${p.id}`}
              </td>
              <td className={tdClass}>
                {p.User?.firstName} {p.User?.lastName || ""}
              </td>
              <td className={tdClass}>{p.Subscription?.Plan?.name || "—"}</td>
              <td className={tdClass}>
                {Number(p.amount || 0).toLocaleString("en-IN", {
                  style: "currency",
                  currency: p.currency || "INR",
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className={tdClass}>{formatDate(p.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyRow({ message }: { message: string }) {
  return <div className="p-6 text-center text-sm text-gray-500">{message}</div>;
}

function formatDate(value?: string | Date | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
