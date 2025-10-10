import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    password: {
      type: String,
    },
    auth0Id: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["local", "auth0"],
      default: "local",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
