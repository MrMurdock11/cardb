import { User } from '../infrastructure/entities/user.entity';
import usersRepository from '../infrastructure/users.repository';

const getUserByLogin = async (login: string): Promise<User | null> => {
  const user = await usersRepository.getUserByLogin(login);

  return user;
};

export default { getUserByLogin };
