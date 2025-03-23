// src/user/application/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from '../domain/repositories/user.repository';
import { IHashUtil } from '../domain/interfaces/hash.util';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<IUserRepository>;
  let hashUtil: jest.Mocked<IHashUtil>;

  beforeEach(async () => {
    userRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve(null)),
      findByEmail: jest.fn().mockImplementation(() => Promise.resolve(null)),
      create: jest.fn(),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
    };
    hashUtil = {
      hash: jest.fn().mockImplementation(() => Promise.resolve('hashed')),
      compare: jest.fn().mockImplementation(() => Promise.resolve(true)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'IUserRepository', useValue: userRepository },
        { provide: 'IHashUtil', useValue: hashUtil },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should throw ConflictException if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: '123',
      name: 'Test',
      role: 'user',
    } as User);
    await expect(
      service.create({
        email: 'test@example.com',
        password: '123',
        name: 'Test',
        role: 'user',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should create a user if email is unique', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    hashUtil.hash.mockResolvedValue('hashed');
    const createdUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed',
      name: 'Test',
      role: 'user',
      createdAt: new Date(),
    } as User;
    userRepository.create.mockResolvedValue(createdUser);
    const result = await service.create({
      email: 'test@example.com',
      password: '123',
      name: 'Test',
      role: 'user',
    });
    expect(result).toEqual(createdUser);
    expect(hashUtil.hash).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException if user not found by ID', async () => {
    userRepository.findById.mockResolvedValue(null);
    await expect(service.findById('1')).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if user not found by email', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    await expect(service.findByEmail('test@example.com')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return all users', async () => {
    const users = [{ id: '1', email: 'test@example.com' } as User];
    userRepository.findAll.mockResolvedValue(users);
    const result = await service.getAllUsers();
    expect(result).toEqual(users);
  });
});
