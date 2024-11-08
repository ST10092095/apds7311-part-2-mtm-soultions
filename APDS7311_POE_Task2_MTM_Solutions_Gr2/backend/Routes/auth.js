import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import loginAttemptLogger from "../middleware/loginAttemptLogMiddleware.js";
import bruteForce from "../middleware/bruteForceProtectionMiddleware.js";
import validator from "validator";
import PasswordValidator from "password-validator";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least one digit
  .has().symbols(1)                               // Must have at least one symbol
  .has().not().spaces();

//base route
router.get("/", (req, res) => {
  res.send("Hello auth");
});

//register
router.post("/register", async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, username, password } = req.body;

    //check if user exists
    const existingCustomer = await Customer.findOne({ $or: [{ username }] });
    if (existingCustomer) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Validate password strength
    if (!passwordSchema.validate(password)) {
      return res.status(400).json({ message: "Password is not strong enough!!" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newcustomer = new Customer({
      fullName,
      idNumber,
      accountNumber,
      username,
      password: hashedPassword,
    })
    await newcustomer.save();

    res.status(201).json({ message: "Customer created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
      console.log(err);
  }
});

//login
router.post("/login", bruteForce.prevent, loginAttemptLogger, async (req, res) => {
    try {
        const { username, password } = req.body;

        //find user by username
        const customer = await Customer.findOne({ username });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        //check password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //create a JWT token
        const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({token});

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
})

export default router;
