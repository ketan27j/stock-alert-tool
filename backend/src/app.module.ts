import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CompaniesModule } from './companies/companies.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
      dbName: process.env.DB_NAME || 'nse_bse_alerts',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      type: 'mysql',
      debug: process.env.NODE_ENV !== 'production',
      allowGlobalContext: true,
    }),
    AnnouncementsModule,
    CompaniesModule,
    AlertsModule,
  ],
})
export class AppModule {}