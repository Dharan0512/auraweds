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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Use allSettled so a network failure in one request doesn't reject the
        // whole batch and blank out the cards that did succeed.
        const [statsResult, modResult, reportsResult] = await Promise.allSettled(
          [
            fetch(`${baseUrl}/api/admin/stats`, { headers }),
            fetch(`${baseUrl}/api/admin/moderation/pending`, { headers }),
            fetch(`${baseUrl}/api/admin/reports?page=1&limit=5`, { headers }),
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

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-[#1f2937] mb-8">Overview</h1>

      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Premium Users
          </h3>
          <p className="text-3xl font-bold text-[#6A0DAD]">
            {stats?.paidUsers?.toLocaleString() || "0"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Registered Users
          </h3>
          <p className="text-3xl font-bold text-[#6A0DAD]">
            {stats?.totalUsers?.toLocaleString() || "0"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Pending Approvals
          </h3>
          <p className="text-3xl font-bold text-[#ef4444]">
            {pendingApprovals}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Monthly Revenue
          </h3>
          <p className="text-3xl font-bold text-[#d97706]">
            {formattedRevenue}
          </p>
        </div>
      </div>

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
