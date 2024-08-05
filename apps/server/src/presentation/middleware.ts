import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import configService from '../application/config.service';

export const verifyToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === undefined) return res.sendStatus(401);

  jwt.verify(token, configService.getTokenSecret(), (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    next();
  });
};
