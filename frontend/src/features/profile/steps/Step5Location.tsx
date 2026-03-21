"use client";

import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCountries, useStates, useCities } from "@/hooks/useMasterData";
import SearchableDropdown from "@/components/ui/SearchableDropdown";

const locationSchema = z.object({
  countryId: z.string().min(1, "Country is required"),
  stateId: z.string().min(1, "State is required"),
  cityId: z.string().min(1, "City is required"),
  citizenship: z.string().min(1, "Citizenship is required"),
});

type LocationData = z.infer<typeof locationSchema>;

interface Props {
  initialData?: any;
  onNext: (data: LocationData) => void;
  onBack: () => void;
}

export default function Step5Location({ initialData, onNext, onBack }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const selectedCountry = watch("countryId");
  const selectedState = watch("stateId");
  const selectedCity = watch("cityId");
  const selectedCitizenship = watch("citizenship");

  const { data: countries, isLoading: loadingCountries } = useCountries();
  const { data: states, isLoading: loadingStates } = useStates(selectedCountry);
  const { data: cities, isLoading: loadingCities } = useCities(selectedState);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label>Country of Residence</label>
          <SearchableDropdown
            options={countries || []}
            value={
              countries?.find((c) => c.id.toString() === selectedCountry) ||
              null
            }
            onChange={(option) => {
              setValue("countryId", option?.id.toString() || "");
              setValue("stateId", "");
              setValue("cityId", "");
            }}
            placeholder="Search Country..."
          />
          {errors.countryId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.countryId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>State / Region</label>
          <SearchableDropdown
            options={states || []}
            value={
              states?.find((s) => s.id.toString() === selectedState) || null
            }
            onChange={(option) => {
              setValue("stateId", option?.id.toString() || "");
              setValue("cityId", "");
            }}
            placeholder={loadingStates ? "Loading..." : "Search State..."}
            disabled={!selectedCountry}
          />
          {errors.stateId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.stateId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>City / District</label>
          <SearchableDropdown
            options={cities || []}
            value={
              cities?.find((c) => c.id.toString() === selectedCity) || null
            }
            onChange={(option) =>
              setValue("cityId", option?.id.toString() || "")
            }
            placeholder={loadingCities ? "Loading..." : "Search City..."}
            disabled={!selectedState}
          />
          {errors.cityId && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.cityId.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label>Citizenship</label>
          <SearchableDropdown
            options={countries || []}
            value={
              countries?.find((c) => c.id.toString() === selectedCitizenship) ||
              null
            }
            onChange={(option) =>
              setValue("citizenship", option?.id.toString() || "")
            }
            placeholder="Search Citizenship..."
          />
          {errors.citizenship && (
            <p className="text-xs text-rose-400 font-bold mt-2">
              {errors.citizenship.message}
            </p>
          )}
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
