import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { IUserRepository } from '../domain/repositories/user.repository';
import { CreatedUserOutputDto, User } from '../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    }) as Promise<User | null>;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    }) as Promise<User | null>;
  }

  async create(data: CreatedUserOutputDto): Promise<User> {
    return this.prisma.user.create({ data }) as Promise<User>;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany() as Promise<User[]>;
  }
}
