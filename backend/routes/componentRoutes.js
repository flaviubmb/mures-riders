const express = require("express");
const componentController = require("./../controllers/componentController");
const authController = require("./../controllers/authController");

const componentRouter = express.Router();

componentRouter
  .route("/")
  .get(authController.protect, componentController.getAllComponents)
  .post(authController.protect, componentController.createComponent);

componentRouter
  .route("/:id")
  .get(authController.protect, componentController.getComponent)
  .patch(authController.protect, componentController.updateComponent)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    componentController.deleteComponent
  );

module.exports = componentRouter;
