import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing)
    createUserDto.password = hashedPassword;
    createUserDto.role = "USER";

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { phone: createUserDto.phone }
        ]
      }
    })

    if (userExists) {
      throw new Error(`User with email ${createUserDto.email} or phone ${createUserDto.phone} already exists`);
    }

    const createdUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return createdUser
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id
      }
    })
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return;
  }
}
