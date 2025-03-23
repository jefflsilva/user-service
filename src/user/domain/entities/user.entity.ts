export type User = {
  id: string;
  createdAt: Date;
  email: string;
  password: string;
  name: string;
  role: string;
};

export type CreateUserInputDto = Omit<User, 'id' | 'createdAt'>;
export type CreatedUserOutputDto = Omit<CreateUserInputDto, 'password'>;
