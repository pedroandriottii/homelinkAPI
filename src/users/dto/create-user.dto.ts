import { IsEnum, IsPhoneNumber, IsString, IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsEnum(Role)
  role: Role;
}
