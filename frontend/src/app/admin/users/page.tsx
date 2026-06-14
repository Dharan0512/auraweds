"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  UserProfile?: {
    approvalStatus: string;
    profileStrength: number;
  };
  Subscriptions?: Array<{
    Plan: { name: string };
    status: string;
  }>;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 401 || res.status === 403) {
        router.push("/");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    if (
      !confirm(
        `Are you sure you want to ${currentStatus ? "suspend" : "activate"} this user?`,
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        },
      );

      if (res.ok) {
        // Optimistic UI update
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, isActive: !currentStatus } : u,
          ),
        );
      } else {
        alert("Failed to update user status.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating user status.");
    }
  };

  return (
    <div className="p-10 text-gray-900 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1f2937]">User Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/50"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page on search
            }}
          />
          <span className="text-sm text-gray-500 font-medium">
            Total Users: {total}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Tier</th>
                <th className="p-4 font-semibold">Approval Status</th>
                <th className="p-4 font-semibold">Active</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6A0DAD]"></div>
                      <span>Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const activeSub = user.Subscriptions?.find(
                    (s) => s.status === "active",
                  );
                  const tierName = activeSub
                    ? activeSub.Plan.name
                    : "Basic Member";
                  const approvalStatus =
                    user.UserProfile?.approvalStatus || "pending";

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName || ""}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: #{user.id}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-900">{user.email}</div>
                        <div className="text-gray-500 text-xs">
                          {user.mobile || "No phone"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            tierName === "Gold"
                              ? "bg-yellow-100 text-yellow-800"
                              : tierName === "Silver"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {tierName}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                            approvalStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : approvalStatus === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {approvalStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.isActive ? (
                          <span className="flex items-center text-green-600 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 hidden sm:block"></span>
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 hidden sm:block"></span>
                            Suspended
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        {/* More actions can be added here like View/Edit */}
                        <button
                          onClick={() =>
                            toggleUserStatus(user.id, user.isActive)
                          }
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                            user.isActive
                              ? "text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
                              : "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                          }`}
                        >
                          {user.isActive ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 font-medium">Page {page}</span>
          <button
            disabled={users.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
