"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ProfileStepper from "@/components/forms/ProfileStepper";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2PersonalDetails from "./steps/Step2PersonalDetails";
import Step3Religion from "./steps/Step3Religion";
import Step4Education from "./steps/Step4Education";
import Step5Location from "./steps/Step5Location";
import Step6Preferences from "./steps/Step6Preferences";

export default function ProfileCreationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = (stepData: any) => {
    setProfileData((prev: any) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async (stepData: any) => {
    setIsSubmitting(true);
    const finalData = { ...profileData, ...stepData };

    try {
      // NOTE: Here you would call your API service to save the profile
      // await profileService.createProfile(finalData);

      // Redirect on success
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Failed to create profile", error);
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF7F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#6A0DAD]">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-gray-600">
          Help us find your perfect match by completing these simple steps.
        </p>
      </div>

      <ProfileStepper currentStep={currentStep}>
        <Step1BasicInfo initialData={profileData} onNext={handleNextStep} />
        <Step2PersonalDetails
          initialData={profileData}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
        <Step3Religion
          initialData={profileData}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
        <Step4Education
          initialData={profileData}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
        <Step5Location
          initialData={profileData}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
        <Step6Preferences
          initialData={profileData}
          onNext={handleFinalSubmit}
          onBack={handlePrevStep}
          isSubmitting={isSubmitting}
        />
      </ProfileStepper>
    </div>
  );
}
