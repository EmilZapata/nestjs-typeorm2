import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import configLoad from 'src/shared/config/loadConfig';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
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
  exports: ['API_KEY', 'PG_CLIENT'],
})
export class DatabaseModule {}
