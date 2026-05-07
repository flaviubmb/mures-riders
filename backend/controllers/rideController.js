const Ride = require("../models/rideModel");
const Bike = require("../models/bikeModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createRide = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const bike = await Bike.findOne({
      _id: req.body.bike,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found with that ID",
      });
    }

    const ride = await Ride.create(req.body);
    bike.totalKm += ride.distance;

    await bike.save();

    res.status(201).json({
      status: "success",
      data: {
        ride,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllRides = async (req, res) => {
  try {
    const features = new APIFeatures(
      Ride.find({ user: req.user.id }).populate("bike"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const rides = await features.query;

    res.status(200).json({
      status: "success",
      results: rides.length,
      data: {
        rides,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getRide = async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("bike");

    if (!ride) {
      return res.status(404).json({
        status: "fail",
        message: "No ride found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        ride,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateRide = async (req, res) => {
  try {
    const oldRide = await Ride.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!oldRide) {
      return res.status(404).json({
        status: "fail",
        message: "No ride found with that ID",
      });
    }

    const ride = await Ride.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ride) {
      return res.status(404).json({
        status: "fail",
        message: "No ride found with that ID",
      });
    }

    const bike = await Bike.findOne({
      _id: oldRide.bike,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found with that ID",
      });
    }

    const diff = Number(ride.distance) - Number(oldRide.distance);

    bike.totalKm += diff;
    await bike.save();

    res.status(200).json({
      status: "success",
      data: {
        ride,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!ride) {
      return res.status(404).json({
        status: "fail",
        message: "No ride found with that ID",
      });
    }

    const bike = await Bike.findOne({
      _id: ride.bike,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found with that ID",
      });
    }

    bike.totalKm -= Number(ride.distance);
    await bike.save();

    await Ride.findOneAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
