// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Role cannot be empty' })
  role: string;
}
