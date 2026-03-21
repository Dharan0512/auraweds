"use client";

import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PremiumSelect from "@/components/ui/PremiumSelect";

const personalDetailsSchema = z
  .object({
    dob: z.string().min(1, "Date of birth is required"),
    height: z.string().min(1, "Height is required"),
    physicalStatus: z.string().min(1, "Required"),
    maritalStatus: z.string().min(1, "Required"),
    childrenCount: z.string().optional(),
    childrenLivingWith: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.maritalStatus !== "Never Married" && !data.childrenCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify number of children, or 0",
        path: ["childrenCount"],
      });
    }
  });

type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;

interface Props {
  initialData?: any;
  onNext: (data: PersonalDetailsData) => void;
  onBack: () => void;
}

export default function Step2PersonalDetails({
  initialData,
  onNext,
  onBack,
}: Props) {
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PersonalDetailsData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: initialData || {
      maritalStatus: "Never Married",
      physicalStatus: "Normal",
      childrenLivingWith: false,
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const maritalStatus = watch("maritalStatus");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="w-full [color-scheme:dark]"
          />
          {errors.dob && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.dob.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Height (cm)</label>
          <input {...register("height")} type="number" placeholder="170" />
          {errors.height && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.height.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Physical Status</label>
          <Controller
            control={control}
            name="physicalStatus"
            render={({ field }) => (
              <PremiumSelect
                options={["Normal", "Physically Challenged"].map((opt) => ({
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
          <label>Marital Status</label>
          <Controller
            control={control}
            name="maritalStatus"
            render={({ field }) => (
              <PremiumSelect
                options={[
                  "Never Married",
                  "Divorced",
                  "Widowed",
                  "Awaiting Divorce",
                ].map((opt) => ({ id: opt, name: opt }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.maritalStatus && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        {maritalStatus !== "Never Married" && (
          <>
            <div className="space-y-3">
              <label>Number of Children</label>
              <Controller
                control={control}
                name="childrenCount"
                render={({ field }) => (
                  <PremiumSelect
                    options={["None", "1", "2", "3 or more"].map((opt) => ({
                      id: opt === "None" ? "0" : opt.replace(" or more", "+"),
                      name: opt,
                    }))}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.childrenCount && (
                <p className="text-xs text-rose-400 font-bold mt-2">
                  {errors.childrenCount.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-6 sm:col-span-2">
              <label
                htmlFor="childrenLivingWith"
                className="flex items-center gap-3 cursor-pointer !mb-0 !opacity-100"
              >
                <div className="relative flex items-center">
                  <input
                    {...register("childrenLivingWith")}
                    type="checkbox"
                    id="childrenLivingWith"
                    className="w-6 h-6 rounded-lg border-white/10 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37] transition-all"
                  />
                </div>
                <span className="text-slate-300 font-semibold text-sm">
                  Children living with me
                </span>
              </label>
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
