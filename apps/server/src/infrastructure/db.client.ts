import { MongoClient } from 'mongodb';

import configService from '../application/config.service';

// const uri = `mongodb://localhost:27017/${process.env.DATABASE}`
const client = new MongoClient(configService.getMongoUri());

const init = async () => {
  try {
    await client.connect();
    console.log('mongodb:connected');
  } catch (error) {
    console.log(error);
  }
};

const getClient = () => client;

const getDbContext = () => client.db('cardb');

export default { init, getClient, getDbContext };
