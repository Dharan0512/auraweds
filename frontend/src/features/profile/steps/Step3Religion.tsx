"use client";

import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  useReligions,
  useCastes,
  useSubcastes,
  useMotherTongues,
  useStars,
  useRasis,
  useLaknams,
  useGothrams,
  useAllCities,
} from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import PremiumSelect from "@/components/ui/PremiumSelect";
import { profileService } from "@/services/profileService";
import { getImageUrl, formatMasterLabel } from "@/lib/utils";
import { Sparkles, Star, Upload, X, Camera } from "lucide-react";

const religionSchema = z
  .object({
    religionId: z.string().min(1, "Religion is required"),
    casteId: z.string().optional(),
    subcasteId: z.string().optional(),
    subCaste: z.string().optional(),
    motherTongue: z.string().min(1, "Mother tongue is required"),
    // Horoscope fields
    showHoroscope: z.boolean().optional(),
    star: z.string().optional(),
    rasi: z.string().optional(),
    laknam: z.string().optional(),
    gothram: z.string().optional(),
    sevvaiDhosham: z.string().optional(),
    rahuKetuDhosham: z.string().optional(),
    starId: z.string().optional(),
    rasiId: z.string().optional(),
    laknamId: z.string().optional(),
    gothramId: z.string().optional(),
    birthTime: z.string().optional(),
    birthPlace: z.string().optional(),
    birthCityId: z.string().optional(),
    horoscopeImageUrl: z.string().optional(),

    // Family Details
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    motherOccupation: z.string().optional(),
    familyType: z.enum(["Joint", "Nuclear", "Other"]).optional(),
    siblingsCount: z.union([z.number(), z.string()]).optional(),
    ownHouse: z.boolean().optional(),
    nativeDistrict: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.showHoroscope) {
      if (!data.rasiId && !data.rasi) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Rasi is required when Horoscope is enabled",
          path: ["rasiId"],
        });
      }
    }
  });

type ReligionData = z.infer<typeof religionSchema>;

interface Props {
  initialData?: any;
  onNext: (data: ReligionData) => void;
  onBack: () => void;
}

export default function Step3Religion({ initialData, onNext, onBack }: Props) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReligionData>({
    resolver: zodResolver(religionSchema),
    defaultValues: {
      showHoroscope: true,
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const selectedReligion = watch("religionId");
  const selectedCaste = watch("casteId");
  const selectedMotherTongue = watch("motherTongue");

  const { data: religions, isLoading: loadingReligions } = useReligions();
  const { data: castes, isLoading: loadingCastes } =
    useCastes(selectedReligion);
  const { data: subcastes, isLoading: loadingSubcastes } =
    useSubcastes(selectedCaste || null);

  // "Other → request new value" flow (admin-moderated).
  const OTHER_ID = "__other__";
  const [casteOtherOpen, setCasteOtherOpen] = useState(false);
  const [subcasteOtherOpen, setSubcasteOtherOpen] = useState(false);
  const [casteOtherName, setCasteOtherName] = useState("");
  const [subcasteOtherName, setSubcasteOtherName] = useState("");
  const [submittingCaste, setSubmittingCaste] = useState(false);
  const [submittingSubcaste, setSubmittingSubcaste] = useState(false);

  const handleRequestCaste = async () => {
    const name = casteOtherName.trim();
    if (!name) {
      toast.error("Please enter a caste name");
      return;
    }
    try {
      setSubmittingCaste(true);
      const res = await profileService.requestCaste({
        religionId: selectedReligion,
        name,
      });
      toast.success(res.message);
      setCasteOtherName("");
      setCasteOtherOpen(false);
    } catch {
      toast.error("Could not submit request. Please try again.");
    } finally {
      setSubmittingCaste(false);
    }
  };

  const handleRequestSubcaste = async () => {
    const name = subcasteOtherName.trim();
    if (!name) {
      toast.error("Please enter a sub-caste name");
      return;
    }
    try {
      setSubmittingSubcaste(true);
      const res = await profileService.requestSubcaste({
        casteId: selectedCaste || "",
        name,
      });
      toast.success(res.message);
      setSubcasteOtherName("");
      setSubcasteOtherOpen(false);
    } catch {
      toast.error("Could not submit request. Please try again.");
    } finally {
      setSubmittingSubcaste(false);
    }
  };
  const { data: motherTongues, isLoading: loadingMotherTongues } =
    useMotherTongues();
  const { data: stars } = useStars();
  const { data: rasis } = useRasis();
  const { data: laknams } = useLaknams();
  const { data: gothrams } = useGothrams();
  const { data: allCities } = useAllCities();

  const [uploading, setUploading] = useState(false);
  const horoscopeImageUrl = watch("horoscopeImageUrl");
  const watchedShowHoroscope = watch("showHoroscope");
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const handleHoroscopeUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("horoscope", file);

    try {
      const response = await profileService.uploadHoroscope(formData);
      setValue("horoscopeImageUrl", response.horoscope.horoscopeImageUrl);
    } catch (err) {
      console.error("Horoscope upload failed", err);
      toast.error("Failed to upload horoscope. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const getFullImageUrl = (url: string) => {
    return getImageUrl(url);
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Religion</label>
          <SearchableDropdown
            options={religions || []}
            value={
              religions?.find((r) => r.id.toString() === selectedReligion) ||
              null
            }
            onChange={(option) => {
              setValue("religionId", option?.id.toString() || "");
              setValue("casteId", "");
              setValue("subcasteId", "");
            }}
            placeholder="Search Religion..."
          />
          {errors.religionId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.religionId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Caste / Community</label>
          <SearchableDropdown
            options={[
              ...(castes || []),
              { id: OTHER_ID, name: "➕ Other (request new)" },
            ]}
            value={
              castes?.find((c) => c.id.toString() === watch("casteId")) || null
            }
            onChange={(option) => {
              if (option?.id === OTHER_ID) {
                setCasteOtherOpen(true);
                return;
              }
              setValue("casteId", option?.id.toString() || "");
              setValue("subcasteId", "");
              setSubcasteOtherOpen(false);
            }}
            placeholder={
              loadingCastes ? "Loading..." : "Search Caste / Community..."
            }
            disabled={!selectedReligion}
          />
          {casteOtherOpen && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={casteOtherName}
                onChange={(e) => setCasteOtherName(e.target.value)}
                placeholder="Enter your caste / community"
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleRequestCaste}
                disabled={submittingCaste}
                className="px-4 rounded-2xl bg-purple-600 text-white text-sm font-bold disabled:opacity-50"
              >
                {submittingCaste ? "..." : "Request"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCasteOtherOpen(false);
                  setCasteOtherName("");
                }}
                className="px-3 rounded-2xl border border-white/10 text-slate-400 text-sm"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {errors.casteId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.casteId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Sub-caste (Optional)</label>
          <SearchableDropdown
            options={[
              ...(subcastes || []),
              { id: OTHER_ID, name: "➕ Other (request new)" },
            ]}
            value={
              subcastes?.find((s) => s.id.toString() === watch("subcasteId")) ||
              null
            }
            onChange={(option) => {
              if (option?.id === OTHER_ID) {
                setSubcasteOtherOpen(true);
                return;
              }
              setValue("subcasteId", option?.id.toString() || "");
            }}
            placeholder={
              !selectedCaste
                ? "Select a caste first"
                : loadingSubcastes
                  ? "Loading..."
                  : "Search Sub-caste..."
            }
            disabled={!selectedCaste}
          />
          {subcasteOtherOpen && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={subcasteOtherName}
                onChange={(e) => setSubcasteOtherName(e.target.value)}
                placeholder="Enter your sub-caste"
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleRequestSubcaste}
                disabled={submittingSubcaste}
                className="px-4 rounded-2xl bg-purple-600 text-white text-sm font-bold disabled:opacity-50"
              >
                {submittingSubcaste ? "..." : "Request"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubcasteOtherOpen(false);
                  setSubcasteOtherName("");
                }}
                className="px-3 rounded-2xl border border-white/10 text-slate-400 text-sm"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label>Mother Tongue</label>
          <SearchableDropdown
            options={motherTongues || []}
            value={
              motherTongues?.find(
                (m) => m.id.toString() === selectedMotherTongue,
              ) || null
            }
            onChange={(option) =>
              setValue("motherTongue", option?.id.toString() || "")
            }
            placeholder="Search Mother Tongue..."
          />
          {errors.motherTongue && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.motherTongue.message}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:col-span-2 pt-6 border-t border-white/5">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-purple-400" /> Family Roots
          </h3>
        </div>

        <div className="space-y-3">
          <label>Father's Name</label>
          <input
            {...register("fatherName")}
            type="text"
            placeholder="Father's full name"
          />
        </div>
        <div className="space-y-3">
          <label>Mother's Name</label>
          <input
            {...register("motherName")}
            type="text"
            placeholder="Mother's full name"
          />
        </div>
        <div className="space-y-3">
          <label>Native District</label>
          <input
            {...register("nativeDistrict")}
            type="text"
            placeholder="e.g. Madurai"
          />
        </div>
        <div className="space-y-3">
          <label>Family Type</label>
          <Controller
            control={control}
            name="familyType"
            render={({ field }) => (
              <PremiumSelect
                options={["Joint", "Nuclear", "Other"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="space-y-3">
          <label>Father's Occupation</label>
          <input
            {...register("fatherOccupation")}
            type="text"
            placeholder="e.g. Business"
          />
        </div>
        <div className="space-y-3">
          <label>Mother's Occupation</label>
          <input
            {...register("motherOccupation")}
            type="text"
            placeholder="e.g. Homemaker"
          />
        </div>
        <div className="space-y-3">
          <label>Siblings Count</label>
          <input
            {...register("siblingsCount")}
            type="number"
            min="0"
            placeholder="Number of siblings"
          />
        </div>
        <div className="space-y-3">
          <label>Own House</label>
          <Controller
            control={control}
            name="ownHouse"
            render={({ field }) => (
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${field.value === true ? "border-purple-500 bg-purple-500/20" : "border-slate-600"}`}
                    onClick={() => field.onChange(true)}
                  >
                    {field.value === true && (
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                    )}
                  </div>
                  <span className="text-slate-300 font-medium">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${field.value === false ? "border-purple-500 bg-purple-500/20" : "border-slate-600"}`}
                    onClick={() => field.onChange(false)}
                  >
                    {field.value === false && (
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                    )}
                  </div>
                  <span className="text-slate-300 font-medium">No</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="space-y-3 sm:col-span-2 pt-6 border-t border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
            <Star size={20} /> Horoscope & Astrology
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300">
              Enable Horoscope
            </span>
            <Controller
              control={control}
              name="showHoroscope"
              render={({ field }) => (
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  onClick={() => field.onChange(!field.value)}
                  className={`${field.value ? "bg-[#D4AF37]" : "bg-slate-700"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                >
                  <span
                    aria-hidden="true"
                    className={`${field.value ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              )}
            />
          </div>
        </div>

        {watchedShowHoroscope && (
          <>
            <div className="space-y-3">
              <label>Star (Nakshatram)</label>
              <SearchableDropdown
                options={(stars || []).map((s: any) => ({
                  ...s,
                  name: formatMasterLabel(s),
                }))}
                value={(() => {
                  const s = stars?.find(
                    (s: any) => s.id.toString() === watch("starId"),
                  );
                  return s ? { ...s, name: formatMasterLabel(s) } : null;
                })()}
                onChange={(option) =>
                  setValue("starId", option?.id.toString() || "")
                }
                placeholder="Search Star..."
              />
            </div>

            <div className="space-y-3">
              <label>Rasi</label>
              <Controller
                control={control}
                name="rasiId"
                render={({ field }) => (
                  <PremiumSelect
                    options={(rasis || []).map((r: any) => ({
                      id: r.id.toString(),
                      name: formatMasterLabel(r),
                    }))}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.rasiId && (
                <p className="text-xs text-rose-400 font-bold mt-2">
                  {errors.rasiId.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label>Laknam</label>
              <Controller
                control={control}
                name="laknamId"
                render={({ field }) => (
                  <PremiumSelect
                    options={(laknams || []).map((l: any) => ({
                      id: l.id.toString(),
                      name: formatMasterLabel(l),
                    }))}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="space-y-3">
              <label>Gothram</label>
              <SearchableDropdown
                options={gothrams || []}
                value={
                  gothrams?.find(
                    (g) => g.id.toString() === watch("gothramId"),
                  ) || null
                }
                onChange={(option) =>
                  setValue("gothramId", option?.id.toString() || "")
                }
                placeholder="Search Gothram..."
              />
            </div>

            <div className="space-y-3">
              <label>Sevvai Dosham</label>
              <Controller
                control={control}
                name="sevvaiDhosham"
                render={({ field }) => (
                  <PremiumSelect
                    options={["No", "Yes", "Don't Know"].map((opt) => ({
                      id: opt,
                      name: opt,
                    }))}
                    value={field.value ?? "No"}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="space-y-3">
              <label>Rahu Ketu Dosham</label>
              <Controller
                control={control}
                name="rahuKetuDhosham"
                render={({ field }) => (
                  <PremiumSelect
                    options={["No", "Yes", "Don't Know"].map((opt) => ({
                      id: opt,
                      name: opt,
                    }))}
                    value={field.value ?? "No"}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="space-y-3">
              <label>Birth Time</label>
              <input {...register("birthTime")} type="time" />
            </div>

            <div className="space-y-3">
              <label>Birth Place</label>
              <Controller
                control={control}
                name="birthCityId"
                render={({ field }) => (
                  <SearchableDropdown
                    options={allCities || []}
                    value={
                      allCities?.find(
                        (c: any) => c.id.toString() === field.value,
                      ) || null
                    }
                    onChange={(option) =>
                      field.onChange(option?.id.toString() || "")
                    }
                    placeholder="Search & Select Birth City..."
                  />
                )}
              />
            </div>

            <div className="sm:col-span-2 space-y-4">
              <label className="flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> Horoscope Chart
              </label>
              {horoscopeImageUrl ? (
                <div className="relative w-48 h-64 rounded-2xl overflow-hidden border border-[#D4AF37]/20 group">
                  <img
                    src={getFullImageUrl(horoscopeImageUrl)}
                    alt="Horoscope"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("horoscopeImageUrl", "")}
                    className="absolute top-2 right-2 p-2 bg-rose-500 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-32 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37]/50 transition-all bg-slate-900/50">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleHoroscopeUpload}
                    accept="image/*"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Camera size={24} className="text-slate-600 mb-2" />
                      <span className="text-sm font-bold text-slate-500">
                        Upload Horoscope Chart (JPG/PNG)
                      </span>
                    </>
                  )}
                </label>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center pt-10">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button type="submit" className="premium-btn mt-8">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
