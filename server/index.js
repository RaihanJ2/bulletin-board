import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passport from "passport";
import session from "express-session";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT;

/*~~~~ MIDDLEWARE ~~~~*/

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
