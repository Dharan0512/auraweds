"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "caste" | "subcaste";

interface RequestRow {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  User?: { firstName: string; lastName: string; email: string };
  Religion?: { id: number; name: string };
  Caste?: { id: number; name: string };
}

interface Candidate {
  id: number;
  name: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminCasteRequestsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("caste");
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [mergeRowId, setMergeRowId] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [mergeTargetId, setMergeTargetId] = useState<string>("");

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setMergeRowId(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await fetch(
        `${API_BASE}/api/admin/${tab}-requests?status=Pending`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.status === 401 || res.status === 403) {
        router.push("/");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tab, router]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const act = async (
    id: number,
    action: "approve" | "reject",
  ) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/admin/${tab}-requests/${id}/${action}`,
        { method: "PATCH", headers: authHeaders() },
      );
      if (!res.ok) throw new Error("Action failed");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      alert("Action failed. Please try again.");
    }
  };

  const openMerge = async (row: RequestRow) => {
    setMergeRowId(row.id);
    setMergeTargetId("");
    setCandidates([]);
    try {
      const url =
        tab === "caste"
          ? `${API_BASE}/api/master/castes?religion_id=${row.Religion?.id}`
          : `${API_BASE}/api/master/subcastes?caste_id=${row.Caste?.id}`;
      const res = await fetch(url);
      const data = await res.json();
      setCandidates(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const submitMerge = async (id: number) => {
    if (!mergeTargetId) {
      alert("Select an existing value to merge into.");
      return;
    }
    try {
      const body =
        tab === "caste"
          ? { casteId: Number(mergeTargetId) }
          : { subcasteId: Number(mergeTargetId) };
      const res = await fetch(
        `${API_BASE}/api/admin/${tab}-requests/${id}/merge`,
        {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) throw new Error("Merge failed");
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setMergeRowId(null);
    } catch (error) {
      console.error(error);
      alert("Merge failed. Please try again.");
    }
  };

  const tabBtn = (value: Tab, label: string) => (
    <button
      onClick={() => setTab(value)}
      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
        tab === value
          ? "bg-[#6A0DAD] text-white"
          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-10 text-gray-900 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1f2937]">
          Caste & Sub-caste Requests
        </h1>
      </div>

      <div className="flex gap-3 mb-6">
        {tabBtn("caste", "Caste Requests")}
        {tabBtn("subcaste", "Sub-caste Requests")}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Requested Name</th>
                <th className="p-4 font-semibold">
                  {tab === "caste" ? "Religion" : "Caste"}
                </th>
                <th className="p-4 font-semibold">Requested By</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6A0DAD]"></div>
                      <span>Loading requests...</span>
                    </div>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No pending requests.
                  </td>
                </tr>
              ) : (
                requests.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50/50 transition-colors align-top"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {row.name}
                    </td>
                    <td className="p-4 text-gray-700">
                      {tab === "caste"
                        ? row.Religion?.name || "—"
                        : row.Caste?.name || "—"}
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">
                        {row.User
                          ? `${row.User.firstName} ${row.User.lastName || ""}`
                          : "Unknown"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {row.User?.email}
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {mergeRowId === row.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={mergeTargetId}
                            onChange={(e) => setMergeTargetId(e.target.value)}
                            className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs"
                          >
                            <option value="">Select existing…</option>
                            {candidates.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => submitMerge(row.id)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setMergeRowId(null)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => act(row.id, "approve")}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openMerge(row)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            Merge
                          </button>
                          <button
                            onClick={() => act(row.id, "reject")}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
