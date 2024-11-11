import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        imutable: true,
        trim: true,
        // match: [
        //   /^{[A-Za-z0-9_]+$/,
        //   "Only aphanumeric characters and underscores are allowed",
        // ],
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z\s'-]+$/, "Invalid name"],
    },

    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Employee", EmployeeSchema);