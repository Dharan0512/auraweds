"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
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
  Edit2,
  Trash2,
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  Settings,
  Lock,
  Eye,
  Phone,
  BadgeCheck,
  GraduationCap,
  Wine,
  Globe,
  Star,
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

/* ------------------------------------------------------------------ */
/* Presentational helpers (defined module-level to avoid re-creation)  */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Reveals its children with a soft fade/slide as they enter the scroll viewport. */
function Reveal({
  children,
  root,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  root: React.RefObject<HTMLElement>;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root, once: true, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="aw-shead">
      <span className="aw-shead-ic">{icon}</span>
      <div>
        <div className="aw-shead-tt">{title}</div>
        {subtitle && <div className="aw-shead-sub">{subtitle}</div>}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="aw-detail">
      <span className="aw-detail-l">{label}</span>
      <span className={`aw-detail-v${accent ? " accent" : ""}`}>{value}</span>
    </div>
  );
}

function CompletionRing({ value }: { value: number }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="aw-completion" title={`Profile ${value}% complete`}>
      <div className="aw-completion-label">
        Profile
        <b>{value}%</b>
      </div>
      <svg className="aw-ring" width="40" height="40" viewBox="0 0 40 40">
        <circle
          className="aw-ring-track"
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
        />
        <circle
          className="aw-ring-fill"
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
}

const TABS_OWN = ["about", "background", "astrology", "partner", "manage"];
const TABS_OTHER = ["about", "background", "astrology", "partner"];

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
  const [activeTab, setActiveTab] = useState<string>("about");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState({
    loading: false,
  });
  const [privacySaving, setPrivacySaving] = useState(false);

  // Hero parallax — driven by the scroll container's scrollTop.
  const scrollMv = useMotionValue(0);
  const heroY = useTransform(scrollMv, [0, 300], [0, 60]);
  const heroScale = useTransform(scrollMv, [0, 300], [1, 1.16]);
  const heroFade = useTransform(scrollMv, [0, 220], [1, 0.35]);

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
      setActiveTab("about");
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

  /* ----- derived display data (only when profile is present) ----- */
  const p = profile?.profile || {};
  const u = profile?.user || {};
  const photos: any[] = profile?.photos || [];
  const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Member";
  const gender = u.gender || p.basicDetails?.gender || "—";
  const dob = p.dob || p.basicDetails?.dob;
  const age = dob ? calculateAge(dob) : "—";
  const religion = p.Religion?.name || p.basicDetails?.religion || "Other";
  const motherTongue = p.MotherTongue?.name;
  const city =
    p.City?.name ||
    p.LocationLifestyle?.city ||
    p.basicDetails?.location ||
    "India";
  const diet = p.LocationLifestyle?.diet || p.lifestyle?.diet;
  const smoke = p.LocationLifestyle?.smoke || p.lifestyle?.smoke;
  const drink = p.LocationLifestyle?.drink || p.lifestyle?.drink;
  // Caste name comes through as an association (own profile) or a flat
  // serialized string (other members), so read both shapes.
  const caste = p.Caste?.name || p.basicDetails?.caste;
  const subcaste = p.subcaste || p.basicDetails?.subcaste;
  const physicalStatus = p.physicalStatus || p.basicDetails?.physicalStatus;
  const education =
    p.EducationCareer?.highestEducation ||
    p.Education?.name ||
    p.professionalInfo?.highestEducation;
  const designation =
    p.EducationCareer?.designation ||
    p.Occupation?.name ||
    p.professionalInfo?.designation;
  const company =
    p.EducationCareer?.companyName || p.professionalInfo?.companyName;
  const incomeRange =
    p.EducationCareer?.incomeRange ||
    p.IncomeRange?.displayLabel ||
    p.professionalInfo?.incomeRange;
  const heightCm = p.heightCm || p.basicDetails?.heightCm;
  const verified = !!(
    profile?.badge?.mobileVerified ||
    profile?.isVerified ||
    u.isVerified
  );
  const bio = p.shortBio;
  const lookingFor = p.partnerExpectations || p.lookingFor;

  // profile completion (mirrors the dashboard checklist)
  const checklist = [
    !!u.firstName,
    photos.length > 0,
    !!(designation || education),
    !!(profile?.preferences || profile?.partnerPreferences),
    verified,
  ];
  const completion = profile
    ? Math.round((checklist.filter(Boolean).length / checklist.length) * 100)
    : 0;

  // compatibility highlight chips (skip empties)
  const highlights = [
    religion && { icon: <Heart size={13} />, label: religion },
    motherTongue && { icon: <Globe size={13} />, label: motherTongue },
    education && { icon: <GraduationCap size={13} />, label: education },
    city && { icon: <MapPin size={13} />, label: city },
    diet && { icon: <Wine size={13} />, label: diet },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  const tabs = userId ? TABS_OTHER : TABS_OWN;

  const heroBg = getImageUrl(
    photos?.[0]?.url || photos?.[0],
    u.firstName,
  );
  const avatarUrl = getImageUrl(photos?.[0]?.url || photos?.[0], u.firstName);

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Profile"
      >
        <button
          className="profile-modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-2)]"></div>
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
          <div
            className="aw-scroll"
            ref={scrollRef}
            onScroll={(e) => scrollMv.set(e.currentTarget.scrollTop)}
          >
            {/* ---------------- Cinematic hero ---------------- */}
            <div className="aw-hero">
              <motion.div
                className="aw-hero-bg"
                style={{
                  backgroundImage: `url("${heroBg}")`,
                  y: heroY,
                  scale: heroScale,
                  opacity: heroFade,
                }}
              />
              <div className="aw-hero-tint" />

              {!userId && photos?.[0] && (
                <div className="aw-hero-actions">
                  <button
                    className="hero-action-btn"
                    title="Preview cover"
                    onClick={() =>
                      setPreviewImage({
                        url: heroBg,
                        title: "Cover Photo",
                        showDownload: true,
                      })
                    }
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="hero-action-btn"
                    title="Crop / edit cover"
                    onClick={() =>
                      setCroppingImage({
                        url: heroBg,
                        type: "photo",
                        id: photos?.[0]?.id,
                        aspect: 21 / 9,
                      })
                    }
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="hero-action-btn delete"
                    title="Delete cover"
                    onClick={() => {
                      const photoId = photos?.[0]?.id;
                      if (photoId) handleDeletePhoto(photoId);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {!userId && (
                <button
                  className="aw-cover-add"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={15} />
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

            {/* ---------------- Identity band ---------------- */}
            <div className="aw-identity">
              <motion.div
                className="aw-avatar-wrap"
                whileHover={{ scale: 1.035, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() =>
                  setPreviewImage({
                    url: avatarUrl,
                    title: fullName,
                    showDownload: !userId,
                  })
                }
              >
                <img className="aw-avatar" src={avatarUrl} alt={fullName} />
                {!userId && (
                  <button
                    className="aw-avatar-cam"
                    title="Add / change photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Camera size={16} />
                  </button>
                )}
              </motion.div>

              <div className="aw-identity-main">
                <div className="aw-name-row">
                  <h2 className="aw-name">{fullName}</h2>
                  {verified && (
                    <span className="aw-verified">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  )}
                </div>

                <div className="aw-chips">
                  <span className="aw-chip">
                    {gender}, {age} yrs
                  </span>
                  <span className="aw-chip">
                    <Heart size={12} /> {religion}
                  </span>
                  <span className="aw-chip aw-chip-loc">
                    <MapPin size={12} /> {city}
                  </span>
                </div>

                {(p.linkedInUrl || p.instagramUrl || p.facebookUrl) && (
                  <div className="aw-socials">
                    {p.linkedInUrl && (
                      <a
                        href={p.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={19} />
                      </a>
                    )}
                    {p.instagramUrl && (
                      <a
                        href={p.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Instagram size={19} />
                      </a>
                    )}
                    {p.facebookUrl && (
                      <a
                        href={p.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <Facebook size={19} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {!userId && (
                <div className="aw-identity-aside">
                  <CompletionRing value={completion} />
                  <button
                    className="aw-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={14} /> Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* ---------------- Sticky navigation ---------------- */}
            <nav className="aw-nav" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`aw-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "manage" && <Settings size={14} />}
                  <span>{tab}</span>
                  {activeTab === tab && (
                    <motion.span
                      layoutId="aw-tab-underline"
                      className="aw-tab-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ---------------- Tab content ---------------- */}
            <div className="aw-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  {/* ============ ABOUT ============ */}
                  {activeTab === "about" && (
                    <div className="aw-grid">
                      {/* ---- left column ---- */}
                      <div className="aw-col">
                        {bio && (
                          <Reveal root={scrollRef}>
                            <div className="aw-card">
                              <SectionHeader
                                icon={<User size={17} />}
                                title="About Me"
                              />
                              <p className="aw-prose">“{bio}”</p>
                            </div>
                          </Reveal>
                        )}

                        <Reveal root={scrollRef} delay={0.04}>
                          <div className="aw-card">
                            <SectionHeader
                              icon={<User size={17} />}
                              title="Basic Information"
                            />
                            <div className="aw-details">
                              <Detail
                                label="Height"
                                value={heightCm ? `${heightCm} cm` : "—"}
                              />
                              <Detail
                                label="Marital Status"
                                value={
                                  p.maritalStatus ||
                                  p.basicDetails?.maritalStatus ||
                                  "Never Married"
                                }
                              />
                              <Detail label="Date of Birth" value={dob || "—"} />
                              <Detail
                                label="Mother Tongue"
                                value={motherTongue || "—"}
                              />
                              <Detail
                                label="Physical Status"
                                value={physicalStatus || "Normal"}
                              />
                              {p.maritalStatus &&
                                p.maritalStatus !== "Never Married" && (
                                  <Detail
                                    label="Children"
                                    value={p.childrenCount || 0}
                                  />
                                )}
                            </div>
                          </div>
                        </Reveal>

                        {(designation || company || education || incomeRange) && (
                          <Reveal root={scrollRef} delay={0.08}>
                            <div className="aw-card">
                              <SectionHeader
                                icon={<Briefcase size={17} />}
                                title="Education & Career"
                              />
                              <div className="aw-details">
                                {education && (
                                  <Detail label="Education" value={education} />
                                )}
                                {designation && (
                                  <Detail
                                    label="Designation"
                                    value={designation}
                                  />
                                )}
                                {company && (
                                  <Detail label="Company" value={company} />
                                )}
                                <Detail
                                  label="Annual Income"
                                  value={incomeRange || "Confidential"}
                                />
                              </div>
                            </div>
                          </Reveal>
                        )}

                        <Reveal root={scrollRef} delay={0.12}>
                          <div className="aw-card">
                            <SectionHeader
                              icon={<MapPin size={17} />}
                              title="Lifestyle & Location"
                            />
                            <div className="aw-details">
                              <Detail label="Current City" value={city} />
                              <Detail label="Diet" value={diet || "—"} />
                              <Detail label="Smoking" value={smoke || "No"} />
                              <Detail label="Drinking" value={drink || "No"} />
                            </div>
                          </div>
                        </Reveal>

                        {/* Contact — only when viewing another member */}
                        {userId && (
                          <Reveal root={scrollRef} delay={0.16}>
                            <div className="aw-card">
                              <SectionHeader
                                icon={<Phone size={17} />}
                                title="Contact Information"
                              />
                              {u.mobile || u.email ? (
                                <div className="aw-details">
                                  <Detail
                                    label="Mobile Number"
                                    value={
                                      <span className="flex items-center gap-2">
                                        {u.mobile?.includes("X") && (
                                          <Lock
                                            size={13}
                                            className="text-[var(--accent-2)]"
                                          />
                                        )}
                                        {u.mobile || "N/A"}
                                      </span>
                                    }
                                  />
                                  <Detail
                                    label="Email Address"
                                    value={u.email || "N/A"}
                                  />
                                </div>
                              ) : (
                                <div className="text-center py-3">
                                  <div className="w-14 h-14 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-subtle)] mx-auto mb-3">
                                    <Lock size={22} />
                                  </div>
                                  <h4 className="text-[var(--text)] font-bold mb-1">
                                    Contact Details Locked
                                  </h4>
                                  <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto mb-4">
                                    {tier === "Basic Member"
                                      ? "Basic members cannot view contact details. Upgrade to Silver to unlock contact access."
                                      : "Contact details are hidden by the user."}
                                  </p>
                                  {tier === "Basic Member" && (
                                    <button
                                      onClick={() => setShowUpgrade(true)}
                                      className="aw-edit-btn mx-auto"
                                    >
                                      Upgrade to Silver
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </Reveal>
                        )}
                      </div>

                      {/* ---- right column ---- */}
                      <div className="aw-col">
                        <Reveal root={scrollRef} delay={0.04}>
                          <div className="aw-card">
                            <SectionHeader
                              icon={<Camera size={17} />}
                              title="Photo Gallery"
                              subtitle={
                                photos.length
                                  ? `${photos.length} photo${photos.length > 1 ? "s" : ""}`
                                  : undefined
                              }
                            />
                            <div className="aw-gallery">
                              {photos.map((photo: any, idx: number) => {
                                const photoUrl = getImageUrl(
                                  photo.url || photo,
                                  u.firstName,
                                );
                                return (
                                  <div key={idx} className="aw-gallery-item">
                                    <img
                                      src={photoUrl}
                                      alt={`Photo ${idx + 1}`}
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    <div className="aw-gallery-overlay">
                                      <button
                                        className="aw-gmini"
                                        title="Preview"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreviewImage({
                                            url: photoUrl,
                                            title: `Photo ${idx + 1}`,
                                            showDownload: !userId,
                                          });
                                        }}
                                      >
                                        <Eye size={14} />
                                      </button>
                                      {!userId && (
                                        <>
                                          <button
                                            className="aw-gmini"
                                            title="Edit"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setCroppingImage({
                                                url: photoUrl,
                                                type: "photo",
                                                id: photo.id,
                                              });
                                            }}
                                          >
                                            <Edit2 size={14} />
                                          </button>
                                          <button
                                            className="aw-gmini del"
                                            title="Delete"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (photo.id)
                                                handleDeletePhoto(photo.id);
                                            }}
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                              {!userId && (
                                <div
                                  className="aw-gallery-add"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <Camera size={22} />
                                  <span>Add</span>
                                </div>
                              )}
                              {userId && photos.length === 0 && (
                                <div className="aw-empty">
                                  No photos shared yet.
                                </div>
                              )}
                            </div>
                          </div>
                        </Reveal>

                        <Reveal root={scrollRef} delay={0.08}>
                          <div className="aw-card">
                            <SectionHeader
                              icon={<Heart size={17} />}
                              title="Looking For"
                            />
                            <p className="aw-lookfor">
                              {lookingFor ||
                                "A life partner who is kind, ambitious, and shares similar values."}
                            </p>
                          </div>
                        </Reveal>

                        {highlights.length > 0 && (
                          <Reveal root={scrollRef} delay={0.12}>
                            <div className="aw-card">
                              <SectionHeader
                                icon={<Sparkles size={17} />}
                                title="Compatibility Highlights"
                              />
                              <div className="aw-tags">
                                {highlights.map((h, i) => (
                                  <span key={i} className="aw-tag">
                                    <span className="aw-tag-dot" />
                                    {h.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Reveal>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ============ BACKGROUND ============ */}
                  {activeTab === "background" && (
                    <div className="aw-col" style={{ gap: 22 }}>
                      <Reveal root={scrollRef}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Heart size={17} />}
                            title="Religion & Ethnicity"
                          />
                          <div className="aw-details">
                            <Detail label="Religion" value={religion} />
                            <Detail
                              label="Caste / Sub-caste"
                              value={`${caste || "Open"} / ${
                                subcaste || "Open"
                              }`}
                            />
                            <Detail
                              label="Mother Tongue"
                              value={motherTongue || "English"}
                            />
                          </div>
                        </div>
                      </Reveal>

                      <Reveal root={scrollRef} delay={0.06}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Briefcase size={17} />}
                            title="Education & Career"
                          />
                          <div className="aw-details">
                            <Detail
                              label="Highest Education"
                              value={education || "Not specified"}
                            />
                            <Detail
                              label="Designation"
                              value={designation || "Not specified"}
                            />
                            <Detail
                              label="Company"
                              value={company || "Not specified"}
                            />
                            <Detail
                              label="Employment Type"
                              value={
                                p.EducationCareer?.employmentType ||
                                p.professionalInfo?.employmentType ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Annual Income"
                              value={incomeRange || "Confidential"}
                            />
                          </div>
                        </div>
                      </Reveal>

                      <Reveal root={scrollRef} delay={0.12}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Home size={17} />}
                            title="Family Roots"
                          />
                          <div className="aw-details">
                            <Detail
                              label="Father's Name"
                              value={
                                p.FamilyDetail?.fatherName ||
                                p.familyRoots?.fatherName ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Father's Occupation"
                              value={
                                p.FamilyDetail?.fatherOccupation ||
                                p.familyRoots?.fatherOccupation ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Mother's Name"
                              value={
                                p.FamilyDetail?.motherName ||
                                p.familyRoots?.motherName ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Mother's Occupation"
                              value={
                                p.FamilyDetail?.motherOccupation ||
                                p.familyRoots?.motherOccupation ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Family Type"
                              value={
                                p.FamilyDetail?.familyType ||
                                p.familyRoots?.familyType ||
                                "Nuclear"
                              }
                            />
                            <Detail
                              label="Family Status"
                              value={
                                p.FamilyDetail?.familyStatus ||
                                p.lifestyle?.familyStatus ||
                                p.familyStatus ||
                                "Middle Class"
                              }
                            />
                            <Detail
                              label="Siblings"
                              value={
                                p.FamilyDetail?.siblingsCount ??
                                p.familyRoots?.siblingsCount ??
                                0
                              }
                            />
                            <Detail
                              label="Native District"
                              value={
                                p.FamilyDetail?.nativeDistrict ||
                                p.familyRoots?.nativeDistrict ||
                                "Not specified"
                              }
                            />
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  )}

                  {/* ============ ASTROLOGY ============ */}
                  {activeTab === "astrology" && (
                    <div className="aw-col" style={{ gap: 22 }}>
                      <Reveal root={scrollRef}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Star size={17} />}
                            title="Horoscope & Astrology"
                          />
                          <div className="aw-details">
                            <Detail
                              label="Star (Nakshatram)"
                              value={
                                p.HoroscopeDetail?.Star?.name ||
                                p.HoroscopeDetail?.star ||
                                p.horoscope?.star ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Rasi"
                              value={
                                p.HoroscopeDetail?.Rasi?.name ||
                                p.HoroscopeDetail?.rasi ||
                                p.horoscope?.rasi ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Laknam"
                              value={
                                p.HoroscopeDetail?.Laknam?.name ||
                                p.HoroscopeDetail?.laknam ||
                                p.horoscope?.laknam ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Gothram"
                              value={
                                p.HoroscopeDetail?.Gothram?.name ||
                                p.HoroscopeDetail?.gothram ||
                                p.horoscope?.gothram ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Sevvai Dosham"
                              accent
                              value={
                                p.HoroscopeDetail?.sevvaiDhosham ||
                                p.horoscope?.sevvaiDhosham ||
                                "No"
                              }
                            />
                            <Detail
                              label="Rahu Ketu Dosham"
                              accent
                              value={
                                p.HoroscopeDetail?.rahuKetuDhosham ||
                                p.horoscope?.rahuKetuDhosham ||
                                "No"
                              }
                            />
                            <Detail
                              label="Birth Time"
                              value={
                                p.HoroscopeDetail?.birthTime ||
                                p.horoscope?.birthTime ||
                                "Not specified"
                              }
                            />
                            <Detail
                              label="Birth Place"
                              value={
                                p.HoroscopeDetail?.BirthCity?.name ||
                                p.HoroscopeDetail?.birthPlace ||
                                p.horoscope?.birthPlace ||
                                "Not specified"
                              }
                            />
                          </div>

                          {p.HoroscopeDetail?.horoscopeImageUrl && (
                            <div className="mt-6">
                              <div className="horoscope-chart-container group">
                                <img
                                  src={getImageUrl(
                                    p.HoroscopeDetail?.horoscopeImageUrl ||
                                      p.horoscope?.horoscopeImageUrl,
                                  )}
                                  alt="Horoscope Chart"
                                  className="horoscope-chart-image"
                                  loading="lazy"
                                />
                                <div className="horoscope-chart-overlay">
                                  <button
                                    className="action-btn"
                                    onClick={() =>
                                      setPreviewImage({
                                        url: getImageUrl(
                                          p.HoroscopeDetail?.horoscopeImageUrl ||
                                            p.horoscope?.horoscopeImageUrl,
                                        ),
                                        title: "Horoscope Chart",
                                      })
                                    }
                                  >
                                    <Eye size={13} /> Preview
                                  </button>
                                  {!userId && (
                                    <>
                                      <button
                                        className="action-btn action-btn-edit"
                                        onClick={() =>
                                          setCroppingImage({
                                            url: getImageUrl(
                                              p.HoroscopeDetail
                                                ?.horoscopeImageUrl ||
                                                p.horoscope?.horoscopeImageUrl,
                                            ),
                                            type: "horoscope",
                                          })
                                        }
                                      >
                                        <Edit2 size={13} /> Edit
                                      </button>
                                      <button
                                        className="action-btn action-btn-delete"
                                        onClick={handleDeleteHoroscope}
                                      >
                                        <Trash2 size={13} /> Delete
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {!userId &&
                            !(
                              p.HoroscopeDetail?.horoscopeImageUrl ||
                              p.horoscope?.horoscopeImageUrl
                            ) && (
                              <label className="mt-6 w-full h-36 rounded-2xl border-2 border-dashed border-[var(--accent-border)] flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--accent-soft-bg)] transition-all bg-[var(--surface-2)] group">
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleHoroscopeFileSelect}
                                  accept="image/*"
                                />
                                <Camera
                                  size={28}
                                  className="text-[var(--text-subtle)] mb-2 group-hover:text-[var(--accent-2)] transition-colors"
                                />
                                <span className="text-sm font-bold text-[var(--text-subtle)] group-hover:text-[var(--text-muted)]">
                                  Upload Horoscope Chart
                                </span>
                              </label>
                            )}
                        </div>
                      </Reveal>
                    </div>
                  )}

                  {/* ============ PARTNER ============ */}
                  {activeTab === "partner" && (
                    <div className="aw-col" style={{ gap: 22 }}>
                      <Reveal root={scrollRef}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Heart size={17} />}
                            title="Partner Preferences"
                          />
                          <div className="aw-details">
                            <Detail
                              label="Age Range"
                              value={`${profile.preferences?.minAge ?? "—"} - ${
                                profile.preferences?.maxAge ?? "—"
                              } years`}
                            />
                            <Detail
                              label="Height Range"
                              value={`${profile.preferences?.minHeightCm ?? "—"}cm - ${
                                profile.preferences?.maxHeightCm ?? "—"
                              }cm`}
                            />
                            <Detail
                              label="Marital Status"
                              value={profile.preferences?.maritalStatus || "Any"}
                            />
                            <Detail
                              label="Religion Preference"
                              value={profile.preferences?.Religion?.name || "Any"}
                            />
                            <Detail
                              label="Preferred Location"
                              value={
                                profile.preferences?.preferredLocation ||
                                profile.preferences?.City?.name ||
                                "Open to any"
                              }
                            />
                          </div>

                          {Array.isArray(
                            profile.preferences?.partnerCastes,
                          ) &&
                            profile.preferences.partnerCastes.length > 0 && (
                              <div className="mt-5">
                                <span className="aw-detail-l">
                                  Preferred Caste(s)
                                </span>
                                <div className="aw-tags mt-2">
                                  {profile.preferences.partnerCastes.map(
                                    (caste: string) => (
                                      <span key={caste} className="aw-tag">
                                        <span className="aw-tag-dot" />
                                        {caste === "any" ? "Any Caste" : caste}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </Reveal>
                    </div>
                  )}

                  {/* ============ MANAGE ============ */}
                  {activeTab === "manage" && (
                    <div className="aw-col" style={{ gap: 22 }}>
                      {/* Interface theme */}
                      <Reveal root={scrollRef}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Sparkles size={17} />}
                            title="Interface Theme"
                          />
                          <p className="text-sm text-[var(--text-muted)] mb-5">
                            Personalize your AuraWeds experience with a premium
                            interface theme.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              onClick={() => setTheme("theme-violet")}
                              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
                                theme === "theme-violet"
                                  ? "bg-purple-600/10 border-purple-500 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                                  : "bg-[var(--surface-2)] border-[var(--border)] hover:border-[var(--border-strong)]"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                                  theme === "theme-violet"
                                    ? "bg-purple-500 text-white"
                                    : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                                }`}
                              >
                                <Sparkles size={24} />
                              </div>
                              <div className="text-center">
                                <h4
                                  className={`text-sm font-bold ${theme === "theme-violet" ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}
                                >
                                  Violet Tech
                                </h4>
                                <p className="text-[10px] text-[var(--text-subtle)] uppercase tracking-widest mt-1 font-black">
                                  Default
                                </p>
                              </div>
                            </button>

                            <button
                              onClick={() => setTheme("theme-gold")}
                              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
                                theme === "theme-gold"
                                  ? "bg-amber-600/10 border-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                  : "bg-[var(--surface-2)] border-[var(--border)] hover:border-[var(--border-strong)]"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                                  theme === "theme-gold"
                                    ? "bg-amber-500 text-black"
                                    : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
                                }`}
                              >
                                <Sparkles size={24} />
                              </div>
                              <div className="text-center">
                                <h4
                                  className={`text-sm font-bold ${theme === "theme-gold" ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}
                                >
                                  Royal Gold
                                </h4>
                                <p className="text-[10px] text-[var(--text-subtle)] uppercase tracking-widest mt-1 font-black">
                                  Elite
                                </p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </Reveal>

                      {/* Privacy & visibility */}
                      <Reveal root={scrollRef} delay={0.06}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Eye size={17} />}
                            title="Profile Visibility & Privacy"
                          />
                          <div className="space-y-6">
                            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
                              <div>
                                <h4 className="text-[var(--text)] font-medium">
                                  Profile Status
                                </h4>
                                <p className="text-sm text-[var(--text-muted)]">
                                  Control who can see your profile
                                </p>
                              </div>
                              <select
                                className="bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] outline-none focus:border-[var(--accent-2)] transition-colors"
                                value={p.profileVisibility || "Public"}
                                onChange={(e) =>
                                  handleStatusChange(e.target.value)
                                }
                                disabled={privacySaving}
                              >
                                <option value="Public">Public (Everyone)</option>
                                <option value="Members Only">
                                  Members Only
                                </option>
                                <option value="Hidden">
                                  Hidden (Invisible)
                                </option>
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
                              const isChecked =
                                p.privacySettings?.[setting.key] ??
                                setting.key !== "showExactIncome";
                              return (
                                <div
                                  key={setting.key}
                                  className="flex items-center justify-between"
                                >
                                  <div>
                                    <h4 className="text-[var(--text)] text-sm font-medium">
                                      {setting.label}
                                    </h4>
                                    <p className="text-xs text-[var(--text-muted)]">
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
                                    <div className="w-11 h-6 bg-[var(--surface-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-2)]"></div>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Reveal>

                      {/* Change password */}
                      <Reveal root={scrollRef} delay={0.12}>
                        <div className="aw-card">
                          <SectionHeader
                            icon={<Lock size={17} />}
                            title="Change Password"
                          />
                          <form
                            onSubmit={handlePasswordChange}
                            className="space-y-4 max-w-lg"
                          >
                            <div>
                              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1 tracking-wider uppercase">
                                Current Password
                              </label>
                              <input
                                type="password"
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition-all"
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
                              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1 tracking-wider uppercase">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition-all"
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
                              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1 tracking-wider uppercase">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent-2)] focus:ring-1 focus:ring-[var(--accent-2)] transition-all"
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
                              className="w-full py-3 bg-[var(--surface-2)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text)] rounded-xl font-medium transition-colors disabled:opacity-50 mt-2"
                            >
                              {passwordStatus.loading
                                ? "Updating..."
                                : "Update Password"}
                            </button>
                          </form>
                        </div>
                      </Reveal>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-[var(--surface-2)]">
            <User size={64} className="text-[var(--text-subtle)] mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[var(--text)]">
              Profile Not Found
            </h3>
            <p className="text-[var(--text-subtle)] mt-2 max-w-xs">
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
