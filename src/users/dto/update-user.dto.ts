import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '@prisma/client';
import { IsEnum } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) { }


export class UpdateUserRoleDto extends PartialType(CreateUserDto) {
  @IsEnum(Role)
  role: Role;
}