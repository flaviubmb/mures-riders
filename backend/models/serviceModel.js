const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
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

  component: {
    type: mongoose.Schema.ObjectId,
    ref: "Component",
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
