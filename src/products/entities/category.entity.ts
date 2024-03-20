import { TABLE_NAMES } from 'src/database/table.names';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.CATEGORY,
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
