const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Record must belong to a user"],
  },

  brand: {
    type: String,
    required: [true, "Bike brand is required!"],
  },

  model: {
    type: String,
    required: [true, "Bike model is required!"],
  },

  type: {
    type: String,
    enum: ["Mountain Bike", "Road Bike", "E-Bike", "BMX"],
  },

  wheelSize: {
    type: String,
    enum: ['20"', '24"', '26"', '27.5"', '28"', '29"'],
    required: [true, "Wheel size is required!"],
  },

  image: {
    type: String,
    default: "",
  },

  totalKm: {
    type: Number,
    default: 0,
    required: [true, "Total km is required!"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);
module.exports = Bike;
