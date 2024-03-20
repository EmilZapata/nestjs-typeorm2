import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { Customer } from 'src/users/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, User], CONNECTION_DB.POSTGRES_DB),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
