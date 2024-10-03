import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// //base route
// router.get("/", (req, res) => {
//   res.send("Hello payment");
// });

//get all payment
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
})

//create payment
//get payment by id
//update payment by id
//delete payment by id

export default router;
