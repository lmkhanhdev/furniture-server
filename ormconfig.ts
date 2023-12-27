import { Billboard } from 'src/entities/billboard.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'furniture',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'minhkhanh2003',
  entities: [User, Billboard],
  synchronize: true,
};

export default config;
