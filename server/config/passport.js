import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as Auth0Strategy } from "passport-auth0";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isValid = bcrypt.compare(password, user.password);

        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    async (accessToken, refreshToken, extraParams, profile, done) => {
      try {
        let user = await User.findOne({ auth0Id: profile.id });

        if (!user) {
          // Create new user
          user = new User({
            auth0Id: profile.id,
            email: profile.emails?.[0]?.value,
            provider: "auth0",
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ [Auth0Strategy] Error:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
