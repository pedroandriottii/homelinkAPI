import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) { }
  async create(createRoomDto: CreateRoomDto) {

    const orderExists = await this.prisma.customerOrder.findUnique({
      where: {
        id: createRoomDto.orderId
      }
    })

    if (!orderExists) {
      throw new Error(`Order with id ${createRoomDto.orderId} not found`);
    }

    const createdRoom = this.prisma.room.create({
      data: {
        ...createRoomDto,
        totalValue: 0.0,
      }
    });

    return createdRoom;
  }

  async findAll() {
    return await this.prisma.room.findMany();
  }

  async findOne(id: number) {
    const order = await this.prisma.room.findUnique({
      where: {
        id
      }
    });
    if (!order) {
      throw new Error(`Room with id ${id} not found`);
    }
    return order;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: number) {
    const deleteRoom = await this.prisma.room.delete({
      where: {
        id
      }
    })
  }
}
