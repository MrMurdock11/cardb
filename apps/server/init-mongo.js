db = db.getSiblingDB('cardb');

db.users.drop();

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['login', 'hashed_password'],
      properties: {
        login: {
          bsonType: 'string',
        },
        hashed_password: {
          bsonType: 'string',
          maximum: 512,
        },
        salt: {
          bsonType: 'string',
        },
        created_at: {
          bsonType: 'date',
        },
      },
    },
  },
  validationLevel: 'strict',
  validationAction: 'error',
});

db.users.insertOne({
  login: 'ghost',
  hashed_password:
    '8fc0423578f9fa8b83d182c4207700b07fae5c61686001b1e21f7db188c5b4eac041dced1ec396e670fbb51b0e20758272276f88d4e9f1f6b086e7576bbb47f6',
  salt: '7e5170d0fdd301844fb4aca1572f9324',
  created_at: new Date(),
});

db.cars.drop();

db.createCollection('cars', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['brand', 'name'],
      properties: {
        brand: {
          bsonType: 'string',
        },
        name: {
          bsonType: 'string',
        },
        year_of_manufacture: {
          bsonType: 'int',
        },
        price: {
          bsonType: 'int',
        },
      },
    },
  },
  validationLevel: 'strict',
  validationAction: 'error',
});

db.cars.insertMany([
  { brand: 'Toyota', name: 'Camry', year_of_manufacture: 2018, price: 24000 },
  { brand: 'Honda', name: 'Civic', year_of_manufacture: 2019, price: 22000 },
  { brand: 'Ford', name: 'Mustang', year_of_manufacture: 2020, price: 26000 },
  {
    brand: 'Chevrolet',
    name: 'Malibu',
    year_of_manufacture: 2017,
    price: 23000,
  },
  { brand: 'BMW', name: '320i', year_of_manufacture: 2018, price: 35000 },
  { brand: 'Audi', name: 'A4', year_of_manufacture: 2019, price: 37000 },
  {
    brand: 'Mercedes',
    name: 'C-Class',
    year_of_manufacture: 2020,
    price: 40000,
  },
  {
    brand: 'Hyundai',
    name: 'Elantra',
    year_of_manufacture: 2017,
    price: 20000,
  },
  { brand: 'Nissan', name: 'Altima', year_of_manufacture: 2018, price: 24000 },
  {
    brand: 'Volkswagen',
    name: 'Passat',
    year_of_manufacture: 2019,
    price: 28000,
  },
]);
