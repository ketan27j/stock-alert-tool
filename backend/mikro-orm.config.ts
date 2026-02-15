import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'nse_bse_alerts',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_password',
  debug: true,
});
