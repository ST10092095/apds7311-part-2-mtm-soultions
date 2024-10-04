import ExpressBrute from "express-brute";
import MongoStore from "express-brute-mongoose";
import mongoose from "mongoose";

const bruteForceSchema = new mongoose.Schema({
  _id: String,
  data: {
    count: Number,
    lastRequest: Date,
    firstRequest: Date,
  },
  expires: { type: Date, index: { expires: "id" } },
});

const BruteForceModel = mongoose.model("bruteForce", bruteForceSchema);

const store = new MongoStore(BruteForceModel);

const bruteForce = new ExpressBrute(store, {
  freeRetries: 2,
  minWait: 1 * 60 * 1000, // 5 minutes
  maxWait: 2 * 60 * 1000, // 1 hour
  failCallback: function (req, res, next, nextValidRequestDate) {
    res.status(429).json({
      message: "Too many failed attempts. Please try again later.",
      nextValidRequestDate,
    });
  },
});
export default bruteForce;
