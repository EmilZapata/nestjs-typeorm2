import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderItemDto } from 'src/users/dtos/order-item.dto';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersItemService {
  constructor(
    @InjectRepository(OrderItem, CONNECTION_DB.POSTGRES_DB)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order, CONNECTION_DB.POSTGRES_DB)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product, CONNECTION_DB.POSTGRES_DB)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const orderItem = new OrderItem();

    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });

      orderItem.order = order;
    }
    if (data.productId) {
      const product = await this.productRepository.findOne({
        where: { id: data.productId },
      });

      orderItem.product = product;
    }

    orderItem.quantity = data.quantity;
    return this.orderItemRepository.save(orderItem);
  }
}
