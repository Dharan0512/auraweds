import express from "express";
import {
  getCountries,
  getStates,
  getCities,
  getMotherTongues,
  getReligions,
  getCastes,
  getSubcastes,
  getHeights,
  getEducations,
  getEmploymentTypes,
  getOccupations,
  getCurrencies,
  getIncomeRanges,
  getStars,
  getRasis,
  getLaknams,
  getGothrams,
} from "../controllers/masterController";

const router = express.Router();

// Locations
router.get("/countries", getCountries);
router.get("/states", getStates);
router.get("/cities", getCities);

// Demographics
router.get("/mother-tongues", getMotherTongues);
router.get("/religions", getReligions);
router.get("/castes", getCastes);
router.get("/subcastes", getSubcastes);

// Physical
router.get("/heights", getHeights);

// Professional
router.get("/educations", getEducations);
router.get("/employment-types", getEmploymentTypes);
router.get("/occupations", getOccupations);

// Income
router.get("/currencies", getCurrencies);
router.get("/income-ranges", getIncomeRanges);

// Horoscope Master Data
router.get("/stars", getStars);
router.get("/rasis", getRasis);
router.get("/laknams", getLaknams);
router.get("/gothrams", getGothrams);

export default router;
