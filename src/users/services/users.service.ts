import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { CONNECTION_DB } from 'src/database/databases-name.contant';
import { Repository } from 'typeorm';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User, CONNECTION_DB.POSTGRES_DB)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const entityUser = this.userRepository.create(data);
    return this.userRepository.save(entityUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    this.userRepository.merge(user, changes);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    const products = await this.productsService.findAll();
    return {
      date: new Date(),
      user,
      products,
    };
  }
}
