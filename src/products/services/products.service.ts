import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { Brand } from 'src/products/entities/brand.entity';
import { Category } from 'src/products/entities/category.entity';
import { BrandsService } from 'src/products/services/brands.service';
import { In, Repository } from 'typeorm';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, CONNECTION_DB.POSTGRES_DB)
    private productRepository: Repository<Product>,
    private brandsService: BrandsService,
    @InjectRepository(Category, CONNECTION_DB.POSTGRES_DB)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand, CONNECTION_DB.POSTGRES_DB)
    private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: {
        brand: true,
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        categories: true,
        brand: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product()
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;

    const newProduct = this.productRepository.create(data);

    if (data.brandId) {
      const brand = await this.brandRepository.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(data.categoriesIds),
      });

      newProduct.categories = categories;
    }

    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(changes.categoriesIds),
      });

      product.categories = categories;
    }

    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async removeCategories(productId: number, ids: number[]) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: { categories: true },
    });

    product.categories = product.categories.filter(
      (category) => !ids.includes(category.id),
    );

    return this.productRepository.save(product);
  }

  async addCategories(productId: number, ids: number[]) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: { categories: true },
    });

    const categories = await this.categoryRepository.findBy({
      id: In(ids),
    });

    product.categories.concat(categories);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
