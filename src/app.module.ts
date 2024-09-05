import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [PrismaModule, UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
