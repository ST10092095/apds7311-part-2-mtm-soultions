import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  customer: {
    type: String,
    ref: "Customer",
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    min: 0, // Minimum amount should be greater than or equal to 0
  },
  currency: {
    type: String,
    required: true,
    trim: true,
    enum: ["USD", "EUR", "ZAR", "GBP"], // Add other relevant currencies as needed
    match: [/^[A-Z]{3}$/, "Invalid currency"], // ISO 4217 Currency code (3 uppercase letters)
  },
  provider: {
    type: String,
    required: true,
    enum: ["FNB", "Capitec", "Netbank","Standard Bank","Investec", "ABSA","Bidvest Bank" ], // Define available payment providers
    match: [/^[a-zA-Z0-9\s]+$/, "Invalid provider name"], // Alphanumeric provider name (allows spaces)
  },
  recipientAccount: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{7,11}$/, "Invalid account number"], // Recipient bank account number (7–12 digits)
  },
  swiftCode: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Z0-9]{8,11}$/, "Invalid Swift code"], // SWIFT/BIC code (8 or 11 characters, letters and numbers)
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    imutable: true,
  },
});

export default mongoose.model("Payment", paymentSchema);