import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }
  create(createOrderDto: CreateOrderDto) {

    const createdOrder = this.prisma.customerOrder.create({
      data: {
        ...createOrderDto,
        status: "GENERATING",
      }
    })
    return createdOrder;
  }

  findAll() {
    return this.prisma.customerOrder.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
