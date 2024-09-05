import { IsEnum, IsPhoneNumber } from '@nestjs/class-validator';
import { IsEmail, IsString } from '@nestjs/class-validator';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  CLIENT = 'client'
}

export class CreateUserDto {
  @IsString()
  name: String;

  @IsEmail()
  email: String;

  @IsString()
  password: String;

  @IsPhoneNumber()
  phone: String;

  @IsEnum(Role)
  role: Role
}
