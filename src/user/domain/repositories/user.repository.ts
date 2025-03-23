import { CreatedUserOutputDto, User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreatedUserOutputDto): Promise<User>;
  findAll(): Promise<User[]>;
}
