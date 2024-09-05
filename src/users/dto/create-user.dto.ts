import { IsEnum, IsPhoneNumber, IsString, IsEmail } from '@nestjs/class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(Role)
  role: Role;
}
