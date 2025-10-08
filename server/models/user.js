import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    auth0Id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["local", "auth0"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
