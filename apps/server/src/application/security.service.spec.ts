import crypto from 'node:crypto';

import securityService from './security.service';

describe('SecurityService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'testPassword';
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await securityService.hashPassword(password, salt);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(password);
    });

    it('should produce the same hash for the same password and salt', async () => {
      const password = 'testPassword';
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword1 = await securityService.hashPassword(
        password,
        salt,
      );
      const hashedPassword2 = await securityService.hashPassword(
        password,
        salt,
      );

      expect(hashedPassword1).toEqual(hashedPassword2);
    });

    it('should produce different hashes for the same password with different salts', async () => {
      const password = 'testPassword';
      const salt1 = crypto.randomBytes(16).toString('hex');
      const salt2 = crypto.randomBytes(16).toString('hex');
      const hashedPassword1 = await securityService.hashPassword(
        password,
        salt1,
      );
      const hashedPassword2 = await securityService.hashPassword(
        password,
        salt2,
      );

      expect(hashedPassword1).not.toEqual(hashedPassword2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword';
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await securityService.hashPassword(password, salt);
      const isMatch = await securityService.comparePassword(
        password,
        hashedPassword,
        salt,
      );

      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword';
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await securityService.hashPassword(password, salt);
      const isMatch = await securityService.comparePassword(
        'wrongPassword',
        hashedPassword,
        salt,
      );

      expect(isMatch).toBe(false);
    });
  });

  describe('generateSalt', () => {
    it('should generate a salt of the correct length', () => {
      const salt = securityService.generateSalt();
      expect(salt).toBeDefined();
      expect(salt).toHaveLength(32);
    });

    it('should generate unique salts', () => {
      const salt1 = securityService.generateSalt();
      const salt2 = securityService.generateSalt();

      expect(salt1).not.toEqual(salt2);
    });
  });
});
