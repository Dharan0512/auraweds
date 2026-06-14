"use client";

import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PremiumSelect from "@/components/ui/PremiumSelect";

const lifestyleSchema = z.object({
  diet: z.string().min(1, "Required"),
  spirituality: z.string().min(1, "Required"),
  drink: z.string().min(1, "Required"),
  smoke: z.string().min(1, "Required"),
  ambition: z.string().min(1, "Required"),
  careerAfterMarriage: z.string().min(1, "Required"),
  relocation: z.string().min(1, "Required"),
  fitness: z.string().min(1, "Required"),
  familyStatus: z.string().min(1, "Required"),
  aboutMe: z.string().min(20, "At least 20 characters please"),
});

type LifestyleData = z.infer<typeof lifestyleSchema>;

interface Props {
  initialData?: any;
  onNext: (data: LifestyleData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function Step7Lifestyle({
  initialData,
  onNext,
  onBack,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LifestyleData>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: initialData || {
      diet: "Veg",
      spirituality: "Not Spiritual",
      drink: "No",
      smoke: "No",
      ambition: "Moderate",
      careerAfterMarriage: "Yes",
      relocation: "No",
      fitness: "Regular",
      familyStatus: "Middle Class",
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Dietary Choice</label>
          <Controller
            control={control}
            name="diet"
            render={({ field }) => (
              <PremiumSelect
                options={["Veg", "Non-veg", "Eggetarian", "Vegan"].map(
                  (opt) => ({
                    id: opt,
                    name: opt,
                  }),
                )}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.diet && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.diet.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Spiritual Essence</label>
          <Controller
            control={control}
            name="spirituality"
            render={({ field }) => (
              <PremiumSelect
                options={[
                  "Very Spiritual",
                  "Moderately Spiritual",
                  "Not Spiritual",
                ].map((opt) => ({ id: opt, name: opt }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.spirituality && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.spirituality.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Drinking Habit</label>
          <Controller
            control={control}
            name="drink"
            render={({ field }) => (
              <PremiumSelect
                options={["No", "Yes", "Occasionally"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.drink && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.drink.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Smoking Habit</label>
          <Controller
            control={control}
            name="smoke"
            render={({ field }) => (
              <PremiumSelect
                options={["No", "Yes", "Occasionally"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.smoke && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.smoke.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Ambition Level</label>
          <Controller
            control={control}
            name="ambition"
            render={({ field }) => (
              <PremiumSelect
                options={["High", "Moderate", "Low"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.ambition && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.ambition.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Career Post-Marriage</label>
          <Controller
            control={control}
            name="careerAfterMarriage"
            render={({ field }) => (
              <PremiumSelect
                options={["Yes", "No", "Flexible"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.careerAfterMarriage && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.careerAfterMarriage.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Relocation Openness</label>
          <Controller
            control={control}
            name="relocation"
            render={({ field }) => (
              <PremiumSelect
                options={["Yes", "No", "Flexible"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.relocation && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.relocation.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Fitness Commitment</label>
          <Controller
            control={control}
            name="fitness"
            render={({ field }) => (
              <PremiumSelect
                options={["Regular", "Occasional", "Not at all"].map((opt) => ({
                  id: opt,
                  name: opt,
                }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.fitness && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.fitness.message}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>Family Class</label>
          <Controller
            control={control}
            name="familyStatus"
            render={({ field }) => (
              <PremiumSelect
                options={[
                  "Middle Class",
                  "Upper Middle Class",
                  "Rich",
                  "Affluent",
                ].map((opt) => ({ id: opt, name: opt }))}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.familyStatus && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.familyStatus.message}
            </p>
          )}
        </div>

        <div className="space-y-3 sm:col-span-2">
          <label>About My Story</label>
          <textarea
            {...register("aboutMe")}
            rows={5}
            placeholder="The soul's journey in few words..."
          />
          {errors.aboutMe && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.aboutMe.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-10 border-t border-white/5">
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
              Finalizing...
            </span>
          ) : (
            "Save & Continue"
          )}
        </button>
      </div>
    </form>
  );
}
