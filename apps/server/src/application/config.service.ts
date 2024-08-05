import { Secret } from 'jsonwebtoken';

import { DEFAULT_PORT } from '../constant';

const getPort = (): string => {
  return process.env.PORT || DEFAULT_PORT;
};

const getTokenSecret = (): Secret => {
  return process.env.TOKEN_SECRET || '';
};

const getMongoUri = () => {
  return process.env.MONGO_URI || '';
};

export default { getPort, getTokenSecret, getMongoUri };
