import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base/base-entity';
import { TABLE_NAMES } from 'src/database/table.names';
import { Customer } from 'src/users/entities/customer.entity';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.ORDER,
})
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0);
    }
    return 0;
  }
}
