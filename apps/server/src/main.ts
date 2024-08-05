import 'dotenv/config';
import express, { Request } from 'express';

import configService from './application/config.service';
import db from './infrastructure/db.client';
import authRouter from './presentation/auth/auth.routes';
import carsRouter from './presentation/cars/cars.routes';

const app = express();
app.use(express.json());
app.use('/api', authRouter, carsRouter);

const port = configService.getPort();
(async () => {
  await db.init();

  app.listen(port, () => {
    console.log('The server is listening port: http://localhost:' + port);
  });
})();
