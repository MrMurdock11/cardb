export type User = {
  id?: string;
  login: string;
  hashedPassword: string;
  salt: string;
  createdAt: Date;
};
