import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
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

    try {
      const createdUser = await this.prisma.user.create({
        data: createUserDto,
      });
      return createdUser
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        if (error.meta.target.includes('email')) {

          throw new ConflictException(`Email já cadastrado.`);
        }
        if (error.meta.target.includes('phone')) {
          throw new ConflictException(`Telefone já cadastrado.`);
        }
      }
      throw new InternalServerErrorException(`Erro Interno do Servidor`);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // async updateRole(id: string, UpdateUserRoleDto: UpdateUserRoleDto) {
  // }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id
      }
    })
    if (!deletedUser) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    return;
  }
}
