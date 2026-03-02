import { Request, Response } from "express";
import {
  Country,
  State,
  City,
  MotherTongue,
  Religion,
  Caste,
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries" });
  }
};

export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country_id } = req.query;
    const whereClause: any = { isActive: true };
    if (country_id) whereClause.countryId = country_id;

    const data = await State.findAll({ where: whereClause });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching states" });
  }
};

export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state_id } = req.query;
    const whereClause: any = { isActive: true };
    if (state_id) whereClause.stateId = state_id;

    const data = await City.findAll({ where: whereClause });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching mother tongues" });
  }
};

export const getReligions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Religion.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching religions" });
  }
};

export const getCastes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { religion_id } = req.query;
    const whereClause: any = { isActive: true };
    if (religion_id) whereClause.religionId = religion_id;

    const data = await Caste.findAll({ where: whereClause });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching castes" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching heights" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching educations" });
  }
};

export const getEmploymentTypes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await EmploymentType.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employment types" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching occupations" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching currencies" });
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching income ranges" });
  }
};

// Horoscope Master Data
export const getStars = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Star.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stars" });
  }
};

export const getRasis = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Rasi.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rasis" });
  }
};

export const getLaknams = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Laknam.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching laknams" });
  }
};

export const getGothrams = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await Gothram.findAll({ where: { isActive: true } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gothrams" });
  }
};
