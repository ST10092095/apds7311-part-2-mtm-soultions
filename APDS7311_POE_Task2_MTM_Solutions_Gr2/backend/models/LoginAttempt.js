import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    imutable: true,
    trim: true,
    match: [
      /^{[A-Za-z0-9_]+$/,
      "Only aphanumeric characters and underscores are allowed",
    ],
  },
  ipAddress: {
    type: String,
    required: true,
    imutable: true,
    match: [
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])+$/,
      "Invalid IP address",
    ],
  },
  seccessfulLogin: {
    type: Boolean,
    required: true,
    imutable: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    imutable: true,
  },
});

export default mongoose.model("LoginAttempt", loginAttemptSchema);
