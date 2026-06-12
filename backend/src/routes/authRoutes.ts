import { Router } from "express";
import { register, login, changePassword } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";
import { validateBody } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/authValidators";
import { authLimiter } from "../config/security";

const router = Router();

router.post("/register", authLimiter, validateBody(registerSchema), register);
router.post("/login", authLimiter, validateBody(loginSchema), login);

// Example protected route for testing
router.get("/me", protect, (req, res) => {
  res.json({ message: "You have access to protected auth routes." });
});

router.post("/change-password", protect, changePassword);

export default router;
