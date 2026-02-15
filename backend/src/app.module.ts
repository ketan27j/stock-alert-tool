import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnoucementsModule } from './annoucements/annoucements.module';
import { CompaniesModule } from './companies/companies.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [AnnoucementsModule, CompaniesModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
