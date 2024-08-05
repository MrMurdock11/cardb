import { Document, ObjectId, WithId } from 'mongodb';

import dbClient from './db.client';
import { Car } from './entities/car.entity';

export type FilterOptions = {
  [key in keyof Omit<Car, 'id'>]?: 'asc' | 'desc';
};

type NormalizedFilterOptions = {
  [key in keyof Omit<Car, 'id'>]: 1 | -1;
};

const getCars = async (filter?: FilterOptions): Promise<Car[]> => {
  const context = dbClient.getDbContext();
  const collection = context.collection('cars');
  const findCursor = collection.find();
  if (filter === undefined) {
    const cars = await findCursor.toArray();

    return cars.map(mapperToModel);
  }

  const normalizedFilters = normalizeFilter(filter);
  const cars = await findCursor.sort(normalizedFilters).toArray();

  return cars.map(mapperToModel);
};

const getCarById = async (id: string): Promise<Car | null> => {
  const context = dbClient.getDbContext();
  const collection = context.collection('cars');
  const car = await collection.findOne({ _id: new ObjectId(id) });

  return car && mapperToModel(car);
};

const addCar = async (car: Omit<Car, 'id'>): Promise<void> => {
  const context = dbClient.getDbContext();
  const collection = context.collection('cars');

  const entity = mapperToEntity(car);
  await collection.insertOne(entity);
};

const updateCar = async (
  id: string,
  updateFilter: Partial<Omit<Car, 'id'>>,
): Promise<void> => {
  const context = dbClient.getDbContext();
  const collection = context.collection('cars');

  const entity = mapperToEntity(updateFilter);
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { price: entity.price } },
    { upsert: true },
  );
};

const deleteCar = async (id: string): Promise<void> => {
  const context = dbClient.getDbContext();
  const collection = context.collection('cars');

  await collection.deleteOne({ _id: new ObjectId(id) });
};

const mapperToModel = (entity: WithId<Document>): Car => {
  const { _id, brand, name, year_of_manufacture, price } = entity;

  return {
    id: _id.toString(),
    brand,
    name,
    yearOfManufacture: year_of_manufacture,
    price,
  } as Car;
};

const mapperToEntity = (car: Partial<Omit<Car, 'id'>>): Document => {
  const { brand, name, yearOfManufacture, price } = car;

  return {
    brand,
    name,
    year_of_manufacture: yearOfManufacture,
    price,
  };
};

const normalizeFilter = (filter: FilterOptions): NormalizedFilterOptions => {
  return Object.entries(filter).reduce((result, [field, sort]) => {
    if (field === 'yearOfManufacture') {
      field = 'year_of_manufacture';
    }

    result[field as keyof Omit<Car, 'id'>] = sort === 'asc' ? 1 : -1;
    return result;
  }, {} as NormalizedFilterOptions);
};

export default { getCars, getCarById, addCar, updateCar, deleteCar };
