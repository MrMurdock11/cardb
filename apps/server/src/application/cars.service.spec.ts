import carsRepository, {
  FilterOptions,
} from '../infrastructure/cars.repository';
import { Car } from '../infrastructure/entities/car.entity';
import carsService from './cars.service';

jest.mock('../infrastructure/cars.repository');

describe('Cars Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCars', () => {
    it('should return a list of cars', async () => {
      const cars: Car[] = [
        {
          id: '1',
          brand: 'Toyota',
          name: 'Corolla',
          yearOfManufacture: 2020,
          price: 20000,
        },
        {
          id: '2',
          brand: 'Honda',
          name: 'Civic',
          yearOfManufacture: 2019,
          price: 18000,
        },
      ];
      (carsRepository.getCars as jest.Mock).mockResolvedValue(cars);

      const result = await carsService.getCars();
      expect(result).toEqual(cars);
      expect(carsRepository.getCars).toHaveBeenCalledTimes(1);
    });

    it('should return filtered cars', async () => {
      const filter: FilterOptions = { brand: 'asc' };
      const cars: Car[] = [
        {
          id: '1',
          brand: 'Toyota',
          name: 'Corolla',
          yearOfManufacture: 2020,
          price: 20000,
        },
      ];
      (carsRepository.getCars as jest.Mock).mockResolvedValue(cars);

      const result = await carsService.getCars(filter);
      expect(result).toEqual(cars);
      expect(carsRepository.getCars).toHaveBeenCalledWith(filter);
      expect(carsRepository.getCars).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCar', () => {
    it('should return a car by ID', async () => {
      const car: Car = {
        id: '1',
        brand: 'Toyota',
        name: 'Corolla',
        yearOfManufacture: 2020,
        price: 20000,
      };
      (carsRepository.getCarById as jest.Mock).mockResolvedValue(car);

      const result = await carsService.getCar('1');
      expect(result).toEqual(car);
      expect(carsRepository.getCarById).toHaveBeenCalledWith('1');
      expect(carsRepository.getCarById).toHaveBeenCalledTimes(1);
    });

    it('should return null if car not found', async () => {
      (carsRepository.getCarById as jest.Mock).mockResolvedValue(null);

      const result = await carsService.getCar('999');
      expect(result).toBeNull();
      expect(carsRepository.getCarById).toHaveBeenCalledWith('999');
      expect(carsRepository.getCarById).toHaveBeenCalledTimes(1);
    });
  });

  describe('addCar', () => {
    it('should add a new car', async () => {
      const newCar: Omit<Car, 'id'> = {
        brand: 'Toyota',
        name: 'Corolla',
        yearOfManufacture: 2020,
        price: 20000,
      };
      await carsService.addCar(newCar);

      expect(carsRepository.addCar).toHaveBeenCalledWith(newCar);
      expect(carsRepository.addCar).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateCar', () => {
    it('should update an existing car', async () => {
      const updatedCar: Omit<Car, 'id'> = {
        brand: 'Toyota',
        name: 'Camry',
        yearOfManufacture: 2021,
        price: 25000,
      };
      await carsService.updateCar('1', updatedCar);

      expect(carsRepository.updateCar).toHaveBeenCalledWith('1', updatedCar);
      expect(carsRepository.updateCar).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCar', () => {
    it('should delete a car by ID', async () => {
      await carsService.deleteCar('1');

      expect(carsRepository.deleteCar).toHaveBeenCalledWith('1');
      expect(carsRepository.deleteCar).toHaveBeenCalledTimes(1);
    });
  });
});
