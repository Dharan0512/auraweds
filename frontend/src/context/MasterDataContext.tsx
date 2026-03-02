"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchApi } from "@/lib/api";

type MasterItem = {
  id: number;
  name: string;
};

type MasterItemWithCode = MasterItem & {
  code?: string;
  isoCode?: string;
  phoneCode?: string;
};
type MasterItemWithLevel = MasterItem & { level?: string };
type MasterHeight = { id: number; cmValue: number; displayLabel: string };
type MasterIncomeRange = {
  id: number;
  minValue: number;
  maxValue: number;
  displayLabel: string;
};

interface MasterDataContextType {
  countries: MasterItemWithCode[];
  religions: MasterItem[];
  motherTongues: MasterItemWithCode[];
  heights: MasterHeight[];
  educations: MasterItemWithLevel[];
  employmentTypes: MasterItem[];
  currencies: MasterItemWithCode[];
  fetchStates: (countryId: number) => Promise<MasterItem[]>;
  fetchCities: (stateId: number) => Promise<MasterItem[]>;
  fetchCastes: (religionId: number) => Promise<MasterItem[]>;
  fetchOccupations: (employmentTypeId: number) => Promise<MasterItem[]>;
  fetchIncomeRanges: (currencyId: number) => Promise<MasterIncomeRange[]>;
  stars: MasterItem[];
  rasis: MasterItem[];
  laknams: MasterItem[];
  gothrams: MasterItem[];
  loading: boolean;
}

const MasterDataContext = createContext<MasterDataContextType | undefined>(
  undefined,
);

export function MasterDataProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<MasterItemWithCode[]>([]);
  const [religions, setReligions] = useState<MasterItem[]>([]);
  const [motherTongues, setMotherTongues] = useState<MasterItemWithCode[]>([]);
  const [heights, setHeights] = useState<MasterHeight[]>([]);
  const [educations, setEducations] = useState<MasterItemWithLevel[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<MasterItem[]>([]);
  const [currencies, setCurrencies] = useState<MasterItemWithCode[]>([]);
  const [stars, setStars] = useState<MasterItem[]>([]);
  const [rasis, setRasis] = useState<MasterItem[]>([]);
  const [laknams, setLaknams] = useState<MasterItem[]>([]);
  const [gothrams, setGothrams] = useState<MasterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch base standalone lists. Dependent lists (like states, castes) are fetched on demand
    const fetchBaseMasterData = async () => {
      try {
        const [
          countriesData,
          religionsData,
          motherTonguesData,
          heightsData,
          educationsData,
          employmentsData,
          currenciesData,
          starsData,
          rasisData,
          laknamsData,
          gothramsData,
        ] = await Promise.all([
          fetchApi("/master/countries"),
          fetchApi("/master/religions"),
          fetchApi("/master/mother-tongues"),
          fetchApi("/master/heights"),
          fetchApi("/master/educations"),
          fetchApi("/master/employment-types"),
          fetchApi("/master/currencies"),
          fetchApi("/master/stars"),
          fetchApi("/master/rasis"),
          fetchApi("/master/laknams"),
          fetchApi("/master/gothrams"),
        ]);

        setCountries(countriesData || []);
        setReligions(religionsData || []);
        setMotherTongues(motherTonguesData || []);
        setHeights(heightsData || []);
        setEducations(educationsData || []);
        setEmploymentTypes(employmentsData || []);
        setCurrencies(currenciesData || []);
        setStars(starsData || []);
        setRasis(rasisData || []);
        setLaknams(laknamsData || []);
        setGothrams(gothramsData || []);
      } catch (err) {
        console.error("Failed to load master data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBaseMasterData();
  }, []);

  const fetchStates = async (countryId: number) => {
    try {
      return await fetchApi(`/master/states?country_id=${countryId}`);
    } catch {
      return [];
    }
  };

  const fetchCities = async (stateId: number) => {
    try {
      return await fetchApi(`/master/cities?state_id=${stateId}`);
    } catch {
      return [];
    }
  };

  const fetchCastes = async (religionId: number) => {
    try {
      return await fetchApi(`/master/castes?religion_id=${religionId}`);
    } catch {
      return [];
    }
  };

  const fetchOccupations = async (employmentTypeId: number) => {
    try {
      return await fetchApi(
        `/master/occupations?employment_type_id=${employmentTypeId}`,
      );
    } catch {
      return [];
    }
  };

  const fetchIncomeRanges = async (currencyId: number) => {
    try {
      return await fetchApi(`/master/income-ranges?currency_id=${currencyId}`);
    } catch {
      return [];
    }
  };

  return (
    <MasterDataContext.Provider
      value={{
        countries,
        religions,
        motherTongues,
        heights,
        educations,
        employmentTypes,
        currencies,
        stars,
        rasis,
        laknams,
        gothrams,
        fetchStates,
        fetchCities,
        fetchCastes,
        fetchOccupations,
        fetchIncomeRanges,
        loading,
      }}
    >
      {children}
    </MasterDataContext.Provider>
  );
}

export function useMasterData() {
  const context = useContext(MasterDataContext);
  if (context === undefined) {
    throw new Error("useMasterData must be used within a MasterDataProvider");
  }
  return context;
}
