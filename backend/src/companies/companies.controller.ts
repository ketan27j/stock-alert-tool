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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from '../entities/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: Partial<Company>) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll(@Query('exchange') exchange?: 'NSE' | 'BSE') {
    return this.companiesService.findAll(exchange);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.companiesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: Partial<Company>,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}