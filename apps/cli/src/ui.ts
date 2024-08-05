export const generateCarInfoBlock = (car: {
  id: string;
  brand: string;
  name: string;
  yearOfManufacture: number;
  price: number;
}): string => {
  return `
  🚗 Car Info
  ---
  ID: ${car.id}
  Brand: ${car.brand}
  Name: ${car.name}
  Year of Manufacture: ${car.yearOfManufacture}
  Price: $${car.price.toLocaleString()}
  `;
};
