import express from "express";
import Payment from "../models/Payment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// //base route
// router.get("/", (req, res) => {
//   res.send("Hello payment");
// });

//get all payment
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
})

//create payment
router.post("/", authMiddleware, async (req, res) => {
  const { customer, amount, currency, provider, swiftCode, recipientAccount } = req.body;

  if (!amount || !currency || !provider || !swiftCode|| !recipientAccount) {
    return res.status(400).json({ message: "Please make sure to fill all required fields" });
  }
  //creating the new payment for customer 
  const newPayment = new Payment({
    customer,
    amount,
    currency,
    provider,
    swiftCode,
    recipientAccount
  });

  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
   
})
//get payment by id
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } 
  catch (err) {
    console.error("Error getting payment:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
})

//update payment by id
router.put("/:id", authMiddleware, async (req, res) => {
  const{customer, amount, currency, provider, recipientAccount, swiftCode} = req.body;

  //validate request
  if (!amount && !currency && !provider && !recipientAccount) {
    return res
    .status(400)
    .json({ message: "Please ensure that there are fields to update" });
  }
  const updatedFields = {};
  if (customer) updatedFields.customer = customer;
  if (amount) updatedFields.amount = amount;
  if (currency) updatedFields.currency = currency;
  if (provider) updatedFields.provider = provider;
  if(swiftCode) updatedFields.swiftCode = swiftCode;
  if (recipientAccount) updatedFields.recipientAccount = recipientAccount;

  try {
    
    const payment = await Payment.findByIdAndUpdate(
      req.params.id, updatedFields, { new: true });
    
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    res.json(payment);
  }  
  catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
})

//delete payment by id
router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } 
  catch (err) {
    console.error("Error deleting payment:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
})

export default router;
