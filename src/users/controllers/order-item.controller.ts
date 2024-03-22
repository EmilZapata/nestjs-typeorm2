import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from 'src/users/dtos/order-item.dto';
import { OrdersItemService } from 'src/users/services/order-item.service';

@ApiTags('Orden Item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemsService: OrdersItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemsService.create(payload);
  }
}
