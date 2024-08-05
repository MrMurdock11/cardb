import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import authService from '../../application/auth.service';
import configService from '../../application/config.service';
import { SignInDto } from './dtos/sign-in.dto';

const signIn = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const { login, password } = req.body as SignInDto;

  try {
    await authService.authenticate(login, password);

    jwt.sign(
      { login },
      configService.getTokenSecret(),
      { expiresIn: '60m' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Token generation failed' });
        }
        res.status(200).json({ token });
      },
    );
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

export default { signIn };
