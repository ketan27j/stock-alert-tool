import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Alert } from '../entities/alert.entity';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Alert, User, Company])],
  providers: [AlertsService],
  controllers: [AlertsController],
  exports: [AlertsService],
})
export class AlertsModule {}