import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
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

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `Marca del producto` })
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: `Categorias del producto` })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class DeleteCategoriesProductDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: `Categorias a eliminar/agregar del producto`,
    type: [Number],
  })
  readonly categoriesIds: number[];
}

export class AddCategoriesProductDto extends PartialType(
  DeleteCategoriesProductDto,
) {}

export class FilterProductsDto {
  @ApiPropertyOptional({ description: `Número de elementos` })
  @IsPositive()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ description: `Número de página` })
  @Min(0)
  @IsOptional()
  offset: number;

  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({ description: `Precio minimo` })
  minPrice: number;

  @ApiPropertyOptional({ description: `Precio máximo` })
  @IsPositive()
  @ValidateIf((item) => item.minPrice)
  maxPrice: number;
}
