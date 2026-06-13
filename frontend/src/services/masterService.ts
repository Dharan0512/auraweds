import apiClient from "@/lib/apiClient";

export interface MasterItem {
  id: string;
  name: string;
}

export interface Religion extends MasterItem {}
export interface Caste extends MasterItem {
  religionId: string;
}
export interface Subcaste extends MasterItem {
  casteId: string;
}
export interface Country extends MasterItem {
  isoCode: string;
  phoneCode: string;
}
export interface State extends MasterItem {
  countryId: string;
}
export interface City extends MasterItem {
  stateId: string;
}
export interface MotherTongue extends MasterItem {}
export interface Education extends MasterItem {}
export interface EmploymentType extends MasterItem {}
export interface Occupation extends MasterItem {
  employmentTypeId?: string | number;
}
export interface Currency extends MasterItem {
  symbol: string;
}
export interface IncomeRange extends MasterItem {
  currencyId: string | number;
}
export interface Star extends MasterItem {}
export interface Rasi extends MasterItem {}
export interface Laknam extends MasterItem {}
export interface Gothram extends MasterItem {}

export interface Height {
  id: number;
  cmValue: number;
  displayLabel: string;
}

export const masterService = {
  getMotherTongues: async (): Promise<MotherTongue[]> => {
    const { data } = await apiClient.get("/master/mother-tongues");
    return data;
  },

  getReligions: async (): Promise<Religion[]> => {
    const { data } = await apiClient.get("/master/religions");
    return data;
  },

  getCastesByReligion: async (
    religionId: string | number,
  ): Promise<Caste[]> => {
    const { data } = await apiClient.get(
      `/master/castes?religion_id=${religionId}`,
    );
    return data;
  },

  getSubcastesByCaste: async (
    casteId: string | number,
  ): Promise<Subcaste[]> => {
    const { data } = await apiClient.get(
      `/master/subcastes?caste_id=${casteId}`,
    );
    return data;
  },

  getHeights: async (): Promise<Height[]> => {
    const { data } = await apiClient.get("/master/heights");
    return data;
  },

  getCountries: async (): Promise<Country[]> => {
    const { data } = await apiClient.get("/master/countries");
    return data;
  },

  getStatesByCountry: async (countryId: string | number): Promise<State[]> => {
    const { data } = await apiClient.get(
      `/master/states?country_id=${countryId}`,
    );
    return data;
  },

  getCitiesByState: async (stateId: string | number): Promise<City[]> => {
    const { data } = await apiClient.get(`/master/cities?state_id=${stateId}`);
    return data;
  },
  getAllCities: async (): Promise<City[]> => {
    const { data } = await apiClient.get("/master/cities");
    return data;
  },

  getEducations: async (): Promise<Education[]> => {
    const { data } = await apiClient.get("/master/educations");
    return data;
  },

  getEmploymentTypes: async (): Promise<EmploymentType[]> => {
    const { data } = await apiClient.get("/master/employment-types");
    return data;
  },

  getOccupationsByEmploymentType: async (
    employmentTypeId: string | number,
  ): Promise<Occupation[]> => {
    const { data } = await apiClient.get(
      `/master/occupations?employment_type_id=${employmentTypeId}`,
    );
    return data;
  },

  getCurrencies: async (): Promise<Currency[]> => {
    const { data } = await apiClient.get("/master/currencies");
    return data;
  },

  getIncomeRangesByCurrency: async (
    currencyId: string | number,
  ): Promise<IncomeRange[]> => {
    const { data } = await apiClient.get(
      `/master/income-ranges?currency_id=${currencyId}`,
    );
    return data;
  },
  getStars: async (): Promise<Star[]> => {
    const { data } = await apiClient.get("/master/stars");
    return data;
  },
  getRasis: async (): Promise<Rasi[]> => {
    const { data } = await apiClient.get("/master/rasis");
    return data;
  },
  getLaknams: async (): Promise<Laknam[]> => {
    const { data } = await apiClient.get("/master/laknams");
    return data;
  },
  getGothrams: async (): Promise<Gothram[]> => {
    const { data } = await apiClient.get("/master/gothrams");
    return data;
  },
};
