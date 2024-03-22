import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand, CONNECTION_DB.POSTGRES_DB)
    private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const entityBrand = this.brandRepository.create(data);
    return this.brandRepository.save(entityBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);

    this.brandRepository.merge(brand, changes);

    return this.brandRepository.save(brand);
  }

  remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
