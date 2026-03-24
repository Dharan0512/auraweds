"use client";

import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useEducations,
  useEmploymentTypes,
} from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import PremiumSelect from "@/components/ui/PremiumSelect";

const educationSchema = z.object({
  highestEducation: z.string().min(1, "Education is required"),
  employmentType: z.string().min(1, "Employment sector is required"),
  designation: z.string().optional(),
  incomeRange: z.string().optional(),
});

type EducationData = z.infer<typeof educationSchema>;

interface Props {
  initialData?: any;
  onNext: (data: EducationData) => void;
  onBack: () => void;
}

export default function Step4Education({ initialData, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EducationData>({
    resolver: zodResolver(educationSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { data: educations } = useEducations();
  const { data: employmentTypes } = useEmploymentTypes();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3 sm:col-span-2">
          <label>Highest Education</label>
          <Controller
            control={control}
            name="highestEducation"
            render={({ field }) => (
              <SearchableDropdown
                options={educations || []}
                value={
                  (educations || []).find((e) => e.name === field.value) ||
                  null
                }
                onChange={(option) => field.onChange(option?.name || "")}
                placeholder="Search Education..."
              />
            )}
          />
          {errors.highestEducation && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.highestEducation.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Employment Type</label>
          <Controller
            control={control}
            name="employmentType"
            render={({ field }) => (
              <PremiumSelect
                options={(employmentTypes || []).map((et) => ({
                  id: et.name,
                  name: et.name,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Select Employment Sector"
              />
            )}
          />
          {errors.employmentType && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.employmentType.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Designation</label>
          <input
            {...register("designation")}
            type="text"
            placeholder="e.g. Software Engineer"
          />
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>Annual Income Range</label>
          <Controller
            control={control}
            name="incomeRange"
            render={({ field }) => (
               <PremiumSelect
                  options={[
                    "Under 3L",
                    "3L - 6L",
                    "6L - 10L",
                    "10L - 15L",
                    "15L - 25L",
                    "25L - 50L",
                    "50L+",
                  ].map((opt) => ({ id: opt, name: opt }))}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Select Personal Annual Income..."
                />
            )}
          />
        </div>
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
