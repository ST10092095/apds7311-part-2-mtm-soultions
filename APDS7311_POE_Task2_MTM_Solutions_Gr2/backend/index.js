import "./config.js";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import heltmet from "helmet";
import morgan from "morgan";
import e from "express";
import connectDB from "./db/conn.js";
import authEmployeeRoutes from "./Routes/authEmployee.js";
import bankRoutes from "./Routes/bank.js";
import authRoutes from "./Routes/auth.js";
import paymentRoutes from "./Routes/payment.js";

const app = express();
const PORT = process.env.PORT || 6000;

//Connect database
connectDB();

//Middleware
app.use(express.json()); 
app.use(heltmet()); //extra layer of security to API
app.use(morgan("combined")); // logs HTTP requests

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET,POST,PUT,DELETE,OPTIONS"],
  allowedHeaders: ["Content-Type, Authorization"],
  credentials: true, 
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/authEmployee', authEmployeeRoutes);
app.use('/api/bank',bankRoutes)
app.use('/api', paymentRoutes);

//SSL Certificate and Key
const options = {
  key: fs.readFileSync("keys/privatekey.pem"),
  cert: fs.readFileSync("keys/certificate.pem"),
};


https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });