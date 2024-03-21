import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  port: configService.get('POSTGRES_PORT'),
  host: configService.get('POSTGRES_HOST'),
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
};

export const AppDataSource = new DataSource(dataSourceOptions);

//"m:g": "npm run typeorm migration:generate ./src/database/migrations/%npm_config_name%",
// 15:33:41 ❯ npm run m:g --name=create-table-product
