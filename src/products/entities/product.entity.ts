import { BaseEntity } from 'src/common/base/base-entity';
import { TABLE_NAMES } from 'src/database/table.names';
import { Brand } from 'src/products/entities/brand.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.PRODUCT,
})
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
