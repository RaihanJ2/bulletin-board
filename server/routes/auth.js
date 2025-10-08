import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth/google", googleAuth);
router.get("/auth/callback", googleAuthCallback);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
