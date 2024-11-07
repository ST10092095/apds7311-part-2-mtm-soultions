import express from "express";
import Bank from "../models/Bank.js";

const router = express.Router();

// Route to create a new bank entry
// POST route to create a new bank
router.post('/', async (req, res) => {
    const { BankName, swiftCode } = req.body;
  
    // Validation or required fields
    if (!BankName || !swiftCode) {
      return res.status(400).json({ message: 'Please make sure to fill all required fields' });
    }
  
    // Create a new bank
    const newBank = new Bank({
      BankName,
      swiftCode
    });
  
    try {
      const savedBank = await newBank.save();
      res.status(201).json(savedBank); // Return the saved bank record
    } catch (err) {
      console.error('Error creating bank:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

// Route to get all bank entries
router.get("/", async (req, res) => {
  try {
    const banks = await Bank.find(); 

    res.json(banks); // Return the list of banks
  } catch (err) {
    console.error("Error fetching banks:", err);
    res.status(500).json({ message: "Error fetching banks", error: err.message });
  }
});

export default router;