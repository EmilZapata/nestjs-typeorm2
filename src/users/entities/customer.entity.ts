import { TABLE_NAMES } from 'src/database/table.names';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.CUSTOMER,
})
export class Customer {
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
}
