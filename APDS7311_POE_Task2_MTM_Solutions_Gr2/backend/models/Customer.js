import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z\s'-]+$/, "Invalid name"],
  },

  idNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{13}$/, "Invalid ID number"],
  },

  accountNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{7,11}$/, "Invalid account number"],
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^{[A-Za-z0-9_]+$/,
      "Only aphanumeric characters and underscores are allowed",
    ],
  },

  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ],
  },
});

export default mongoose.model("Customer", customerSchema);