import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto
    })
    return createdProduct;
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: {
        id
      }
    })
    if (!deletedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }
    return deletedProduct;
  }
}
