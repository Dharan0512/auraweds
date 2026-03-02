import { Router } from "express";
import { getDailyMatches } from "../controllers/matchController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/daily", protect, getDailyMatches);

export default router;
