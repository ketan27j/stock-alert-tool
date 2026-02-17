import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { QueryAnnouncementDto } from './dto/query-announcement.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryAnnouncementDto) {
    return this.announcementsService.findAll(queryDto);
  }

  @Get('latest')
  findLatest(@Query('limit', ParseIntPipe) limit: number = 10) {
    return this.announcementsService.findLatest(limit);
  }

  @Get('categories')
  getCategories() {
    return this.announcementsService.getCategories();
  }

  @Get('exchange/:exchange')
  findByExchange(
    @Param('exchange') exchange: 'NSE' | 'BSE',
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.announcementsService.findByExchange(exchange, limit);
  }

  @Get('company/:companyId')
  findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query('limit', ParseIntPipe) limit: number = 50,
  ) {
    return this.announcementsService.findByCompany(companyId, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.findOne(id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.markAsRead(id);
  }

  @Patch(':id/important')
  markAsImportant(
    @Param('id', ParseIntPipe) id: number,
    @Body('isImportant') isImportant: boolean,
  ) {
    return this.announcementsService.markAsImportant(id, isImportant);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.remove(id);
  }
}