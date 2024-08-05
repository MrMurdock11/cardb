import { User } from '../infrastructure/entities/user.entity';
import authService from './auth.service';
import securityService from './security.service';
import usersService from './users.service';

jest.mock('./security.service');
jest.mock('./users.service');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate a user with correct credentials', async () => {
    const user: User = {
      login: 'exampleUser',
      hashedPassword: 'hashedPasswordExample',
      salt: 'saltExample',
      createdAt: new Date(),
    };

    (usersService.getUserByLogin as jest.Mock).mockResolvedValue(user);
    (securityService.comparePassword as jest.Mock).mockResolvedValue(true);

    await expect(
      authService.authenticate('exampleUser', 'examplePassword'),
    ).resolves.not.toThrow();
  });

  it('should throw an error if user does not exist', async () => {
    (usersService.getUserByLogin as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.authenticate('nonExistentUser', 'examplePassword'),
    ).rejects.toThrow("The user doesn't exist.");
  });

  it('should throw an error if password is incorrect', async () => {
    const user = {
      id: 1,
      login: 'exampleUser',
      hashedPassword: 'hashedPasswordExample',
      salt: 'saltExample',
    };

    (usersService.getUserByLogin as jest.Mock).mockResolvedValue(user);
    (securityService.comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.authenticate('exampleUser', 'wrongPassword'),
    ).rejects.toThrow('Invalid password');
  });

  it('should handle unexpected errors', async () => {
    (usersService.getUserByLogin as jest.Mock).mockRejectedValue(
      new Error('Unexpected error'),
    );

    await expect(
      authService.authenticate('exampleUser', 'examplePassword'),
    ).rejects.toThrow('Unexpected error');
  });
});
