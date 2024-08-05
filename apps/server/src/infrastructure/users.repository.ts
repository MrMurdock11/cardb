import dbClient from './db.client';
import { User } from './entities/user.entity';

const getUserByLogin = async (login: string): Promise<User | null> => {
  const client = dbClient.getClient();
  const user = await client.db('cardb').collection('users').findOne({ login });

  return (
    user && {
      login: user.login,
      hashedPassword: user.hashed_password,
      salt: user.salt,
      createdAt: user.created_at,
    }
  );
};

export default {
  getUserByLogin,
};
