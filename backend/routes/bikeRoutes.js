const express = require("express");
const bikeController = require("./../controllers/bikeController");
const authController = require("./../controllers/authController");

const bikeRouter = express.Router();

bikeRouter
  .route("/")
  .get(authController.protect, bikeController.getAllBikes)
  .post(authController.protect, bikeController.createBike);

bikeRouter
  .route("/:id")
  .get(authController.protect, bikeController.getBike)
  .patch(authController.protect, bikeController.updateBike)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    bikeController.deleteBike
  );

module.exports = bikeRouter;
