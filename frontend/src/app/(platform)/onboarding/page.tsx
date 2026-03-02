"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { fetchApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    profileType: "self",
    basicDetails: {
      name: "",
      gender: "Male",
      dob: "",
      religion: "",
      location: "",
    },
    professionalInfo: {
      education: "",
      profession: "",
      incomeRange: "Below $50k",
    },
    familyDetails: {
      familyType: "Nuclear",
      fatherProfession: "",
      motherProfession: "",
      siblings: 0,
    },
    preferences: {
      ageRange: { min: 22, max: 35 },
      religion: "",
      location: "",
      education: "",
    },
    photos: [],
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSave = async () => {
    setLoading(true);
    try {
      const finalData = {
        ...formData,
        photos: selectedImages.map((img) => img.file.name),
      };

      await fetchApi("/profile", {
        method: "POST",
        body: JSON.stringify(finalData),
      });
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF7F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Progress */}
          <div className="bg-[#6A0DAD] px-6 py-8 sm:p-10 text-white text-center">
            <h1 className="text-3xl font-bold font-serif mb-2 text-[#D4AF37]">
              Complete Your Profile
            </h1>
            <p className="text-purple-200">
              Step {step} of {totalSteps}
            </p>
            <div className="w-full bg-purple-900 rounded-full h-2.5 mt-4">
              <div
                className="bg-[#D4AF37] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 sm:p-10 border border-purple-50">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Basic Details
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.basicDetails.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicDetails: {
                            ...formData.basicDetails,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.basicDetails.gender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicDetails: {
                            ...formData.basicDetails,
                            gender: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.basicDetails.dob}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicDetails: {
                            ...formData.basicDetails,
                            dob: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Religion
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.basicDetails.religion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicDetails: {
                            ...formData.basicDetails,
                            religion: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Current Location
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      placeholder="e.g., New York, Mumbai"
                      value={formData.basicDetails.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicDetails: {
                            ...formData.basicDetails,
                            location: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Professional Info
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Highest Education
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      placeholder="e.g., Master's in Computer Science"
                      value={formData.professionalInfo.education}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          professionalInfo: {
                            ...formData.professionalInfo,
                            education: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Profession
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      placeholder="e.g., Software Engineer"
                      value={formData.professionalInfo.profession}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          professionalInfo: {
                            ...formData.professionalInfo,
                            profession: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Income Range (Annual)
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.professionalInfo.incomeRange}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          professionalInfo: {
                            ...formData.professionalInfo,
                            incomeRange: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Below $50k">Below $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k - $250k">$100k - $250k</option>
                      <option value="Above $250k">Above $250k</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Family Details
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Family Type
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.familyDetails.familyType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            familyType: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Nuclear">Nuclear</option>
                      <option value="Joint">Joint</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Father's Profession
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.familyDetails.fatherProfession}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            fatherProfession: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mother's Profession
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.familyDetails.motherProfession}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            motherProfession: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Siblings
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.familyDetails.siblings}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            siblings: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Partner Preferences
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Min Age
                      </label>
                      <input
                        type="number"
                        placeholder="22"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                        value={formData.preferences.ageRange.min}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferences: {
                              ...formData.preferences,
                              ageRange: {
                                ...formData.preferences.ageRange,
                                min: Number(e.target.value),
                              },
                            },
                          })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Max Age
                      </label>
                      <input
                        type="number"
                        placeholder="35"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                        value={formData.preferences.ageRange.max}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferences: {
                              ...formData.preferences,
                              ageRange: {
                                ...formData.preferences.ageRange,
                                max: Number(e.target.value),
                              },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Religion
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.preferences.religion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            religion: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6A0DAD] focus:ring-[#6A0DAD] text-gray-900 bg-white sm:text-sm p-2 border"
                      value={formData.preferences.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            location: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Photos & Verification
                </h2>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#6A0DAD] hover:bg-purple-50 transition-colors cursor-pointer relative"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files) {
                      const filesArray = Array.from(e.dataTransfer.files);
                      const validFiles = filesArray.filter(
                        (f) =>
                          f.type.startsWith("image/") &&
                          f.size <= 5 * 1024 * 1024,
                      );
                      const newImages = validFiles.map((file) => ({
                        file,
                        preview: URL.createObjectURL(file),
                      }));
                      setSelectedImages((prev) =>
                        [...prev, ...newImages].slice(0, 5),
                      );
                    }
                  }}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        const validFiles = filesArray.filter(
                          (f) =>
                            f.type.startsWith("image/") &&
                            f.size <= 5 * 1024 * 1024,
                        );
                        const newImages = validFiles.map((file) => ({
                          file,
                          preview: URL.createObjectURL(file),
                        }));
                        setSelectedImages((prev) =>
                          [...prev, ...newImages].slice(0, 5),
                        );
                      }
                    }}
                  />
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium text-[#6A0DAD] hover:text-purple-800">
                      Upload photos
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB (Max 5 photos)
                  </p>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-6">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group rounded-md overflow-hidden bg-gray-100 aspect-square border border-gray-200 shadow-sm"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.preview}
                          alt="preview"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImages((prev) => {
                              const newImages = [...prev];
                              URL.revokeObjectURL(newImages[index].preview);
                              newImages.splice(index, 1);
                              return newImages;
                            });
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 bg-yellow-50 border-l-4 border-[#D4AF37] p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Premium Users: Verifying your ID increases your trust
                        score by 40% and gets you up to 3x more responses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A0DAD] transition-all ${
                  step === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Back
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={step === totalSteps ? handleSave : nextStep}
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6A0DAD] hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A0DAD] transition-all"
              >
                {step === totalSteps ? "Complete Profile" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
