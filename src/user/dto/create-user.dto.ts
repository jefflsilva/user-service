import { IsEmail, IsString, MinLength } from 'class-validator';

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
