import {
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnnouncementDto {
  @IsNumber()
  companyId!: number;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Date)
  @IsDate()
  announcementDate!: Date;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  subCategory?: string;

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsEnum(['NSE', 'BSE'])
  exchange!: 'NSE' | 'BSE';
}
