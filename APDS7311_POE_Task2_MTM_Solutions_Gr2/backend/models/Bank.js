import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    
    BankName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z\s'-]+$/, "Invalid name"],
    },

    swiftCode: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Z0-9]{8,11}$/, "Invalid Swift code"], // SWIFT/BIC code (8 or 11 characters, letters and numbers)
    },    
});

export default mongoose.model("Bank", bankSchema);