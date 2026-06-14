"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/admin/reports?page=${page}&limit=${limit}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.status === 401 || res.status === 403) return router.push("/");

        if (!res.ok) throw new Error("Failed to fetch reports");

        const data = await res.json();
        setReports(data.reports);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [page, router]);

  return (
    <div className="p-10 font-sans text-gray-900">
      <h1 className="text-2xl font-bold text-[#1f2937] mb-8">
        Reported Profiles
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between">
          <span className="text-sm text-gray-500 font-medium">
            Total Reports: {total}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Reported User</th>
                <th className="p-4 font-semibold">Reported By</th>
                <th className="p-4 font-semibold">Reason</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6A0DAD]"></div>
                      <span>Loading reports...</span>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No reports found.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-red-600">
                        {report.Reported?.firstName}{" "}
                        {report.Reported?.lastName || ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: #{report.reportedId}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">
                        {report.Reporter?.firstName}{" "}
                        {report.Reporter?.lastName || ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: #{report.reporterId}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-700 max-w-sm break-words">
                        {report.reason}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      {/* Navigates to user management to suspend */}
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/users?search=${encodeURIComponent(report.Reported?.email || "")}`,
                          )
                        }
                        className="text-xs font-medium px-4 py-1.5 rounded-lg border border-[#6A0DAD]/30 text-[#6A0DAD] bg-purple-50 hover:bg-purple-100 transition-colors"
                      >
                        Action
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
