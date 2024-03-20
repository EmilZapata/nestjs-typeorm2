import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Descripción del producto` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `Precio del producto` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `Stock del producto` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `Imagen del producto` })
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
