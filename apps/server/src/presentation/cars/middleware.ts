import { checkSchema } from 'express-validator';

export const checkGetCar = checkSchema(
  {
    id: {
      notEmpty: {
        errorMessage: 'ID parameter is required and cannot be empty.',
      },
    },
  },
  ['params'],
);

export const checkAddCar = checkSchema(
  {
    brand: {
      isString: {
        errorMessage: 'Brand must be a string.',
      },
      notEmpty: {
        errorMessage: 'Brand is required and cannot be empty.',
      },
    },
    name: {
      isString: {
        errorMessage: 'Name must be a string.',
      },
      notEmpty: {
        errorMessage: 'Name is required and cannot be empty.',
      },
    },
    yearOfManufacture: {
      isInt: {
        errorMessage: 'Year of Manufacture must be an integer.',
      },
      notEmpty: {
        errorMessage: 'Year of Manufacture is required and cannot be empty.',
      },
    },
    price: {
      isInt: {
        errorMessage: 'Price must be an integer.',
      },
      notEmpty: {
        errorMessage: 'Price is required and cannot be empty.',
      },
    },
  },
  ['body'],
);

export const checkUpdateCar = checkSchema(
  {
    id: {
      notEmpty: {
        errorMessage: 'ID parameter is required and cannot be empty.',
      },
    },
    brand: {
      optional: true,
      isString: {
        errorMessage: 'Brand must be a string.',
      },
    },
    name: {
      optional: true,
      isString: {
        errorMessage: 'Name must be a string.',
      },
    },
    yearOfManufacture: {
      optional: true,
      isInt: {
        errorMessage: 'Year of Manufacture must be an integer.',
      },
    },
    price: {
      optional: true,
      isInt: {
        errorMessage: 'Price must be an integer.',
      },
    },
  },
  ['body', 'params'],
);

export const checkDeleteCar = checkSchema(
  {
    id: {
      notEmpty: {
        errorMessage: 'ID parameter is required and cannot be empty.',
      },
    },
  },
  ['params'],
);
