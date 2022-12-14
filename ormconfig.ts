import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Member } from 'src/member/member.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [Member],
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
};

export = config;
