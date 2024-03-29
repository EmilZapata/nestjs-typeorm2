import { TABLE_NAMES } from 'src/database/table.names';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.PRODUCT,
})
export class Product {
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
}
