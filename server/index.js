import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passport from "passport";
import session from "express-session";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Check if running in production
const isProduction = process.env.NODE_ENV === "production";

// CRITICAL: Trust proxy for Render (must be before session)
app.set("trust proxy", 1);

// CORS must be before other middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration - FIXED
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      touchAfter: 24 * 3600, // Lazy session update
    }),
    // IMPORTANT: cookie settings must be inside the cookie object
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true, // Prevents client-side JS from accessing cookie
      secure: isProduction, // true in production (requires HTTPS)
      sameSite: isProduction ? "none" : "lax", // 'none' allows cross-origin
    },
    name: "sessionId", // Custom name instead of default 'connect.sid'
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Debug middleware (optional - helps troubleshooting)
app.use((req, res, next) => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📍 Request:", req.method, req.path);
  console.log("🔑 Session ID:", req.sessionID);
  console.log("✓ Authenticated:", req.isAuthenticated());
  console.log("👤 User:", req.user?.fullname || "None");
  console.log("🍪 Cookie:", req.headers.cookie ? "Present" : "Missing");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  next();
});

// Routes
app.use("/", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
