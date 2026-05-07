const express = require("express");
const rideController = require("./../controllers/rideController");
const authController = require("./../controllers/authController");

const rideRouter = express.Router();

rideRouter
  .route("/")
  .get(authController.protect, rideController.getAllRides)
  .post(authController.protect, rideController.createRide);

rideRouter
  .route("/:id")
  .get(authController.protect, rideController.getRide)
  .patch(authController.protect, rideController.updateRide)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    rideController.deleteRide
  );

module.exports = rideRouter;
