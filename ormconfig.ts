import { Billboard } from 'src/entities/billboard.entity';
import { Category } from 'src/entities/category.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'furniture',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'minhkhanh2003',
  entities: [User, Billboard, Product, Category, Order, OrderProduct],
  synchronize: true,
};

export default config;
