"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminVerificationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"profiles" | "photos">("profiles");
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/moderation/pending`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.status === 401 || res.status === 403) return router.push("/");

      const data = await res.json();
      setProfiles(data.profiles || []);
      setPhotos(data.photos || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (
    type: "profile" | "photo",
    id: number,
    action: "approve" | "reject",
    reason?: string,
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/moderation/${type}/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reason ? { reason } : {}),
        },
      );

      if (res.ok) {
        if (type === "profile") {
          setProfiles(profiles.filter((p) => p.id !== id));
        } else {
          setPhotos(photos.filter((p) => p.id !== id));
        }
      } else {
        alert(`Failed to ${action} ${type}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error updating ${type}`);
    }
  };

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold text-[#1f2937] mb-6">
        ID Verifications & Pending Approvals
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("profiles")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "profiles"
              ? "border-[#6A0DAD] text-[#6A0DAD]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Profiles ({profiles.length})
        </button>
        <button
          onClick={() => setActiveTab("photos")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "photos"
              ? "border-[#6A0DAD] text-[#6A0DAD]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Photos ({photos.length})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6A0DAD]"></div>
            <span>Loading pending approvals...</span>
          </div>
        ) : activeTab === "profiles" ? (
          // Profiles Table
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">User Details</th>
                  <th className="p-4 font-semibold">Profile Strength</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {profiles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      No pending profiles.
                    </td>
                  </tr>
                ) : (
                  profiles.map((profile) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">
                          {profile.User?.firstName}{" "}
                          {profile.User?.lastName || ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          {profile.User?.email}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div
                              className="bg-[#6A0DAD] h-2 rounded-full"
                              style={{ width: `${profile.profileStrength}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-600">
                            {profile.profileStrength}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() =>
                            handleAction("profile", profile.id, "approve")
                          }
                          className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 font-medium text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt("Enter rejection reason:");
                            if (reason)
                              handleAction(
                                "profile",
                                profile.id,
                                "reject",
                                reason,
                              );
                          }}
                          className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 font-medium text-xs"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // Photos Table
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">User Details</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {photos.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      No pending photos.
                    </td>
                  </tr>
                ) : (
                  photos.map((photo) => (
                    <tr key={photo.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        {/* Using img for raw external urls safely rendered by admin */}
                        <img
                          src={photo.url}
                          alt="Review"
                          onClick={() => setPreviewPhoto(photo.url)}
                          className="w-16 h-16 object-cover rounded shadow-sm border cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">
                          {photo.User?.firstName} {photo.User?.lastName || ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          {photo.isMain
                            ? "Main/Display Photo"
                            : "Gallery Photo"}
                        </p>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() =>
                            handleAction("photo", photo.id, "approve")
                          }
                          className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 font-medium text-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleAction("photo", photo.id, "reject")
                          }
                          className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 font-medium text-xs"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewPhoto(null);
              }}
              className="absolute -top-10 right-0 lg:-right-10 text-white hover:text-gray-300 p-2 text-3xl font-bold transition-colors"
            >
              &times;
            </button>
            <img
              src={previewPhoto}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
