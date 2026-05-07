const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Record must belong to a user"],
  },

  bike: {
    type: mongoose.Schema.ObjectId,
    ref: "Bike",
    required: true,
  },

  distance: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
