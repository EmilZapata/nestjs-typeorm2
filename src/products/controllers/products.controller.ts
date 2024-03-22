import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  AddCategoriesProductDto,
  CreateProductDto,
  DeleteCategoriesProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ProductsService } from './../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/categories')
  addCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: AddCategoriesProductDto,
  ) {
    return this.productsService.addCategories(id, payload.categoriesIds);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/categories')
  deleteCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: DeleteCategoriesProductDto,
  ) {
    return this.productsService.removeCategories(id, payload.categoriesIds);
  }
}
