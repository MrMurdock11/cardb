import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

import carsService from '../../application/cars.service';
import carsRepository from '../../infrastructure/cars.repository';

const getCars = asyncHandler(async (req, res) => {
  const { filter } = req.body ?? {};

  const cars = await carsService.getCars(filter);
  res.status(201).send(cars);
});

const getCar = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  try {
    const { id } = req.params;
    const car = await carsRepository.getCarById(id);
    res.status(200).send(car);
  } catch (error) {
    res.status(401).json({ message: '' });
  }
});

const addCar = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const car = req.body;

  try {
    await carsRepository.addCar(car);
    res.status(201).send();
  } catch (error) {
    res.status(401).json({ message: '' });
  }
});

const updateCar = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const { id } = req.params;
  const updateFilter = req.body;

  try {
    await carsService.updateCar(id, updateFilter);
    res.status(201).send();
  } catch (error) {
    res.status(401).json({ message: '' });
  }
});

const deleteCar = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const { id } = req.params;

  try {
    await carsService.deleteCar(id);
    res.status(201).send();
  } catch (error) {
    res.status(401).json({ message: '' });
  }
});

export default {
  getCars,
  getCar,
  addCar,
  updateCar,
  deleteCar,
};
