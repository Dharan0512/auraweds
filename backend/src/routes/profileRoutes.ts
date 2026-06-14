import { Router } from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  uploadPhotos,
  deletePhoto,
  uploadHoroscope,
  deleteHoroscope,
  saveDraft,
  getDraft,
  getOtherProfile,
  updatePrivacySettings,
  searchProfiles,
  getViewers,
  requestCaste,
  requestSubcaste,
} from "../controllers/profileController";
import { protect } from "../middlewares/authMiddleware";
import { searchFilterGating } from "../middlewares/subscriptionMiddleware";
import { upload, uploadHoroscopeFile } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/me", protect, getMyProfile);
router.get("/draft", protect, getDraft);
router.post("/draft", protect, saveDraft);
router.patch("/", protect, createOrUpdateProfile);
router.post("/photos", protect, upload.single("photo"), uploadPhotos);
router.delete("/photos/:photoId", protect, deletePhoto);
router.post("/horoscope", protect, uploadHoroscopeFile.single("horoscope"), uploadHoroscope);
router.delete("/horoscope", protect, deleteHoroscope);

router.get("/user/:id", protect, getOtherProfile);
router.get("/search", protect, searchFilterGating, searchProfiles);
router.patch("/privacy", protect, updatePrivacySettings);
router.get("/viewers", protect, getViewers);

// Self-expanding master data requests
router.post("/caste-request", protect, requestCaste);
router.post("/subcaste-request", protect, requestSubcaste);

export default router;
