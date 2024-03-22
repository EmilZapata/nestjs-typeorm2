import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'id de la orden' })
  readonly orderId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'id del producto' })
  readonly productId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'cantidad del producto' })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
