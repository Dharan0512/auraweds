"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { profileService } from "@/services/profileService";
import {
  X,
  Camera,
  User,
  Briefcase,
  Home,
  Heart,
  MapPin,
  LogOut,
  Edit2,
  Trash2,
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  Settings,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Mail,
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import UpgradeModal from "./UpgradeModal";
import "./ProfileModal.css";
import EditProfileForm from "../../features/profile/EditProfileForm";
import { authService } from "@/services/authService";
import { getImageUrl, calculateAge } from "@/lib/utils";
import ImagePreviewModal from "./ImagePreviewModal";
import ImageCropperModal from "./ImageCropperModal";
import { useTheme } from "@/contexts/ThemeContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export default function ProfileModal({
  isOpen,
  onClose,
  userId,
}: ProfileModalProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { tier } = useSubscription();
  const { theme, setTheme } = useTheme();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isViewingContact, setIsViewingContact] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("about");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState({
    loading: false,
  });
  const [privacySaving, setPrivacySaving] = useState(false);

  // New features state
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title?: string;
    showDownload?: boolean;
  } | null>(null);
  const [croppingImage, setCroppingImage] = useState<{
    url: string;
    type: "photo" | "horoscope";
    id?: number;
    aspect?: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = userId
        ? await profileService.getOtherProfile(userId)
        : await profileService.getMyProfile(true);
      setProfile(data);
    } catch (error) {
      console.error("Fetch profile error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-200">
            Are you sure you want to delete this photo?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const promise = profileService.deletePhoto(photoId);
                  toast.promise(promise, {
                    loading: "Deleting photo...",
                    success: "Photo deleted",
                    error: "Failed to delete photo",
                  });
                  await promise;
                  fetchProfile();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCroppingImage({ url: reader.result as string, type: "photo" });
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input
  };

  const handleHoroscopeFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCroppingImage({ url: reader.result as string, type: "horoscope" });
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // Reset input
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    if (!croppingImage) return;

    const formData = new FormData();
    const fileName =
      croppingImage.type === "photo" ? "profile_photo.jpg" : "horoscope.jpg";
    formData.append(
      croppingImage.type === "photo" ? "photo" : "horoscope",
      croppedBlob,
      fileName,
    );

    try {
      if (croppingImage.type === "photo") {
        // If we're editing an existing photo, delete the old one first
        if (croppingImage.id) {
          await profileService.deletePhoto(croppingImage.id);
        }
        const promise = profileService.uploadPhotos(formData);
        toast.promise(promise, {
          loading: "Saving photo...",
          success: "Photo saved!",
          error: "Failed to save photo",
        });
        await promise;
      } else {
        const promise = profileService.uploadHoroscope(formData);
        toast.promise(promise, {
          loading: "Saving horoscope...",
          success: "Horoscope saved!",
          error: "Failed to save horoscope",
        });
        await promise;
      }
      fetchProfile();
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setCroppingImage(null);
    }
  };

  const handleDeleteHoroscope = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-200">
            Delete your horoscope chart?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const promise = profileService.deleteHoroscope();
                  toast.promise(promise, {
                    loading: "Deleting horoscope...",
                    success: "Horoscope deleted",
                    error: "Failed to delete horoscope",
                  });
                  await promise;
                  fetchProfile();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handlePrivacyChange = async (key: string, value: boolean) => {
    try {
      setPrivacySaving(true);
      const currentSettings = profile.profile?.privacySettings || {};
      const newSettings = { ...currentSettings, [key]: value };
      await profileService.updatePrivacySettings({
        privacySettings: newSettings,
      });
      setProfile({
        ...profile,
        profile: { ...profile.profile, privacySettings: newSettings },
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to update privacy settings.");
    } finally {
      setPrivacySaving(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    try {
      setPrivacySaving(true);
      await profileService.updatePrivacySettings({ profileVisibility: status });
      setProfile({
        ...profile,
        profile: { ...profile.profile, profileVisibility: status },
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to update profile status.");
    } finally {
      setPrivacySaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ loading: true });
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      setPasswordStatus({ loading: false });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setPasswordStatus({ loading: false });
      return;
    }
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordStatus({ loading: false });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
      setPasswordStatus({ loading: false });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="profile-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : profile && isEditing ? (
          <EditProfileForm
            profile={profile}
            onSave={() => {
              setIsEditing(false);
              fetchProfile();
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : profile ? (
          <>
            <div className="profile-hero">
              <img
                src={getImageUrl(
                  profile.photos?.[0]?.url || profile.photos?.[0],
                  profile.user?.firstName,
                )}
                alt={profile.user?.firstName}
                className="profile-hero-image"
              />
              <div className="profile-hero-gradient"></div>

              {!userId && profile.photos?.[0] && (
                <div className="hero-action-overlay">
                  <button
                    className="hero-action-btn"
                    title="Preview Cover"
                    onClick={() =>
                      setPreviewImage({
                        url: getImageUrl(
                          profile.photos?.[0]?.url || profile.photos?.[0],
                          profile.user?.firstName,
                        ),
                        title: "Cover Photo",
                        showDownload: true,
                      })
                    }
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="hero-action-btn"
                    title="Crop / Edit Cover"
                    onClick={() =>
                      setCroppingImage({
                        url: getImageUrl(
                          profile.photos?.[0]?.url || profile.photos?.[0],
                          profile.user?.firstName,
                        ),
                        type: "photo",
                        id: profile.photos?.[0]?.id,
                        aspect: 21 / 9,
                      })
                    }
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="hero-action-btn delete"
                    title="Delete Cover"
                    onClick={() => {
                      const photoId = profile.photos?.[0]?.id;
                      if (photoId) handleDeletePhoto(photoId);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
              <div className="profile-hero-info">
                <h2 className="profile-name">
                  {profile.user?.firstName} {profile.user?.lastName}
                </h2>
                <div className="profile-badges">
                  <span className="badge">
                    {profile.user?.gender},{" "}
                    {profile.profile?.dob
                      ? calculateAge(profile.profile.dob)
                      : "28"}{" "}
                    yrs
                  </span>
                  <span className="badge">
                    {profile.profile?.Religion?.name}
                  </span>
                </div>
                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                  {profile.profile?.linkedInUrl && (
                    <a
                      href={profile.profile.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {profile.profile?.instagramUrl && (
                    <a
                      href={profile.profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {profile.profile?.facebookUrl && (
                    <a
                      href={profile.profile.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4AF37] transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                </div>
              </div>
              {!userId && (
                <button
                  className="absolute bottom-6 right-8 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 rounded-2xl font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center space-x-2 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={16} className="text-slate-900" />
                  <span>Add Photo</span>
                </button>
              )}
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex px-8 border-b border-white/10 gap-8 mt-2 overflow-x-auto custom-scrollbar">
              {(userId
                ? ["about", "background", "astrology", "partner"]
                : ["about", "background", "astrology", "partner", "manage"]
              ).map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? "text-[#D4AF37] border-[#D4AF37]"
                      : "text-slate-400 border-transparent hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "manage" ? (
                    <span className="flex items-center gap-2">
                      <Settings size={16} /> Manage
                    </span>
                  ) : (
                    tab
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="profile-content pt-6">
              {activeTab === "about" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Photo Gallery */}
                  <div>
                    <div className="section-title">
                      <Camera size={20} /> Photo Gallery
                    </div>
                    <div className="photo-gallery">
                      {profile.photos && profile.photos.length > 0 ? (
                        profile.photos.map((photo: any, idx: number) => {
                          const photoUrl = getImageUrl(
                            photo.url || photo,
                            profile.user?.firstName,
                          );
                          return (
                            <div key={idx} className="gallery-item">
                              <img
                                src={photoUrl}
                                alt={`Gallery ${idx}`}
                                className=""
                              />
                              <div className="gallery-item-overlay">
                                <button
                                  className="action-btn action-btn-preview"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewImage({
                                      url: photoUrl,
                                      title: `Photo ${idx + 1}`,
                                      showDownload: !userId, // Only allow download if it's the own profile
                                    });
                                  }}
                                >
                                  <Eye size={12} /> Preview
                                </button>
                                {!userId && (
                                  <>
                                    <button
                                      className="action-btn action-btn-edit"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCroppingImage({
                                          url: photoUrl,
                                          type: "photo",
                                          id: photo.id,
                                        });
                                      }}
                                    >
                                      <Edit2 size={12} /> Edit
                                    </button>
                                    <button
                                      className="action-btn action-btn-delete"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (photo.id)
                                          handleDeletePhoto(photo.id);
                                      }}
                                    >
                                      <Trash2 size={12} /> Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-slate-500 italic text-sm py-4">
                          No gallery photos yet. Add some to stand out!
                        </div>
                      )}
                      <div
                        className="add-photo-btn"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera size={24} />
                        <span className="text-xs">Add photo</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {profile.profile?.shortBio && (
                    <div>
                      <div className="section-title">
                        <User size={20} /> About Me
                      </div>
                      <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 text-slate-300 italic text-sm leading-relaxed">
                        "{profile.profile.shortBio}"
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Details */}
                    <div>
                      <div className="section-title">
                        <User size={20} /> Personal Info
                      </div>
                      <div className="details-grid grid-cols-1 gap-y-3">
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Full Name</span>
                          <span className="detail-value">
                            {profile.user?.firstName} {profile.user?.lastName}
                          </span>
                        </div>
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Date of Birth</span>
                          <span className="detail-value">
                            {profile.profile?.dob}
                          </span>
                        </div>
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Height</span>
                          <span className="detail-value">
                            {profile.profile?.heightCm} cm
                          </span>
                        </div>
                        <div className="detail-item justify-between">
                          <span className="detail-label">Marital Status</span>
                          <span className="detail-value">
                            {profile.profile?.maritalStatus}
                          </span>
                        </div>
                        {profile.profile?.maritalStatus !== "Never Married" && (
                          <>
                            <div className="detail-item justify-between border-t border-white/5 pt-2">
                              <span className="detail-label">Children</span>
                              <span className="detail-value">
                                {profile.profile?.childrenCount || 0}
                              </span>
                            </div>
                            <div className="detail-item justify-between">
                              <span className="detail-label">Living With</span>
                              <span className="detail-value">
                                {profile.profile?.childrenLivingWith
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Location & Lifestyle */}
                    <div>
                      <div className="section-title">
                        <MapPin size={20} /> Lifestyle & Location
                      </div>
                      <div className="details-grid grid-cols-1 gap-y-3">
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Current City</span>
                          <span className="detail-value">
                            {profile.profile?.LocationLifestyle?.city ||
                              "Not specified"}
                          </span>
                        </div>
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Diet</span>
                          <span className="detail-value">
                            {profile.profile?.LocationLifestyle?.diet ||
                              "Not specified"}
                          </span>
                        </div>
                        <div className="detail-item justify-between border-b border-white/5 pb-2">
                          <span className="detail-label">Smoking</span>
                          <span className="detail-value">
                            {profile.profile?.LocationLifestyle?.smoke || "No"}
                          </span>
                        </div>
                        <div className="detail-item justify-between">
                          <span className="detail-label">Drinking</span>
                          <span className="detail-value">
                            {profile.profile?.LocationLifestyle?.drink || "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information - Only for other profiles */}
                  {userId && (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="section-title">
                        <Phone size={20} className="text-[#D4AF37]" /> Contact
                        Information
                      </div>

                      <div className="p-6 bg-slate-900/60 rounded-3xl border border-[#D4AF37]/20 relative overflow-hidden group">
                        {profile.user?.mobile || profile.user?.email ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                <Phone size={18} />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                  Mobile Number
                                </p>
                                <p className="text-white font-medium flex items-center gap-2">
                                  {profile.user?.mobile?.includes('X') && <Lock size={14} className="text-[#D4AF37]" />}
                                  {profile.user?.mobile || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                <Mail size={18} />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                  Email Address
                                </p>
                                <p className="text-white font-medium">
                                  {profile.user.email || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 relative z-10">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
                              <Lock size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-2">
                              Contact Details Locked
                            </h4>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                              {tier === "Basic Member"
                                ? "Basic members cannot view contact details. Upgrade to Silver or Gold to unlock contact access."
                                : tier === "Silver"
                                  ? "You have reached your limit of 10 contact views per month. Upgrade to Gold for unlimited access!"
                                  : "Contact details are hidden by the user or requires a higher tier."}
                            </p>
                            <button
                              onClick={() => setShowUpgrade(true)}
                              className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-black uppercase tracking-wider rounded-2xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 mx-auto mt-4 text-xs"
                            >
                              Upgrade Now to Unlock
                            </button>
                          </div>
                        )}

                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "background" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Religion Section */}
                  <div>
                    <div className="section-title">
                      <Heart size={20} /> Religion & Ethnicity
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Religion</span>
                        <span className="detail-value">
                          {profile.profile?.Religion?.name || "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Caste / Sub-caste</span>
                        <span className="detail-value">
                          {profile.profile?.Caste?.name || "Open"} /{" "}
                          {profile.profile?.subcaste || "Open"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Mother Tongue</span>
                        <span className="detail-value">
                          {profile.profile?.MotherTongue?.name || "English"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Section */}
                  <div>
                    <div className="section-title">
                      <Briefcase size={20} /> Education & Career
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Highest Education</span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.highestEducation ||
                            profile.profile?.Education?.name ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">
                          College / Institution
                        </span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.college ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Profession</span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.designation ||
                            profile.profile?.Occupation?.name ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Company</span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.companyName ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Employment Type</span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.employmentType ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Annual Income</span>
                        <span className="detail-value">
                          {profile.profile?.EducationCareer?.incomeRange ||
                            profile.profile?.IncomeRange?.displayLabel ||
                            "Confidential"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Family Roots Section */}
                  <div>
                    <div className="section-title">
                      <Home size={20} /> Family Roots
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Father's Name</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.fatherName ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">
                          Father's Occupation
                        </span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.fatherOccupation ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Mother's Name</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.motherName ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">
                          Mother's Occupation
                        </span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.motherOccupation ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Family Type</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.familyType ||
                            "Nuclear"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Family Status</span>
                        <span className="detail-value">
                          {profile.profile?.familyStatus || "Middle Class"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Siblings</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.siblingsCount || 0}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Own House</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.ownHouse
                            ? "Yes"
                            : "No"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Native District</span>
                        <span className="detail-value">
                          {profile.profile?.FamilyDetail?.nativeDistrict ||
                            "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "astrology" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Horoscope Section */}
                  <div>
                    <div className="section-title">
                      <Sparkles size={20} className="text-amber-400" />{" "}
                      Horoscope & Astrology
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Star (Nakshatram)</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.Star?.name ||
                            profile.profile?.HoroscopeDetail?.star ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Rasi</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.Rasi?.name ||
                            profile.profile?.HoroscopeDetail?.rasi ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Laknam</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.Laknam?.name ||
                            profile.profile?.HoroscopeDetail?.laknam ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Gothram</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.Gothram?.name ||
                            profile.profile?.HoroscopeDetail?.gothram ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Sevvai Dosham</span>
                        <span className="detail-value text-amber-500 font-bold">
                          {profile.profile?.HoroscopeDetail?.sevvaiDhosham ||
                            "No"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Rahu Ketu Dosham</span>
                        <span className="detail-value text-amber-500 font-bold">
                          {profile.profile?.HoroscopeDetail?.rahuKetuDhosham ||
                            "No"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Birth Time</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.birthTime ||
                            "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Birth Place</span>
                        <span className="detail-value">
                          {profile.profile?.HoroscopeDetail?.BirthCity?.name ||
                            profile.profile?.HoroscopeDetail?.birthPlace ||
                            "Not specified"}
                        </span>
                      </div>
                    </div>

                    {profile.profile?.HoroscopeDetail?.horoscopeImageUrl && (
                      <div className="mt-8">
                        <span className="section-title mb-6">
                          <Eye size={20} /> Horoscope Chart
                        </span>
                        <div className="horoscope-chart-container group cursor-pointer">
                          <img
                            src={getImageUrl(
                              profile.profile.HoroscopeDetail.horoscopeImageUrl,
                            )}
                            alt="Horoscope Chart"
                            className="horoscope-chart-image"
                          />
                          <div className="horoscope-chart-overlay">
                            <button
                              className="action-btn action-btn-preview"
                              onClick={() =>
                                setPreviewImage({
                                  url: getImageUrl(
                                    profile.profile.HoroscopeDetail
                                      .horoscopeImageUrl,
                                  ),
                                  title: "Horoscope Chart",
                                })
                              }
                            >
                              <Eye size={14} /> Preview
                            </button>
                            {!userId && (
                              <>
                                <button
                                  className="action-btn action-btn-edit"
                                  onClick={() =>
                                    setCroppingImage({
                                      url: getImageUrl(
                                        profile.profile.HoroscopeDetail
                                          .horoscopeImageUrl,
                                      ),
                                      type: "horoscope",
                                    })
                                  }
                                >
                                  <Edit2 size={14} /> Edit
                                </button>
                                <button
                                  className="action-btn action-btn-delete"
                                  onClick={handleDeleteHoroscope}
                                >
                                  <Trash2 size={14} /> Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {!userId &&
                      !profile.profile?.HoroscopeDetail?.horoscopeImageUrl && (
                        <div className="mt-8">
                          <label className="w-full h-40 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37]/50 transition-all bg-slate-900/40 group">
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleHoroscopeFileSelect}
                              accept="image/*"
                            />
                            <Camera
                              size={32}
                              className="text-slate-600 mb-3 group-hover:text-[#D4AF37] transition-colors"
                            />
                            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-300">
                              Upload Horoscope Chart
                            </span>
                          </label>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {activeTab === "partner" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Preferences Section */}
                  <div>
                    <div className="section-title">
                      <Heart size={20} className="text-[#D4AF37]" /> Partner
                      Preferences
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Age Range</span>
                        <span className="detail-value">
                          {profile.preferences?.minAge} -{" "}
                          {profile.preferences?.maxAge} years
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Height Range</span>
                        <span className="detail-value">
                          {profile.preferences?.minHeightCm}cm -{" "}
                          {profile.preferences?.maxHeightCm}cm
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Marital Status</span>
                        <span className="detail-value">
                          {profile.preferences?.maritalStatus || "Any"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">
                          Religion Preference
                        </span>
                        <span className="detail-value">
                          {profile.preferences?.Religion?.name || "Any"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Preferred Location</span>
                        <span className="detail-value">
                          {profile.preferences?.partnerLocationPreference ||
                            profile.preferences?.City?.name ||
                            "Open to any"}
                        </span>
                      </div>
                      {profile.preferences?.partnerCastes &&
                        Array.isArray(profile.preferences.partnerCastes) &&
                        profile.preferences.partnerCastes.length > 0 && (
                          <div className="detail-item col-span-full">
                            <span className="detail-label">
                              Preferred Caste(s)
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile.preferences.partnerCastes.map(
                                (caste: string) => (
                                  <span
                                    key={caste}
                                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-full text-xs"
                                  >
                                    {caste === "any" ? "Any Caste" : caste}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "manage" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Interface Theme Selection */}
                  <div>
                    <div className="section-title">
                      <Sparkles
                        size={20}
                        className="text-[var(--accent-color)]"
                      />{" "}
                      Interface Theme
                    </div>
                    <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
                      <p className="text-sm text-slate-400 mb-6 font-medium">
                        Personalize your AuraWeds experience with a premium
                        interface theme.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme("theme-violet")}
                          className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
                            theme === "theme-violet"
                              ? "bg-purple-600/10 border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                              : "bg-slate-800/40 border-white/5 hover:border-white/20"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                              theme === "theme-violet"
                                ? "bg-purple-500 text-white"
                                : "bg-slate-700 text-slate-400"
                            }`}
                          >
                            <Sparkles size={24} />
                          </div>
                          <div className="text-center">
                            <h4
                              className={`text-sm font-bold ${theme === "theme-violet" ? "text-white" : "text-slate-400"}`}
                            >
                              Violet Tech
                            </h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-black">
                              Default
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => setTheme("theme-gold")}
                          className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
                            theme === "theme-gold"
                              ? "bg-amber-600/10 border-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                              : "bg-slate-800/40 border-white/5 hover:border-white/20"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                              theme === "theme-gold"
                                ? "bg-amber-500 text-black"
                                : "bg-slate-700 text-slate-400"
                            }`}
                          >
                            <Sparkles size={24} />
                          </div>
                          <div className="text-center">
                            <h4
                              className={`text-sm font-bold ${theme === "theme-gold" ? "text-white" : "text-slate-400"}`}
                            >
                              Royal Gold
                            </h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-black">
                              Elite
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Visibility */}
                  <div>
                    <div className="section-title">
                      <Eye size={20} className="text-[var(--accent-color)]" />{" "}
                      Profile Visibility & Privacy
                    </div>

                    <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
                      <div className="flex items-center justify-between pb-6 border-b border-white/10">
                        <div>
                          <h4 className="text-white font-medium">
                            Profile Status
                          </h4>
                          <p className="text-sm text-slate-400">
                            Control who can see your profile
                          </p>
                        </div>
                        <select
                          className="bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#D4AF37] transition-colors"
                          value={profile.profile?.profileVisibility || "Public"}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          disabled={privacySaving}
                        >
                          <option value="Public">Public (Everyone)</option>
                          <option value="Members Only">Members Only</option>
                          <option value="Hidden">Hidden (Invisible)</option>
                        </select>
                      </div>

                      {[
                        {
                          key: "showHoroscope",
                          label: "Show Horoscope",
                          desc: "Display your astrology chart and details",
                        },
                        {
                          key: "showAstroMatch",
                          label: "Show Astro Match",
                          desc: "Allow others to see horoscope compatibility",
                        },
                        {
                          key: "showExactIncome",
                          label: "Show Exact Income",
                          desc: "Display your precise salary digits",
                        },
                        {
                          key: "showFamilyDetails",
                          label: "Show Family Details",
                          desc: "Display parents occupations and siblings",
                        },
                        {
                          key: "showBirthDetails",
                          label: "Show Birth Details",
                          desc: "Display exact birth time and place",
                        },
                        {
                          key: "showSocialLinks",
                          label: "Show Social Links",
                          desc: "Display your Instagram/LinkedIn/Facebook",
                        },
                        {
                          key: "showValues",
                          label: "Show Values Ratings",
                          desc: "Display your ambition and personality scales",
                        },
                      ].map((setting) => {
                        // Default to true for most, false for exact income (matching backend default)
                        const isChecked =
                          profile.profile?.privacySettings?.[setting.key] ??
                          setting.key !== "showExactIncome";
                        return (
                          <div
                            key={setting.key}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <h4 className="text-white text-sm font-medium">
                                {setting.label}
                              </h4>
                              <p className="text-xs text-slate-400">
                                {setting.desc}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isChecked}
                                onChange={(e) =>
                                  handlePrivacyChange(
                                    setting.key,
                                    e.target.checked,
                                  )
                                }
                                disabled={privacySaving}
                              />
                              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div>
                    <div className="section-title">
                      <Lock size={20} className="text-slate-300" /> Change
                      Password
                    </div>

                    <form
                      onSubmit={handlePasswordChange}
                      className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4 max-w-lg"
                    >
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 tracking-wider uppercase">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 tracking-wider uppercase">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          required
                          minLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 tracking-wider uppercase">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                          minLength={6}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={passwordStatus.loading}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors disabled:opacity-50 mt-2"
                      >
                        {passwordStatus.loading
                          ? "Updating..."
                          : "Update Password"}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {!userId && (
                <div className="mt-8 flex justify-center pt-8 border-t border-white/5">
                  <button
                    className="premium-btn px-12 py-4 text-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit My Profile
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-slate-900/40">
            <User size={64} className="text-slate-700 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-white">
              Profile Not Found
            </h3>
            <p className="text-slate-500 mt-2 max-w-xs">
              We couldn't load your profile. Please try logging in again to
              refresh your session.
            </p>
            <button
              className="mt-8 premium-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Global Preview Modal */}
        <ImagePreviewModal
          isOpen={!!previewImage}
          onClose={() => setPreviewImage(null)}
          imageUrl={previewImage?.url || ""}
          title={previewImage?.title}
          showDownload={previewImage?.showDownload}
        />

        {/* Global Cropper Modal */}
        {croppingImage && (
          <ImageCropperModal
            isOpen={!!croppingImage}
            onClose={() => setCroppingImage(null)}
            imageSrc={croppingImage.url}
            aspect={
              croppingImage.aspect ||
              (croppingImage.type === "photo" ? 4 / 5 : 1 / 1)
            }
            onCropComplete={handleCropComplete}
          />
        )}
        {/* Upgrade Modal */}
        <UpgradeModal
          isOpen={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => {
            setShowUpgrade(false);
            fetchProfile();
          }}
        />
      </div>
    </div>
  );
}
