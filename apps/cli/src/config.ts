import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, '../config.json');

interface Config {
  jwtToken?: string;
}

export const loadConfig = (): Config => {
  if (!fs.existsSync(configPath)) {
    return {};
  }
  const rawData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(rawData);
};

export const saveConfig = (config: Config): void => {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};
