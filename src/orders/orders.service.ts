import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }
  async create(createOrderDto: CreateOrderDto) {
    const createdOrder = await this.prisma.customerOrder.create({
      data: {
        ...createOrderDto,
        status: "GENERATING",
        totalValue: 0.0,
      }
    })
    return createdOrder;
  }

  async findAll() {
    return await this.prisma.customerOrder.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.customerOrder.findUnique({
      where: {
        id
      }
    });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
  }

  async remove(id: string) {
    const deletedOrder = await this.prisma.customerOrder.delete({
      where: {
        id
      }
    })
    if (!deletedOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    return deletedOrder;
  }
}
