"use client";

import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useEducations,
  useEmploymentTypes,
  useOccupations,
  useIncomeRanges,
} from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

const educationSchema = z.object({
  educationId: z.string().min(1, "Education is required"),
  educationDetail: z.string().optional(),
  employmentTypeId: z.string().min(1, "Employment sector is required"),
  occupationId: z.string().optional(),
  incomeRangeId: z.string().optional(),
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
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EducationData>({
    resolver: zodResolver(educationSchema),
    defaultValues: initialData || { employmentTypeId: "1" },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const selectedEmploymentType = watch("employmentTypeId");
  const selectedEducation = watch("educationId");
  const selectedOccupation = watch("occupationId");
  const selectedIncome = watch("incomeRangeId");

  const { data: educations, isLoading: loadingEducations } = useEducations();
  const { data: employmentTypes, isLoading: loadingEmploymentTypes } =
    useEmploymentTypes();
  const { data: occupations, isLoading: loadingOccupations } = useOccupations(
    selectedEmploymentType,
  );
  const { data: incomeRanges, isLoading: loadingIncomeRanges } =
    useIncomeRanges(1); // Defaulting to currency 1 for now

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3 sm:col-span-2">
          <label>Highest Education</label>
          <SearchableDropdown
            options={educations || []}
            value={
              educations?.find((e) => e.id.toString() === selectedEducation) ||
              null
            }
            onChange={(option) =>
              setValue("educationId", option?.id.toString() || "")
            }
            placeholder="Search Education..."
          />
          {errors.educationId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.educationId.message}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>Education Details (Optional)</label>
          <input
            {...register("educationDetail")}
            type="text"
            placeholder="e.g. Master of Business Administration in Digital Arts"
          />
        </div>

        <div className="space-y-3">
          <label>Employment Sector</label>
          <SearchableDropdown
            options={employmentTypes || []}
            value={
              employmentTypes?.find(
                (et) => et.id.toString() === selectedEmploymentType,
              ) || null
            }
            onChange={(option) => {
              setValue("employmentTypeId", option?.id.toString() || "");
              setValue("occupationId", "");
            }}
            placeholder="Search Employment Sector..."
          />
          {errors.employmentTypeId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.employmentTypeId.message}
            </p>
          )}
        </div>

        {selectedEmploymentType !== "5" && (
          <>
            <div className="space-y-3">
              <label>Occupation</label>
              <SearchableDropdown
                options={occupations || []}
                value={
                  occupations?.find(
                    (o) => o.id.toString() === selectedOccupation,
                  ) || null
                }
                onChange={(option) =>
                  setValue("occupationId", option?.id.toString() || "")
                }
                placeholder={
                  loadingOccupations ? "Loading..." : "Search Occupation..."
                }
                disabled={!selectedEmploymentType}
              />
            </div>

            <div className="space-y-3 sm:col-span-2">
              <label>Annual Income</label>
              <SearchableDropdown
                options={
                  incomeRanges?.map((ir) => ({
                    id: ir.id,
                    name: (ir as any).displayLabel || ir.name,
                  })) || []
                }
                value={
                  incomeRanges
                    ?.map((ir) => ({
                      id: ir.id,
                      name: (ir as any).displayLabel || ir.name,
                    }))
                    .find((ir) => ir.id.toString() === selectedIncome) || null
                }
                onChange={(option) =>
                  setValue("incomeRangeId", option?.id.toString() || "")
                }
                placeholder="Select Personal Annual Income..."
              />
              {errors.incomeRangeId && (
                <p className="text-xs text-rose-400 font-bold mt-2">
                  {errors.incomeRangeId.message}
                </p>
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
