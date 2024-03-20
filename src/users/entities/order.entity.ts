import { Product } from './../../products/entities/product.entity';
import { User } from './user.entity';

// @Entity({
//   name: TABLE_NAMES.ORDER,
// })
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
