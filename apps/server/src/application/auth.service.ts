import securityService from './security.service';
import usersService from './users.service';

const authenticate = async (login: string, password: string): Promise<void> => {
  try {
    const user = await usersService.getUserByLogin(login);
    if (!user) {
      throw new Error("The user doesn't exist.");
    }

    const isMatch = await securityService.comparePassword(
      password,
      user.hashedPassword,
      user.salt,
    );

    if (!isMatch) {
      throw new Error('Invalid password');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('');
  }
};

export default { authenticate };
