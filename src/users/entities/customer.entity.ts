import { BaseEntity } from 'src/common/base/base-entity';
import { TABLE_NAMES } from 'src/database/table.names';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: TABLE_NAMES.CUSTOMER,
})
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  lastName: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
