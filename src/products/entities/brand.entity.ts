import { BaseEntity } from 'src/common/base/base-entity';
import { TABLE_NAMES } from 'src/database/table.names';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.BRAND,
})
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: '230',
  })
  name: string;
  @Column({
    type: 'varchar',
    length: '255',
  })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
