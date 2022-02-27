// data
const model = require("../models/cars.model");
const path = require("path");

function getCars(req, res) {
  return res.json(model);
}

const findById = (req) => {
  const carId = Number(req.params.carId) | 0;

  if (carId === 0) {
    return res.status(400).json({
      error: "Invalid ID",
    });
  }

  const result = model.find((c) => c.id === carId);

  return result;
};

function getCarById(req, res) {
  const result = findById(req);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({
      error: "Car not found",
    });
  }
}

function getCarImageById(req, res) {
  const filePath = path.join(__dirname, "..", "public", "ferrari-f50.jpg");
  res.sendFile(filePath);
}

function addCar(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing name data",
    });
  }

  const newCar = {
    id: model.length + 1,
    name: req.body.name,
  };

  model.push(newCar);
  res.status(201).json(newCar);
}

module.exports = {
  getCars,
  getCarById,
  addCar,
  getCarImageById,
};
