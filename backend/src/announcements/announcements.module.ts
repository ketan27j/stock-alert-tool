import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Announcement } from "../entities/announcement.entity";
import { Company } from "../entities/company.entity";
import { AnnouncementScraperService } from "./announcement-scraper.service";
import { AnnouncementsService } from "./announcements.service";
import { AnnouncementsController } from "./announcements.controller";

@Module({
  imports: [HttpModule, MikroOrmModule.forFeature([Announcement, Company])],
  providers: [AnnouncementScraperService, AnnouncementsService],
  controllers: [AnnouncementsController],
  exports: [AnnouncementsService],
})
export class AnnouncementsModule {}
