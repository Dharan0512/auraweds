"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Step1BasicInfoRaw from "./steps/Step1BasicInfo";
import Step2PersonalDetailsRaw from "./steps/Step2PersonalDetails";
import Step3ReligionRaw from "./steps/Step3Religion";
import Step4EducationRaw from "./steps/Step4Education";
import Step5LocationRaw from "./steps/Step5Location";
import Step6PreferencesRaw from "./steps/Step6Preferences";
import Step7LifestyleRaw from "./steps/Step7Lifestyle";

const Step1BasicInfo = memo(Step1BasicInfoRaw);
const Step2PersonalDetails = memo(Step2PersonalDetailsRaw);
const Step3Religion = memo(Step3ReligionRaw);
const Step4Education = memo(Step4EducationRaw);
const Step5Location = memo(Step5LocationRaw);
const Step6Preferences = memo(Step6PreferencesRaw);
const Step7Lifestyle = memo(Step7LifestyleRaw);
import { profileService } from "@/services/profileService";
import { mapProfileToFormData, getFormDataDiff } from "./profileMapper";
import {
  User,
  Heart,
  Briefcase,
  MapPin,
  Settings,
  X,
  Sparkles,
  Zap,
} from "lucide-react";

interface EditProfileFormProps {
  profile: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditProfileForm({
  profile,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [initialData, setInitialData] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { label: "Identity", icon: <User size={18} /> },
    { label: "Personal", icon: <Heart size={18} /> },
    { label: "Spiritual", icon: <Sparkles size={18} /> },
    { label: "Ambition", icon: <Briefcase size={18} /> },
    { label: "Location", icon: <MapPin size={18} /> },
    { label: "Lifestyle", icon: <Zap size={18} /> },
    {
      label: "Partner Pref",
      icon: <Settings size={18} />,
    },
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      // 1. Map existing profile data
      const mappedData = mapProfileToFormData(profile);
      setInitialData(mappedData);

      // 2. Check for draft in backend
      try {
        const draft = await profileService.getDraft();
        if (draft && draft.stepData && Object.keys(draft.stepData).length > 0) {
          setFormData({ ...mappedData, ...draft.stepData });
          setActiveTab(draft.lastStep);
          return;
        }
      } catch (err) {
        console.error("Failed to load draft", err);
      }

      // 3. Fallback to storage or just profile
      const localDraft = localStorage.getItem("profile_edit_draft");
      if (localDraft) {
        const parsed = JSON.parse(localDraft);
        setFormData({ ...mappedData, ...parsed.data });
        setActiveTab(parsed.step);
      } else {
        setFormData(mappedData);
      }
    };

    if (profile) loadInitialData();
  }, [profile]);

  const updateFormData = useCallback(
    (stepData: any) => {
      setFormData((prev: any) => {
        const newData = { ...prev, ...stepData };
        // Local persistence for instant recovery
        localStorage.setItem(
          "profile_edit_draft",
          JSON.stringify({
            data: newData,
            step: activeTab,
          }),
        );
        return newData;
      });
    },
    [activeTab],
  );

  const handleNext = useCallback(
    async (stepData: any) => {
      updateFormData(stepData);
      const nextStep = activeTab < tabs.length - 1 ? activeTab + 1 : activeTab;

      // PERSIST TO BACKEND: Save draft when moving to next step
      try {
        await profileService.saveDraft({
          stepData: { ...formData, ...stepData },
          lastStep: nextStep,
        });
      } catch (err) {
        console.warn("Backend draft save failed", err);
      }

      setActiveTab(nextStep);
    },
    [updateFormData, activeTab, tabs.length, formData],
  );

  const handleFinalSubmit = useCallback(
    async (stepData: any) => {
      setIsSubmitting(true);
      const currentData = { ...formData, ...stepData };

      const changedFields = getFormDataDiff(initialData, currentData);

      if (Object.keys(changedFields).length === 0) {
        onCancel();
        setIsSubmitting(false);
        return;
      }

      try {
        await profileService.updateProfile(changedFields);
        // CLEAR DRAFTS on success
        localStorage.removeItem("profile_edit_draft");
        await profileService.saveDraft({ stepData: {}, lastStep: 0 });

        onSave();
      } catch (error) {
        console.error("Failed to update profile", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, initialData, onCancel, onSave],
  );

  const renderCurrentStep = () => {
    switch (activeTab) {
      case 0:
        return (
          <Step1BasicInfo initialData={formData} onNext={handleNext} isEdit />
        );
      case 1:
        return (
          <Step2PersonalDetails
            initialData={formData}
            onNext={handleNext}
            onBack={() => setActiveTab(0)}
          />
        );
      case 2:
        return (
          <Step3Religion
            initialData={formData}
            onNext={handleNext}
            onBack={() => setActiveTab(1)}
          />
        );
      case 3:
        return (
          <Step4Education
            initialData={formData}
            onNext={handleNext}
            onBack={() => setActiveTab(2)}
          />
        );
      case 4:
        return (
          <Step5Location
            initialData={formData}
            onNext={handleNext}
            onBack={() => setActiveTab(3)}
          />
        );
      case 5:
        return (
          <Step7Lifestyle
            initialData={formData}
            onNext={handleNext}
            onBack={() => setActiveTab(4)}
          />
        );
      case 6:
        return (
          <Step6Preferences
            initialData={formData}
            onNext={handleFinalSubmit}
            onBack={() => setActiveTab(5)}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="edit-profile-container">
      {/* Sidebar Navigation */}
      <aside className="edit-sidebar">
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            className={`edit-sidebar-item ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}

        <div className="mt-auto px-6 py-8">
          <button
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={16} /> Discard Changes
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="edit-main-content">
        <div className="edit-step-card">{renderCurrentStep()}</div>
      </main>
    </div>
  );
}
