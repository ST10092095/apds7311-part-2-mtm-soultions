import "./config.js";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import heltmet from "helmet";
import morgan from "morgan";
import e from "express";
import connectDB from "./db/conn.js";
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

//Routes
app.use('/api/auth', authRoutes);
app.use('/api', paymentRoutes);

//SSL Certificate and Key
const options = {
  key: fs.readFileSync("keys/privatekey.pem"),
  cert: fs.readFileSync("keys/certificate.pem"),
};


// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});