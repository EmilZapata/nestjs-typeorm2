import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, CONNECTION_DB.POSTGRES_DB)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer, CONNECTION_DB.POSTGRES_DB)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepository.find({
      relations: {
        customer: true,
      },
    });
  }

  async findOne(id: number) {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        items: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundError('not found');
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();

    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });

      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (changes.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
