import { TABLE_NAMES } from 'src/database/table.names';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: TABLE_NAMES.USER,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  role: string;
}
