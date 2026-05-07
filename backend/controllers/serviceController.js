const Service = require("../models/serviceModel");
const Component = require("../models/componentModel");
const Bike = require("../models/bikeModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createService = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const service = await Service.create(req.body);

    if (req.body.component) {
      const component = await Component.findById(req.body.component);

      if (!component) {
        return res.status(404).json({
          status: "fail",
          message: "No component found with that ID",
        });
      }

      const bike = await Bike.findById(component.bike);

      component.installedAtKm = bike.totalKm;

      await component.save();
    }

    res.status(201).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const features = new APIFeatures(
      Service.find({ user: req.user.id })
        .populate("bike")
        .populate("component"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const services = await features.query;

    res.status(200).json({
      status: "success",
      results: services.length,
      data: {
        services,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("bike")
      .populate("component");

    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "No service found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
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

    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "No service found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "No service found with that ID",
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
