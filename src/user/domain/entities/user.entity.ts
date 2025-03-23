export type User = {
  id: string;
  createdAt: Date;
  email: string;
  password: string;
  name: string;
  role: string;
};

export type CreatedUserOutputDto = Omit<User, 'id' | 'createdAt'>;
