import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import configLoad from 'src/shared/config/loadConfig';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG_CLIENT') private clientPg: Client,
    @Inject(configLoad.KEY)
    private configService: ConfigType<typeof configLoad>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World! ${apiKey} ${name}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
