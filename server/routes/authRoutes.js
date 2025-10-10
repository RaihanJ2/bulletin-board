import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  googleAuth,
  googleAuthCallback,
  updateProfile,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../controllers/passwordRController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth/google", googleAuth);
router.get("/auth/callback", googleAuthCallback);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", verifyResetToken);
router.post("/reset-password/:token", resetPassword);

export default router;
