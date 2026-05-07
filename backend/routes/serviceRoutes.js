const express = require("express");
const serviceController = require("./../controllers/serviceController");
const authController = require("./../controllers/authController");

const serviceRouter = express.Router();

serviceRouter
  .route("/")
  .get(authController.protect, serviceController.getAllServices)
  .post(authController.protect, serviceController.createService);
serviceRouter
  .route("/:id")
  .get(authController.protect, serviceController.getService)
  .patch(authController.protect, serviceController.updateService)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    serviceController.deleteService
  );

module.exports = serviceRouter;
