import { Module } from "@nestjs/common";
import { AnnouncementsService } from "./annoucements.service";
import { AnnoucementsController } from "./annoucements.controller";

@Module({
  providers: [AnnouncementsService],
  controllers: [AnnoucementsController],
})
export class AnnoucementsModule {}
