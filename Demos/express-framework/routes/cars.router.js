const express = require("express");
const carsController = require("../controllers/cars.controller");

const carsRouter = express.Router();

carsRouter.get("/", carsController.getCars);
carsRouter.get("/:carId", carsController.getCarById);
carsRouter.get("/:carId/image", carsController.getCarImageById);
carsRouter.post("/", carsController.addCar);

module.exports = carsRouter;
