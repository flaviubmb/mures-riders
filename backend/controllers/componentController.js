const Component = require("../models/componentModel");
const Bike = require("../models/bikeModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createComponent = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const bike = await Bike.findOne({
      _id: req.body.bike,
      user: req.user.id,
    });

    if (!bike) {
      return res.status(404).json({
        status: "fail",
        message: "Bike not found",
      });
    }

    req.body.installedAtKm = bike.totalKm;

    const newComponent = await Component.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        component: newComponent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllComponents = async (req, res) => {
  try {
    const features = new APIFeatures(
      Component.find({ user: req.user.id }).populate("bike"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const components = await features.query;

    res.status(200).json({
      status: "success",
      results: components.length,
      data: {
        components,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getComponent = async (req, res) => {
  try {
    const component = await Component.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("bike");

    if (!component) {
      return res.status(404).json({
        status: "fail",
        message: "No component found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        component,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findOneAndUpdate(
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

    if (!component) {
      return res.status(404).json({
        status: "fail",
        message: "No component found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        component,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!component) {
      return res.status(404).json({
        status: "fail",
        message: "No component found with that ID",
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
