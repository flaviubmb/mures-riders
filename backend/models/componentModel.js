const mongoose = require("mongoose");

const componentsType = {
  Drivetrain: ["Chain", "Cassette", "Crankset", "Derailleur"],
  Brakes: ["Disc Brake", "Brake Pads", "Rotor"],
  Suspensions: ["Fork", "Rear Shock"],
  Wheels: ["Rim", "Hub", "Spokes", "Tire"],
  Frame: ["Frame"],
};

const componentSchema = new mongoose.Schema({
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

  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: Object.keys(componentsType),
    required: true,
  },

  type: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return componentsType[this.category]?.includes(value);
      },
      message: "Invalid type for selected category",
    },
  },

  lifespanKm: {
    type: Number,
    required: true,
  },

  usedKm: {
    type: Number,
    default: 0,
  },

  installedAtKm: {
    type: Number,
    default: 0,
  },

  installedAtDate: {
    type: Date,
    default: Date.now,
  },
});

const Component = mongoose.model("Component", componentSchema);
module.exports = Component;
