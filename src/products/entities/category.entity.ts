import { BaseEntity } from 'src/common/base/base-entity';
import { TABLE_NAMES } from 'src/database/table.names';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.CATEGORY,
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
