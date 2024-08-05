import axios from 'axios';

import { saveConfig } from './config';

const API_URL = 'http://localhost:3000/api';

export const login = async (login: string, password: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign-in`, {
      login,
      password,
    });
    const token = response.data.token;
    saveConfig({ jwtToken: token });
    console.log('Login successful');
  } catch (error: any) {
    console.error(
      'Login failed:',
      error.response ? error.response.data.message : error.message,
    );
  }
};
