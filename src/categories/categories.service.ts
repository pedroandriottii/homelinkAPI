import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.name
      }
    })

    if (categoryExists) {
      throw new Error(`Category with name ${createCategoryDto.name} already exists`);
    }

    const createdCategory = await this.prisma.category.create({
      data: createCategoryDto
    })
    return createdCategory;
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id }
    })
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const deletedCategory = await this.prisma.category.delete({ where: { id } })
    if (!deletedCategory) {
      throw new Error(`Category with id ${id} not found`);
    }
    return deletedCategory;
  }
}
