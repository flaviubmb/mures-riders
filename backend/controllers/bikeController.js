const Bike = require("../models/bikeModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createBike = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const newBike = await Bike.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bike: newBike,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllBikes = async (req, res) => {
  try {
    const features = new APIFeatures(
      Bike.find({ user: req.user.id }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const bikes = await features.query;

    res.status(200).json({
      status: "success",
      results: bikes.length,
      data: {
        bikes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getBike = async (req, res) => {
  try {
    const bike = await Bike.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        bike,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBike = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const bike = await Bike.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { bike },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "No bike found with that ID",
      });
    }

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
