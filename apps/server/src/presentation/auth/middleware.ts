import { checkSchema } from 'express-validator';

export const checkSignIn = checkSchema(
  {
    login: { notEmpty: { errorMessage: 'The login cannot be empty.' } },
    password: { notEmpty: { errorMessage: 'The password cannot be empty.' } },
  },
  ['body'],
);
