import express from 'express';

import { verifyToken } from '../middleware';
import controller from './cars.controller';
import {
  checkAddCar,
  checkDeleteCar,
  checkGetCar,
  checkUpdateCar,
} from './middleware';

const router = express.Router();

router.get('/cars', verifyToken, controller.getCars);

router.get('/cars/:id', verifyToken, checkGetCar, controller.getCar);

router.post('/cars', verifyToken, checkAddCar, controller.addCar);

router.put('/cars/:id', verifyToken, checkUpdateCar, controller.updateCar);

router.delete('/cars/:id', verifyToken, checkDeleteCar, controller.deleteCar);

export default router;
