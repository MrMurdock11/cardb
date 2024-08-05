import axios from 'axios';

import { loadConfig } from './config';
import { generateCarInfoBlock } from './ui';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => {
  const config = loadConfig();
  if (!config.jwtToken) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${config.jwtToken}` };
};

export const getCars = async (filter?: Record<string, any>): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/cars`, {
      headers: getAuthHeader(),
      data: filter && { filter },
    });
    console.table(response.data);
  } catch (error: any) {
    console.error(
      'Failed to get cars:',
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const getCar = async (id: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/cars/${id}`, {
      headers: getAuthHeader(),
    });
    console.log(generateCarInfoBlock(response.data));
  } catch (error: any) {
    console.error(
      `Failed to get car with ID ${id}:`,
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const addCar = async (car: Record<string, any>): Promise<void> => {
  try {
    await axios.post(`${API_URL}/cars`, car, {
      headers: getAuthHeader(),
    });
    console.log('Car added successfully');
  } catch (error: any) {
    console.error(
      `Failed to add car:`,
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const updateCar = async (
  id: string,
  updateData: Record<string, any>,
): Promise<void> => {
  try {
    await axios.put(`${API_URL}/cars/${id}`, updateData, {
      headers: getAuthHeader(),
    });
    console.log('Car updated successfully');
  } catch (error: any) {
    console.error(
      `Failed to update car with ID ${id}:`,
      error.response ? error.response.data.message : error.message,
    );
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cars/${id}`, { headers: getAuthHeader() });
    console.log('Car deleted successfully');
  } catch (error: any) {
    console.error(
      `Failed to delete car with ID ${id}:`,
      error.response ? error.response.data.message : error.message,
    );
  }
};
