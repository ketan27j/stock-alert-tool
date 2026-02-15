import { Module } from '@nestjs/common';
import { AnnoucementsService } from './annoucements.service';
import { AnnoucementsController } from './annoucements.controller';

@Module({
  providers: [AnnoucementsService],
  controllers: [AnnoucementsController],
})
export class AnnoucementsModule {}
