"use client";

import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  useReligions,
  useCastes,
  useEducations,
  useCountries,
  useStates,
} from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import PremiumSelect from "@/components/ui/PremiumSelect";

import MultiSearchableDropdown from "@/components/ui/MultiSearchableDropdown";

const preferencesSchema = z
  .object({
    partnerAgeMin: z.number().min(18),
    partnerAgeMax: z.number().max(80),
    partnerHeightMin: z.number().optional(),
    partnerHeightMax: z.number().optional(),
    partnerMaritalStatus: z.string().optional(),
    partnerReligion: z.string().optional(),
    partnerCastes: z.array(z.string()).default([]),
    partnerEducation: z.string().optional(),
    partnerCountry: z.string().optional(),
    partnerState: z.string().optional(),
    partnerLocationPreference: z.string().optional(),
  })
  .refine((data) => data.partnerAgeMin <= data.partnerAgeMax, {
    message: "Min age cannot be greater than max age",
    path: ["partnerAgeMax"],
  });

type PreferencesData = z.infer<typeof preferencesSchema>;

interface Props {
  initialData?: any;
  onNext: (data: PreferencesData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function Step6Preferences({
  initialData,
  onNext,
  onBack,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: initialData?.partnerCastes
      ? initialData
      : {
          ...initialData,
          partnerAgeMin: 22,
          partnerAgeMax: 30,
          partnerHeightMin: 150,
          partnerHeightMax: 190,
          partnerMaritalStatus: "Never Married",
          // Set default caste as mother tongue if it exists
          partnerCastes: initialData?.motherTongue
            ? [initialData.motherTongue.toString()]
            : [],
        },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        partnerAgeMin: 22,
        partnerAgeMax: 30,
        partnerHeightMin: 150,
        partnerHeightMax: 190,
        partnerMaritalStatus: "Never Married",
        ...initialData,
      });
    }
  }, [initialData, reset]);

  const selectedReligion = watch("partnerReligion") || null;
  const selectedCastes = watch("partnerCastes") || [];
  const selectedEducation = watch("partnerEducation") || null;
  const selectedCountry = watch("partnerCountry") || null;
  const selectedState = watch("partnerState") || null;

  const { data: religions } = useReligions();
  const { data: castesData } = useCastes(selectedReligion);
  const { data: educations } = useEducations();
  const { data: countries } = useCountries();
  const { data: states } = useStates(selectedCountry);

  // Add "Any" option to castes
  const castes = castesData
    ? [{ id: "any", name: "Any Caste" }, ...castesData]
    : [];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      {/* ================= BASIC PREFERENCES ================= */}
      <section className="space-y-8">
        <h3 className="premium-section-title">Basic Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Age Range */}
          <div className="space-y-3">
            <label>Age Range</label>
            <div className="flex items-center gap-4">
              <input
                {...register("partnerAgeMin", { valueAsNumber: true })}
                type="number"
                placeholder="From"
              />
              <span className="text-slate-500 font-bold">TO</span>
              <input
                {...register("partnerAgeMax", { valueAsNumber: true })}
                type="number"
                placeholder="To"
              />
            </div>
            {errors.partnerAgeMax && (
              <p className="text-xs text-rose-400 font-bold mt-2">
                {errors.partnerAgeMax.message}
              </p>
            )}
          </div>

          {/* Height Range */}
          <div className="space-y-3">
            <label>Height Range (cm)</label>
            <div className="flex items-center gap-4">
              <input
                {...register("partnerHeightMin", { valueAsNumber: true })}
                type="number"
                placeholder="Min"
              />
              <span className="text-slate-500 font-bold">TO</span>
              <input
                {...register("partnerHeightMax", { valueAsNumber: true })}
                type="number"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Marital Status */}
          <div className="space-y-3 sm:col-span-2">
            <label>Preferred Marital Status</label>
            <Controller
              control={control}
              name="partnerMaritalStatus"
              render={({ field }) => (
                <PremiumSelect
                  options={[
                    "Never Married",
                    "Divorced",
                    "Widowed",
                    "Awaiting Divorce",
                    "Any",
                  ].map((opt) => ({
                    id: opt,
                    name: opt === "Any" ? "Any Status" : opt,
                  }))}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </section>

      {/* ================= RELIGIOUS & EDUCATIONAL ================= */}
      <section className="space-y-8">
        <h3 className="premium-section-title mt-10">Religious & Educational</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Religion */}
          <div className="space-y-3">
            <label>Preferred Religion</label>
            <SearchableDropdown
              options={religions || []}
              value={
                religions?.find((r) => r.id.toString() === selectedReligion) ||
                null
              }
              onChange={(opt) => {
                setValue("partnerReligion", opt?.id.toString() || "");
                setValue("partnerCastes", []);
              }}
              placeholder="Any Religion"
            />
          </div>

          {/* Caste */}
          <div className="space-y-3">
            <label>Preferred Caste(s)</label>
            <MultiSearchableDropdown
              options={castes || []}
              value={selectedCastes}
              onChange={(ids) => setValue("partnerCastes", ids)}
              placeholder="Any Caste"
              disabled={!selectedReligion}
            />
          </div>

          {/* Education */}
          <div className="space-y-3 sm:col-span-2">
            <label>Preferred Education</label>
            <SearchableDropdown
              options={educations || []}
              value={
                educations?.find(
                  (e) => e.id.toString() === selectedEducation,
                ) || null
              }
              onChange={(opt) =>
                setValue("partnerEducation", opt?.id.toString() || "")
              }
              placeholder="Any Education Level"
            />
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="space-y-8">
        <h3 className="premium-section-title mt-10">Location Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Country */}
          <div className="space-y-3">
            <label>Country</label>
            <SearchableDropdown
              options={countries || []}
              value={
                countries?.find((c) => c.id.toString() === selectedCountry) ||
                null
              }
              onChange={(opt) => {
                setValue("partnerCountry", opt?.id.toString() || "");
                setValue("partnerState", "");
              }}
              placeholder="Any Country"
            />
          </div>

          {/* State */}
          <div className="space-y-3">
            <label>State / Province</label>
            <SearchableDropdown
              options={states || []}
              value={
                states?.find((s) => s.id.toString() === selectedState) || null
              }
              onChange={(opt) =>
                setValue("partnerState", opt?.id.toString() || "")
              }
              placeholder="Any State"
              disabled={!selectedCountry}
            />
          </div>

          <div className="space-y-3 sm:col-span-2">
            <label>Specific Location Preference (City/Area)</label>
            <textarea
              {...register("partnerLocationPreference")}
              rows={2}
              placeholder="Specify preferred cities or neighborhoods..."
              className="w-full bg-slate-900/50 border-white/10 rounded-2xl p-4 text-white"
            />
          </div>
        </div>
      </section>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-between items-center pt-10  border-white/5 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <button type="submit" disabled={isSubmitting} className="premium-btn">
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : (
            "Save & Continue"
          )}
        </button>
      </div>
    </form>
  );
}
