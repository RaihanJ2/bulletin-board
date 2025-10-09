import bcrypt from "bcrypt";
import passport from "../config/passport.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      provider: "local",
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ [register] Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info?.message || "Login failed" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ message: "Login successful", user });
    });
  })(req, res, next);
};
export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logout successful" });
  });
};

export const getProfile = async (req, res) => {
  res.json({
    message: "This is a protected route",
    user: {
      _id: req.user._id,
      name: req.user.fullname,
      email: req.user.email,
      bio: req.user.bio || "",
    },
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullname: name, bio },
      { new: true }
    );
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const googleAuth = passport.authenticate("auth0", {
  scope: "openid email profile",
  connection: "google-oauth2",
});

export const googleAuthCallback = [
  passport.authenticate("auth0", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  },
];
