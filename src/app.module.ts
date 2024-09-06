import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, UsersModule, OrdersModule, CategoriesModule, ProductsModule, RoomsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
