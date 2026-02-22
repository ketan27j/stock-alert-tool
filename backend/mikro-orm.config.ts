import { defineConfig } from '@mikro-orm/mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DB_NAME || 'defaultdb',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 24437,
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'pwd',
  debug: true,
});
