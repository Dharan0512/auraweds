"use client";

import React, { useState, useEffect } from "react";
import { profileService } from "@/services/profileService";
import {
  X,
  User,
  Briefcase,
  Home,
  CheckCircle,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  Heart,
  Droplets,
  Wine,
  Cigarette,
  Scale,
  Lock,
  Eye,
} from "lucide-react";
import "./ProfileModal.css";
import ImagePreviewModal from "./ImagePreviewModal";
import {
  subscriptionService,
  SubscriptionStatusResponse,
} from "@/services/subscriptionService";
import UpgradeModal from "./UpgradeModal";
import { getImageUrl, calculateAge } from "@/lib/utils";

interface OtherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | number;
}

export default function OtherProfileModal({
  isOpen,
  onClose,
  userId,
}: OtherProfileModalProps) {
  const [profileData, setProfileData] = useState<any>(null);
  const [subscription, setSubscription] =
    useState<SubscriptionStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title?: string;
    showDownload?: boolean;
  } | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchOtherProfile();
    }
    // Reset tab when opening a new profile
    setActiveTab("about");
  }, [isOpen, userId]);

  const fetchOtherProfile = async () => {
    try {
      setLoading(true);
      const [profileRes, subRes] = await Promise.all([
        profileService.getOtherProfile(userId),
        subscriptionService.getStatus().catch(
          () =>
            ({
              tier: "Basic Member",
              status: "None",
              state: "FREE",
              endDate: null,
            }) as SubscriptionStatusResponse,
        ),
      ]);
      setProfileData(profileRes);
      setSubscription(subRes);
    } catch (error) {
      console.error("Fetch other profile error", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const user = profileData?.user;
  const profile = profileData?.profile;
  const photos = profileData?.photos;
  const privacy = profileData?.privacySettings || {};

  // Check which tabs actually have data based on privacy settings
  const hasAstrologyTab = !!profile?.HoroscopeDetail || privacy.showAstroMatch;
  const hasBackgroundTab =
    !!profile?.FamilyDetail ||
    !!profile?.EducationCareer ||
    !!profile?.MotherTongue ||
    !!profile?.Caste;

  const tabs = ["about"];
  if (hasBackgroundTab) tabs.push("background");
  if (hasAstrologyTab) tabs.push("astrology");

  return (
    <div
      className="profile-modal-overlay z-50 fixed inset-0 flex p-4"
      onClick={onClose}
    >
      <div
        className="profile-modal-container max-h-screen overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="profile-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center flex-1 py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : profileData ? (
          <>
            {/* Hero Section */}
            <div className="profile-hero shrink-0">
              <img
                src={getImageUrl(
                  photos?.[0]?.url || photos?.[0],
                  user?.firstName,
                )}
                alt={user?.firstName}
                className="profile-hero-image"
              />
              <div className="profile-hero-gradient"></div>
              <div className="profile-hero-info w-full">
                <h2 className="profile-name flex items-center gap-2">
                  {user?.firstName}
                  {profile?.Badge?.mobileVerified && (
                    <CheckCircle size={20} className="text-blue-400" />
                  )}
                </h2>
                <div className="profile-badges mt-2">
                  <span className="badge">
                    {user?.gender},{" "}
                    {profile?.dob ? calculateAge(profile.dob) : "28"} yrs
                  </span>
                  <span className="badge">
                    {profile?.heightCm ? `${profile.heightCm} cm` : ""}
                  </span>
                  <span className="badge">{profile?.maritalStatus}</span>
                  {profile?.Religion?.name && (
                    <span className="badge">{profile.Religion.name}</span>
                  )}
                </div>
                {/* Location */}
                <div className="flex items-center gap-2 mt-3 text-white/80 shrink-0 text-sm">
                  <MapPin size={16} />
                  <span>
                    {[
                      profile?.City?.name,
                      profile?.State?.name,
                      profile?.Country?.name,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>

                {/* Subscription Action or Social Links */}
                {!subscription || subscription.tier === "Basic Member" ? (
                  <div className="mt-6 flex flex-col items-start gap-2">
                    <p className="text-white/60 text-sm flex items-center gap-1.5 font-medium bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                      <Lock size={14} className="text-[#D4AF37]" /> Upgrade to
                      view contact info
                    </p>
                    <button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all text-sm uppercase tracking-wider"
                    >
                      View Contact Details
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4 mt-6 relative z-10 w-full mb-1">
                    {profile?.linkedInUrl && (
                      <a
                        href={profile.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors bg-white/5 p-2 rounded-full border border-white/10"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {profile?.instagramUrl && (
                      <a
                        href={profile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors bg-white/5 p-2 rounded-full border border-white/10"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {profile?.facebookUrl && (
                      <a
                        href={profile.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D4AF37] transition-colors bg-white/5 p-2 rounded-full border border-white/10"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex px-8 border-b border-white/10 gap-8 mt-2 overflow-x-auto custom-scrollbar shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? "text-[#D4AF37] border-[#D4AF37]"
                      : "text-slate-400 border-transparent hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="profile-content pt-6 pb-20 overflow-y-auto">
              {activeTab === "about" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Bio */}
                  {profile?.bio && (
                    <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
                      <div className="text-white/90 text-sm leading-relaxed italic border-l-4 border-[#D4AF37] pl-4">
                        "{profile.bio}"
                      </div>
                    </div>
                  )}

                  {/* Photo Gallery */}
                  {photos && photos.length > 0 && (
                    <div>
                      <div className="section-title">Photo Gallery</div>
                      <div className="photo-gallery">
                        {photos.map((photo: any, idx: number) => {
                          const photoUrl = getImageUrl(
                            photo.url || photo,
                            user?.firstName,
                          );
                          return (
                            <div key={idx} className="gallery-item">
                              <img src={photoUrl} alt={`Gallery ${idx}`} />
                              <div className="gallery-item-overlay">
                                <button
                                  className="action-btn action-btn-preview"
                                  onClick={() =>
                                    setPreviewImage({
                                      url: photoUrl,
                                      title: `${user?.firstName}'s Photo ${idx + 1}`,
                                    })
                                  }
                                >
                                  <Eye size={12} /> Preview
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Lifestyle (Diet/Drink/Smoke/Fitness) */}
                  {profile?.LocationLifestyle && (
                    <div>
                      <div className="section-title">Lifestyle</div>
                      <div className="details-grid">
                        {profile.LocationLifestyle.diet && (
                          <div className="detail-item">
                            <span className="detail-label flex items-center gap-1">
                              <Droplets size={14} /> Diet
                            </span>
                            <span className="detail-value">
                              {profile.LocationLifestyle.diet}
                            </span>
                          </div>
                        )}
                        {profile.LocationLifestyle.drink && (
                          <div className="detail-item">
                            <span className="detail-label flex items-center gap-1">
                              <Wine size={14} /> Drink
                            </span>
                            <span className="detail-value">
                              {profile.LocationLifestyle.drink}
                            </span>
                          </div>
                        )}
                        {profile.LocationLifestyle.smoke && (
                          <div className="detail-item">
                            <span className="detail-label flex items-center gap-1">
                              <Cigarette size={14} /> Smoke
                            </span>
                            <span className="detail-value">
                              {profile.LocationLifestyle.smoke}
                            </span>
                          </div>
                        )}
                        {profile.LocationLifestyle.fitnessLevel && (
                          <div className="detail-item">
                            <span className="detail-label flex items-center gap-1">
                              <Heart size={14} /> Fitness
                            </span>
                            <span className="detail-value">
                              {profile.LocationLifestyle.fitnessLevel}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Values (Only if allowed) */}
                  {privacy.showValues && profile?.LocationLifestyle && (
                    <div>
                      <div className="section-title">Values & Personality</div>
                      <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          {
                            label: "Ambition",
                            val: profile.LocationLifestyle.ambition,
                          },
                          {
                            label: "Family Orientation",
                            val: profile.LocationLifestyle.familyOrientation,
                          },
                          {
                            label: "Emotional Stability",
                            val: profile.LocationLifestyle.emotionalStability,
                          },
                          {
                            label: "Communication Type",
                            val:
                              profile.LocationLifestyle.communicationStyle === 1
                                ? "Introvert"
                                : profile.LocationLifestyle
                                      .communicationStyle === 2
                                  ? "Ambivert"
                                  : "Extrovert",
                          },
                          {
                            label: "Spiritual Inclination",
                            val: profile.LocationLifestyle.spiritualInclination,
                          },
                        ]
                          .filter(
                            (item) =>
                              item.val !== undefined && item.val !== null,
                          )
                          .map((item, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium tracking-wider uppercase">
                                <span>{item.label}</span>
                                {typeof item.val === "number" && (
                                  <span>{item.val}/5</span>
                                )}
                              </div>
                              {typeof item.val === "number" ? (
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37]"
                                    style={{
                                      width: `${(item.val / 5) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              ) : (
                                <span className="text-white capitalize">
                                  {item.val}
                                </span>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "background" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Career & Education */}
                  <div>
                    <div className="section-title">
                      <Briefcase size={20} className="text-[#D4AF37]" />{" "}
                      Education & Career
                    </div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Highest Education</span>
                        <span className="detail-value">
                          {profile?.EducationCareer?.Education?.name ||
                            profile?.EducationCareer?.highestEducation ||
                            "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">College/University</span>
                        <span className="detail-value">
                          {profile?.EducationCareer?.college || "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Occupation</span>
                        <span className="detail-value">
                          {profile?.EducationCareer?.Occupation?.name ||
                            profile?.EducationCareer?.designation ||
                            "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Company</span>
                        <span className="detail-value">
                          {profile?.EducationCareer?.companyName || "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Income Range</span>
                        <span className="detail-value">
                          {profile?.EducationCareer?.AnnualIncome?.range ||
                            profile?.EducationCareer?.incomeRange ||
                            "-"}
                        </span>
                      </div>
                      {/* Exact Income if allowed */}
                      {profile?.EducationCareer?.exactIncome && (
                        <div className="detail-item">
                          <span className="detail-label flex items-center gap-2">
                            <Scale size={14} className="text-green-400" /> Exact
                            Income
                          </span>
                          <span className="detail-value font-mono">
                            {profile.EducationCareer.exactIncome}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Family Details (If Allowed) */}
                  {profile?.FamilyDetail && (
                    <div>
                      <div className="section-title">
                        <Home size={20} className="text-[#D4AF37]" /> Family
                        Roots
                      </div>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Family Type</span>
                          <span className="detail-value">
                            {profile.FamilyDetail.familyType || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Family Status</span>
                          <span className="detail-value">
                            {profile.familyStatus || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Father's Name</span>
                          <span className="detail-value">
                            {profile.FamilyDetail.fatherName || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">
                            Father's Occupation
                          </span>
                          <span className="detail-value">
                            {profile.FamilyDetail.fatherOccupation || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Mother's Name</span>
                          <span className="detail-value">
                            {profile.FamilyDetail.motherName || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">
                            Mother's Occupation
                          </span>
                          <span className="detail-value">
                            {profile.FamilyDetail.motherOccupation || "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Siblings</span>
                          <span className="detail-value">
                            {profile.FamilyDetail.siblingsCount || "None"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Native District</span>
                          <span className="detail-value">
                            {profile.FamilyDetail.nativeDistrict || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Religion & Caste */}
                  <div>
                    <div className="section-title">Regional Details</div>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Religion</span>
                        <span className="detail-value">
                          {profile?.Religion?.name || "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Caste</span>
                        <span className="detail-value">
                          {profile?.Caste?.name || "-"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Mother Tongue</span>
                        <span className="detail-value">
                          {profile?.MotherTongue?.name || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "astrology" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Horoscope Details */}
                  {profile?.HoroscopeDetail ? (
                    <div>
                      <div className="section-title">
                        <Sparkles size={20} className="text-[#D4AF37]" />{" "}
                        Astrology Profile
                      </div>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Star / Nakshatra</span>
                          <span className="detail-value text-[#D4AF37] font-semibold">
                            {profile.HoroscopeDetail.Star?.name ||
                              profile.HoroscopeDetail.star ||
                              "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">
                            Raasi / Moon Sign
                          </span>
                          <span className="detail-value">
                            {profile.HoroscopeDetail.Rasi?.name ||
                              profile.HoroscopeDetail.rasi ||
                              "-"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Laknam</span>
                          <span className="detail-value">
                            {profile.HoroscopeDetail.Laknam?.name ||
                              profile.HoroscopeDetail.laknam ||
                              "-"}
                          </span>
                        </div>
                        {(profile.HoroscopeDetail.Gothram?.name ||
                          profile.HoroscopeDetail.gothram) && (
                          <div className="detail-item">
                            <span className="detail-label">Gothram</span>
                            <span className="detail-value">
                              {profile.HoroscopeDetail.Gothram?.name ||
                                profile.HoroscopeDetail.gothram}
                            </span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Chevvai Dosham</span>
                          <span className="detail-value border px-2 py-0.5 rounded-full border-white/20 inline-block mt-1">
                            {profile.HoroscopeDetail.chevvaiDosham
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Sarpa Dosham</span>
                          <span className="detail-value border px-2 py-0.5 rounded-full border-white/20 inline-block mt-1">
                            {profile.HoroscopeDetail.sarpaDosham ? "Yes" : "No"}
                          </span>
                        </div>
                        {profile.HoroscopeDetail.birthDate && (
                          <div className="detail-item col-span-full sm:col-span-1">
                            <span className="detail-label">Date of Birth</span>
                            <span className="detail-value">
                              {new Date(
                                profile.HoroscopeDetail.birthDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {/* Render exact birth time/place if allowed */}
                        {profile.HoroscopeDetail.birthTime && (
                          <div className="detail-item">
                            <span className="detail-label">Birth Time</span>
                            <span className="detail-value">
                              {profile.HoroscopeDetail.birthTime}
                            </span>
                          </div>
                        )}
                        {profile.HoroscopeDetail.birthPlace && (
                          <div className="detail-item">
                            <span className="detail-label">Birth Place</span>
                            <span className="detail-value">
                              {profile.HoroscopeDetail.BirthCity?.name ||
                                profile.HoroscopeDetail.birthPlace}
                            </span>
                          </div>
                        )}
                      </div>

                      {profile.HoroscopeDetail.horoscopeImageUrl && (
                        <div className="mt-8">
                          <span className="section-title mb-6">
                            <Eye size={20} /> Horoscope Chart
                          </span>
                          <div
                            className="horoscope-chart-container group cursor-pointer"
                            onClick={() =>
                              setPreviewImage({
                                url: getImageUrl(
                                  profile.HoroscopeDetail.horoscopeImageUrl,
                                ),
                                title: `${user?.firstName}'s Horoscope Chart`,
                              })
                            }
                          >
                            <img
                              src={getImageUrl(
                                profile.HoroscopeDetail.horoscopeImageUrl,
                              )}
                              alt="Horoscope Chart"
                              className="horoscope-chart-image"
                            />
                            <div className="horoscope-chart-overlay">
                              <button className="action-btn action-btn-preview">
                                <Eye size={14} /> Preview
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1 p-8 text-center bg-slate-900/40 rounded-2xl border border-white/5">
                      <Sparkles
                        size={48}
                        className="text-slate-700 mb-4 mx-auto"
                      />
                      <h3 className="text-xl font-medium text-white">
                        Astrology Hidden
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm">
                        This user has chosen not to display their full horoscope
                        details publicly.
                      </p>
                    </div>
                  )}
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
              This profile may be hidden or member-only.
            </p>
          </div>
        )}
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSuccess={(tier) => {
          setIsUpgradeModalOpen(false);
          subscriptionService.getStatus().then(setSubscription);
        }}
      />

      {/* Global Preview Modal */}
      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage?.url || ""}
        title={previewImage?.title}
        showDownload={false} // Always false for other profiles
      />
    </div>
  );
}
