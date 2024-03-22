import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import {
  CONNECTION_DB,
  TYPE_DATABASE,
} from 'src/database/databases-name.contant';
import configLoad from 'src/shared/config/loadConfig';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configLoad.KEY],
      name: CONNECTION_DB.POSTGRES_DB,
      useFactory: (configService: ConfigType<typeof configLoad>) => {
        const { dbName, host, password, port, user } = configService.postgres;

        return {
          type: TYPE_DATABASE.POSTGRES,
          host,
          port,
          username: user,
          password,
          database: dbName,
          // synchronize: true,
          // autoLoadEntities: true,
          entities: [__dirname + 'src/../**/*.entity.{js,ts}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [configLoad.KEY],
      name: CONNECTION_DB.MYSQL_DB,
      useFactory: (configService: ConfigType<typeof configLoad>) => {
        const { dbName, host, password, port, user } = configService.mysql;

        return {
          type: TYPE_DATABASE.MYSQL,
          host,
          port,
          username: user,
          password,
          database: dbName,
          // synchronize: true,
          // autoLoadEntities: true,
          entities: [__dirname + 'src/../**/*.entity.{js,ts}'],
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG_CLIENT',
      useFactory: (configService: ConfigType<typeof configLoad>) => {
        const { dbName, host, password, port, user } = configService.postgres;
        const client = new Client({
          user,
          host,
          // host: '172.21.0.2',
          database: dbName,
          password,
          port,
        });

        client.connect();

        return client;
      },
      inject: [configLoad.KEY],
    },
  ],
  exports: ['API_KEY', 'PG_CLIENT', TypeOrmModule],
  // exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
