import { Request, Response } from "express";
import {
  Country,
  State,
  City,
  MotherTongue,
  Religion,
  Caste,
  Subcaste,
  Height,
  Education,
  EmploymentType,
  Occupation,
  Currency,
  IncomeRange,
  Star,
  Rasi,
  Laknam,
  Gothram,
} from "../models/sequelize";

// Locations
export const getCountries = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Country.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Country API Error:", error);
    res.status(500).json({ message: "Error fetching countries", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country_id } = req.query;
    const whereClause: any = { isActive: true };
    if (country_id) whereClause.countryId = country_id;

    const data = await State.findAll({ where: whereClause });
    res.json(data);
  } catch (error: any) {
    console.error("State API Error:", error);
    res.status(500).json({ message: "Error fetching states", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state_id } = req.query;
    const whereClause: any = { isActive: true };
    if (state_id) whereClause.stateId = state_id;

    const data = await City.findAll({ where: whereClause });
    res.json(data);
  } catch (error: any) {
    console.error("City API Error:", error);
    res.status(500).json({ message: "Error fetching cities", errorMsg: error?.message, stack: error?.stack });
  }
};

// Demographics
export const getMotherTongues = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await MotherTongue.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("MotherTongue API Error:", error);
    res.status(500).json({ message: "Error fetching mother tongues", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getReligions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Religion.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Religion API Error:", error);
    res.status(500).json({ message: "Error fetching religions", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getCastes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { religion_id } = req.query;
    const whereClause: any = { isActive: true };
    if (religion_id) whereClause.religionId = religion_id;

    const data = await Caste.findAll({ where: whereClause });
    res.json(data);
  } catch (error: any) {
    console.error("Caste API Error:", error);
    res.status(500).json({ message: "Error fetching castes", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getSubcastes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { caste_id } = req.query;
    const whereClause: any = { isActive: true };
    if (caste_id) whereClause.casteId = caste_id;

    const data = await Subcaste.findAll({ where: whereClause });
    res.json(data);
  } catch (error: any) {
    console.error("Subcaste API Error:", error);
    res.status(500).json({ message: "Error fetching subcastes", errorMsg: error?.message, stack: error?.stack });
  }
};

// Physical
export const getHeights = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Height.findAll({ order: [["cmValue", "ASC"]] });
    res.json(data);
  } catch (error: any) {
    console.error("Height API Error:", error);
    res.status(500).json({ message: "Error fetching heights", errorMsg: error?.message, stack: error?.stack });
  }
};

// Professional
export const getEducations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Education.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Education API Error:", error);
    res.status(500).json({ message: "Error fetching educations", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getEmploymentTypes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await EmploymentType.findAll();
    res.json(data);
  } catch (error: any) {
    console.error("EmploymentType API Error:", error);
    res.status(500).json({ message: "Error fetching employment types", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getOccupations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { employment_type_id } = req.query;
    const whereClause: any = { isActive: true };
    if (employment_type_id) whereClause.employmentTypeId = employment_type_id;

    const data = await Occupation.findAll({ where: whereClause });
    res.json(data);
  } catch (error: any) {
    console.error("Occupation API Error:", error);
    res.status(500).json({ message: "Error fetching occupations", errorMsg: error?.message, stack: error?.stack });
  }
};

// Income
export const getCurrencies = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Currency.findAll();
    res.json(data);
  } catch (error: any) {
    console.error("Currency API Error:", error);
    res.status(500).json({ message: "Error fetching currencies", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getIncomeRanges = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { currency_id } = req.query;
    const whereClause: any = {};
    if (currency_id) whereClause.currencyId = currency_id;

    const data = await IncomeRange.findAll({
      where: whereClause,
      order: [["sortOrder", "ASC"]],
    });
    res.json(data);
  } catch (error: any) {
    console.error("IncomeRange API Error:", error);
    res.status(500).json({ message: "Error fetching income ranges", errorMsg: error?.message, stack: error?.stack });
  }
};

// Horoscope Master Data
export const getStars = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Star.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Star API Error:", error);
    res.status(500).json({ message: "Error fetching stars", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getRasis = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Rasi.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Rasi API Error:", error);
    res.status(500).json({ message: "Error fetching rasis", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getLaknams = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Laknam.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Laknam API Error:", error);
    res.status(500).json({ message: "Error fetching laknams", errorMsg: error?.message, stack: error?.stack });
  }
};

export const getGothrams = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Gothram.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error: any) {
    console.error("Gothram API Error:", error);
    res.status(500).json({ message: "Error fetching gothrams", errorMsg: error?.message, stack: error?.stack });
  }
};
