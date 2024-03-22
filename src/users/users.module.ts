import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { OrderItemController } from 'src/users/controllers/order-item.controller';
import { Customer } from 'src/users/entities/customer.entity';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrdersItemService } from 'src/users/services/order-item.service';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Customer, User, OrderItem, Order],
      CONNECTION_DB.POSTGRES_DB,
    ),
    ProductsModule,
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrdersItemService],
})
export class UsersModule {}
