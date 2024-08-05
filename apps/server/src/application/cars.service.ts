import carsRepository, {
  FilterOptions,
} from '../infrastructure/cars.repository';
import { Car } from '../infrastructure/entities/car.entity';

const getCars = async (filter?: FilterOptions): Promise<Car[]> => {
  const cars = await carsRepository.getCars(filter);
  return cars;
};

const getCar = async (id: string): Promise<Car | null> => {
  const car = await carsRepository.getCarById(id);
  return car;
};

const addCar = async (car: Omit<Car, 'id'>): Promise<void> => {
  await carsRepository.addCar(car);
};

const updateCar = async (
  id: string,
  updateFilter: Omit<Car, 'id'>,
): Promise<void> => {
  await carsRepository.updateCar(id, updateFilter);
};

const deleteCar = async (id: string): Promise<void> => {
  await carsRepository.deleteCar(id);
};

export default { getCars, getCar, addCar, updateCar, deleteCar };
