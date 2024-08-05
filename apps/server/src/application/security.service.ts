import crypto from 'node:crypto';
import { promisify } from 'node:util';

const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const pbkdf2 = promisify(crypto.pbkdf2);
  const hash = await pbkdf2(password, salt, 1000, 64, 'sha512');

  return hash.toString('hex');
};

const comparePassword = async (
  suppliedPassword: string,
  hashedPassword: string,
  salt: string,
): Promise<boolean> => {
  const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordHash = await hashPassword(suppliedPassword, salt);
  const suppliedPasswordBuffer = Buffer.from(suppliedPasswordHash, 'hex');

  const isEqual = crypto.timingSafeEqual(
    suppliedPasswordBuffer,
    hashedPasswordBuffer,
  );

  return isEqual;
};

const generateSalt = () => crypto.randomBytes(16).toString('hex');

export default { hashPassword, generateSalt, comparePassword };
