import { useQuery } from "@tanstack/react-query";
import { masterService } from "@/services/masterService";

export const useReligions = () => {
  return useQuery({
    queryKey: ["religions"],
    queryFn: masterService.getReligions,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};

export const useCastes = (religionId: string | null) => {
  return useQuery({
    queryKey: ["castes", religionId],
    queryFn: () => masterService.getCastesByReligion(religionId!),
    enabled: !!religionId, // Only fetch if religion is selected
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: masterService.getCountries,
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};

export const useStates = (countryId: string | null) => {
  return useQuery({
    queryKey: ["states", countryId],
    queryFn: () => masterService.getStatesByCountry(countryId!),
    enabled: !!countryId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useCities = (stateId: string | null) => {
  return useQuery({
    queryKey: ["cities", stateId],
    queryFn: () => masterService.getCitiesByState(stateId!),
    enabled: !!stateId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMotherTongues = () => {
  return useQuery({
    queryKey: ["mother-tongues"],
    queryFn: masterService.getMotherTongues,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useEducations = () => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: masterService.getEducations,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useEmploymentTypes = () => {
  return useQuery({
    queryKey: ["employment-types"],
    queryFn: masterService.getEmploymentTypes,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useOccupations = (employmentTypeId: string | null) => {
  return useQuery({
    queryKey: ["occupations", employmentTypeId],
    queryFn: () =>
      masterService.getOccupationsByEmploymentType(employmentTypeId!),
    enabled: !!employmentTypeId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useIncomeRanges = (currencyId: string | number | null) => {
  return useQuery({
    queryKey: ["income-ranges", currencyId],
    queryFn: () => masterService.getIncomeRangesByCurrency(currencyId!),
    enabled: !!currencyId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useStars = () => {
  return useQuery({
    queryKey: ["stars"],
    queryFn: masterService.getStars,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useRasis = () => {
  return useQuery({
    queryKey: ["rasis"],
    queryFn: masterService.getRasis,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useLaknams = () => {
  return useQuery({
    queryKey: ["laknams"],
    queryFn: masterService.getLaknams,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGothrams = () => {
  return useQuery({
    queryKey: ["gothrams"],
    queryFn: masterService.getGothrams,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
export const useAllCities = () => {
  return useQuery({
    queryKey: ["cities", "all"],
    queryFn: masterService.getAllCities,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
